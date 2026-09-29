import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  DrawerComponent,
  IconButtonComponent,
  LogoComponent,
  NavbarNavItem,
} from '@checkworkrights/ui-angular';
import { filter } from 'rxjs/operators';
import { GlobalSearchService } from '../global-search/global-search.service';
import { Sidebar, SidebarNavGroup } from '../sidebar/sidebar';

/** Keep in sync with the sidebar's breakpoint in sidebar.scss. */
const WIDE_SCREEN_QUERY = '(min-width: 769px)';

/** Top bar and navigation drawer that replace the sidebar on narrow screens. */
@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DrawerComponent, IconButtonComponent, LogoComponent, Sidebar],
  template: `
    <header class="mobile-nav">
      <cwr-icon-button
        icon="icon.ui.list-view"
        variant="ghost"
        intent="neutral"
        size="md"
        label="Open navigation"
        (buttonClick)="open.set(true)"
      ></cwr-icon-button>

      <a class="mobile-nav__brand" routerLink="getting-started" aria-label="CWR UI Showcase home">
        <cwr-logo size="sm" />
      </a>

      <div class="mobile-nav__actions">
        <cwr-icon-button
          icon="icon.ui.search"
          variant="outline"
          intent="neutral"
          size="md"
          label="Search"
          (buttonClick)="openSearch()"
        ></cwr-icon-button>
        <cwr-icon-button
          [icon]="isDarkMode() ? 'icon.ui.sun' : 'icon.ui.moon'"
          variant="solid"
          intent="neutral"
          size="md"
          label="Toggle theme"
          (buttonClick)="themeToggle.emit()"
        ></cwr-icon-button>
      </div>
    </header>

    @if (open()) {
      <cwr-drawer title="Menu" (dismiss)="open.set(false)">
        <app-sidebar
          variant="drawer"
          [topItems]="topItems()"
          [groups]="groups()"
          [isActiveRoute]="isActiveRoute()"
          [isDarkMode]="isDarkMode()"
          (navItemClick)="open.set(false)"
        ></app-sidebar>
      </cwr-drawer>
    }
  `,
  styles: [
    `
      :host {
        display: none;
      }

      @media (max-width: 768px) {
        :host {
          display: block;
          flex-shrink: 0;
        }
      }

      /* The navigation has no footer actions; drop the drawer's empty footer bar. */
      :host ::ng-deep .drawer__footer {
        display: none;
      }

      .mobile-nav {
        display: flex;
        align-items: center;
        gap: var(--space-sm, 0.75rem);
        padding: var(--space-xs, 0.5rem) var(--space-md, 1rem);
        background: var(--color-bg-surface-navbar);
        border-bottom: var(--border-surface-navbar);
      }

      .mobile-nav__brand {
        display: flex;
        align-items: center;
      }

      .mobile-nav__actions {
        display: flex;
        align-items: center;
        gap: var(--space-sm, 0.75rem);
        margin-left: auto;
      }
    `,
  ],
})
export class MobileNav {
  readonly topItems = input<NavbarNavItem[]>([]);
  readonly groups = input<SidebarNavGroup[]>([]);
  readonly isActiveRoute = input<(route: string) => boolean>(() => false);
  readonly isDarkMode = input(true);

  readonly themeToggle = output<void>();

  protected readonly open = signal(false);

  private readonly globalSearchService = inject(GlobalSearchService);

  constructor() {
    // Close after any navigation, including links in the drawer that aren't nav items
    // (the version link to the changelog).
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));

    // The drawer is only reachable on narrow screens; don't leave it open (and the page
    // scroll-locked) behind the sidebar after the window is widened.
    const wideScreen = window.matchMedia(WIDE_SCREEN_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) this.open.set(false);
    };
    wideScreen.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => wideScreen.removeEventListener('change', onChange));
  }

  protected openSearch(): void {
    this.globalSearchService.openDialog();
  }
}
