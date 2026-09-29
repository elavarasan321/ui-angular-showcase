import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BadgeComponent,
  IconButtonComponent,
  IconComponent,
  LogoComponent,
  NavbarNavItem,
} from '@checkworkrights/ui-angular';
import { GlobalSearchService } from '../global-search/global-search.service';
import { UI_ANGULAR_VERSION } from '../../library-version.generated';

export interface SidebarNavGroup {
  id: string;
  label: string;
  items: NavbarNavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    IconComponent,
    IconButtonComponent,
    BadgeComponent,
    LogoComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.sidebar--drawer]': "variant() === 'drawer'" },
})
export class Sidebar {
  readonly topItems = input<NavbarNavItem[]>([]);
  readonly groups = input<SidebarNavGroup[]>([]);
  readonly isActiveRoute = input<(route: string) => boolean>(() => false);
  readonly isDarkMode = input(true);
  /**
   * `rail` is the fixed left column on wide screens; `drawer` renders the same navigation
   * inside the mobile drawer, which supplies its own brand, search and theme controls.
   */
  readonly variant = input<'rail' | 'drawer'>('rail');

  readonly navItemClick = output<NavbarNavItem>();
  readonly themeToggle = output<void>();

  protected readonly libraryVersion = UI_ANGULAR_VERSION;

  private readonly globalSearchService = inject(GlobalSearchService);
  protected readonly searchShortcut = this.globalSearchService.shortcutLabel;

  private readonly expandedGroupIds = signal<ReadonlySet<string>>(new Set());
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  constructor() {
    // Open the group holding the current page, including after navigating from outside the
    // sidebar (search, in-page links). Never collapses a group the user opened.
    effect(() => {
      const activeGroup = this.groups().find((group) => this.hasActiveItem(group));
      if (activeGroup) {
        this.expandedGroupIds.update((ids) => new Set(ids).add(activeGroup.id));
      }
      // Once the group has rendered open, bring the page's link into view: arriving from
      // search or a shared link can land on a page far down the list.
      const activeItem = activeGroup?.items.find((item) => this.isActiveRoute()(item.route));
      if (activeItem) {
        afterNextRender(() => this.revealLink(activeItem.route), { injector: this.injector });
      }
    });
  }

  trackByItem(_index: number, item: NavbarNavItem): string {
    return item.id ?? item.route;
  }

  trackByGroup(_index: number, group: SidebarNavGroup): string {
    return group.id;
  }

  hasActiveItem(group: SidebarNavGroup): boolean {
    return group.items.some((item) => this.isActiveRoute()(item.route));
  }

  isExpanded(group: SidebarNavGroup): boolean {
    return this.expandedGroupIds().has(group.id);
  }

  toggleGroup(group: SidebarNavGroup): void {
    this.expandedGroupIds.update((ids) => {
      const next = new Set(ids);
      if (!next.delete(group.id)) {
        next.add(group.id);
      }
      return next;
    });
  }

  onItemClick(item: NavbarNavItem): void {
    this.navItemClick.emit(item);
  }

  /**
   * Scrolls the sidebar only when the link is out of view; a no-op otherwise. Found by href
   * because routerLinkActive may not have marked it `is-active` yet.
   */
  private revealLink(route: string): void {
    this.host.nativeElement
      .querySelector(`.sidebar-link[href="/${route}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }

  openGlobalSearch(): void {
    this.globalSearchService.openDialog();
  }
}
