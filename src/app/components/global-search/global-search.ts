import { Component, HostListener, Input, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, IconComponent, NavbarNavItem, SearchInputComponent, ScrollbarComponent } from '@checkworkrights/ui-angular';
import { SidebarNavGroup } from '../sidebar/sidebar';
import { GlobalSearchService } from './global-search.service';

interface SearchResultItem {
  id: string;
  label: string;
  route: string;
  groupLabel: string;
}

interface SearchResultGroup {
  label: string;
  items: SearchResultItem[];
}

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [DialogComponent, SearchInputComponent, IconComponent],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})
export class GlobalSearch {
  @Input() topItems: NavbarNavItem[] = [];
  @Input() groups: SidebarNavGroup[] = [];

  private readonly router = inject(Router);
  private readonly searchService = inject(GlobalSearchService);

  protected readonly open = this.searchService.open;
  protected readonly searchTerm = signal('');
  private readonly rawActiveIndex = signal(0);

  private readonly allItems = computed<SearchResultItem[]>(() => [
    ...this.topItems.map((item) => this.toResultItem(item, 'General')),
    ...this.groups.flatMap((group) => group.items.map((item) => this.toResultItem(item, group.label))),
  ]);

  protected readonly resultGroups = computed<SearchResultGroup[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const source = term
      ? this.allItems().filter((item) => item.label.toLowerCase().includes(term))
      : this.allItems();

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

  protected readonly activeItemId = computed(() => this.flatResults()[this.activeIndex()]?.id ?? null);

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
    this.router.navigate([item.route]);
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
}
