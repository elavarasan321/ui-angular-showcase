import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Params, Router } from '@angular/router';
import {
  DialogComponent,
  IconComponent,
  NavbarNavItem,
  SearchInputComponent,
} from '@checkworkrights/ui-angular';
import type { ApiEntry } from '../../pages/showcase/api-reference.generated';
import type { TokenRow } from '../../pages/design-tokens/token-data';
import { ALL_SHOWCASE_PAGES } from '../../showcase-pages';
import { SidebarNavGroup } from '../sidebar/sidebar';
import { GlobalSearchService } from './global-search.service';

interface SearchResultItem {
  id: string;
  label: string;
  route: string;
  groupLabel: string;
  /** Secondary text: the matched selector, the component an input belongs to, a token's use. */
  detail?: string;
  queryParams?: Params;
}

/** API tables and design tokens, loaded the first time the dialog opens (~250 kB). */
interface SearchData {
  api: Record<string, ApiEntry>;
  tokens: TokenRow[];
}

/** Inputs/outputs and tokens only kick in from this many characters, to keep results focused. */
const MIN_DEEP_TERM_LENGTH = 2;
const MAX_API_RESULTS = 8;
const MAX_TOKEN_RESULTS = 8;

interface SearchResultGroup {
  label: string;
  items: SearchResultItem[];
}

@Component({
  selector: 'app-global-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogComponent, SearchInputComponent, IconComponent],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})
export class GlobalSearch {
  readonly topItems = input<NavbarNavItem[]>([]);
  readonly groups = input<SidebarNavGroup[]>([]);

  private readonly router = inject(Router);
  private readonly searchService = inject(GlobalSearchService);

  protected readonly open = this.searchService.open;
  protected readonly searchTerm = signal('');
  private readonly rawActiveIndex = signal(0);
  private readonly searchData = signal<SearchData | null>(null);

  constructor() {
    effect(() => {
      if (this.open() && !this.searchData()) {
        void this.loadSearchData();
      }
    });
  }

  private readonly allItems = computed<SearchResultItem[]>(() => [
    ...this.topItems().map((item) => this.toResultItem(item, 'General')),
    ...this.groups().flatMap((group) =>
      group.items.map((item) => this.toResultItem(item, group.label)),
    ),
  ]);

  protected readonly resultGroups = computed<SearchResultGroup[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const source = term ? this.matchPages(term) : this.allItems();
    if (term.length >= MIN_DEEP_TERM_LENGTH) {
      source.push(...this.matchApi(term), ...this.matchTokens(term));
    }

    const groups: SearchResultGroup[] = [];
    for (const item of source) {
      const group = groups.find((candidate) => candidate.label === item.groupLabel);
      if (group) {
        group.items.push(item);
      } else {
        groups.push({ label: item.groupLabel, items: [item] });
      }
    }
    return groups;
  });

  private readonly flatResults = computed<SearchResultItem[]>(() =>
    this.resultGroups().flatMap((group) => group.items),
  );

  protected readonly activeIndex = computed(() => {
    const length = this.flatResults().length;
    if (length === 0) {
      return -1;
    }
    return Math.min(this.rawActiveIndex(), length - 1);
  });

  protected readonly activeItemId = computed(
    () => this.flatResults()[this.activeIndex()]?.id ?? null,
  );

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openDialog();
      return;
    }

    if (!this.open()) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveActive(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveActive(-1);
    } else if (event.key === 'Enter') {
      const item = this.flatResults()[this.activeIndex()];
      if (item) {
        event.preventDefault();
        this.selectResult(item);
      }
    }
  }

  protected openDialog(): void {
    this.searchTerm.set('');
    this.rawActiveIndex.set(0);
    this.searchService.openDialog();
  }

  protected close(): void {
    this.searchTerm.set('');
    this.searchService.close();
  }

  protected onSearchTermChange(value: string): void {
    this.searchTerm.set(value);
    this.rawActiveIndex.set(0);
  }

  protected setActive(item: SearchResultItem): void {
    const index = this.flatResults().findIndex((candidate) => candidate.id === item.id);
    if (index >= 0) {
      this.rawActiveIndex.set(index);
    }
  }

  protected selectResult(item: SearchResultItem): void {
    this.close();
    this.router.navigate(['/' + item.route], { queryParams: item.queryParams });
  }

  protected trackByItem(_index: number, item: SearchResultItem): string {
    return item.id;
  }

  protected trackByGroup(_index: number, group: SearchResultGroup): string {
    return group.label;
  }

  private moveActive(delta: number): void {
    const length = this.flatResults().length;
    if (length === 0) {
      return;
    }
    const next = (this.activeIndex() + delta + length) % length;
    this.rawActiveIndex.set(next);
  }

  private toResultItem(item: NavbarNavItem, groupLabel: string): SearchResultItem {
    return { id: item.id ?? item.route, label: item.label, route: item.route, groupLabel };
  }

  /** Pages whose label or documented selector (`cwr-button`) contains the term. */
  private matchPages(term: string): SearchResultItem[] {
    return this.allItems().flatMap((item) => {
      if (item.label.toLowerCase().includes(term)) return [item];
      const selector = this.selectorsByRoute.get(item.route)?.find((s) => s.includes(term));
      return selector ? [{ ...item, detail: selector }] : [];
    });
  }

  private matchApi(term: string): SearchResultItem[] {
    const api = this.searchData()?.api;
    if (!api) return [];
    const results: SearchResultItem[] = [];
    for (const page of ALL_SHOWCASE_PAGES) {
      for (const selector of page.selectors ?? []) {
        const entry = api[selector];
        if (!entry) continue;
        const members = [
          ...entry.inputs.map((m) => ({ name: m.name, kind: 'input' })),
          ...entry.outputs.map((m) => ({ name: m.name, kind: 'output' })),
        ];
        for (const { name, kind } of members) {
          if (!name.toLowerCase().includes(term)) continue;
          results.push({
            id: `api:${selector}:${kind}:${name}`,
            label: name,
            route: page.route,
            groupLabel: 'Inputs & outputs',
            detail: `${kind} of ${selector}`,
          });
          if (results.length >= MAX_API_RESULTS) return results;
        }
      }
    }
    return results;
  }

  private matchTokens(term: string): SearchResultItem[] {
    const tokens = this.searchData()?.tokens;
    if (!tokens) return [];
    const matches = tokens.filter((token) => token.cssVar.includes(term));
    const results: SearchResultItem[] = matches.slice(0, MAX_TOKEN_RESULTS).map((token) => ({
      id: `token:${token.cssVar}`,
      label: token.cssVar,
      route: 'design-tokens',
      groupLabel: 'Design tokens',
      detail: token.description,
      queryParams: { q: token.cssVar },
    }));
    if (matches.length > MAX_TOKEN_RESULTS) {
      results.push({
        id: 'token:all',
        label: `See all ${matches.length} matching tokens`,
        route: 'design-tokens',
        groupLabel: 'Design tokens',
        queryParams: { q: term },
      });
    }
    return results;
  }

  private readonly selectorsByRoute = new Map(
    ALL_SHOWCASE_PAGES.map((page) => [page.route, page.selectors ?? []]),
  );

  private async loadSearchData(): Promise<void> {
    const [{ API_REFERENCE }, { TOKEN_GROUPS }, { tokenRows }] = await Promise.all([
      import('../../pages/showcase/api-reference.generated'),
      import('../../pages/design-tokens/design-tokens.generated'),
      import('../../pages/design-tokens/token-data'),
    ]);
    this.searchData.set({
      api: API_REFERENCE,
      tokens: Object.keys(TOKEN_GROUPS).flatMap((group) => tokenRows(group)),
    });
  }
}
