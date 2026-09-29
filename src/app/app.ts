import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarNavItem } from '@checkworkrights/ui-angular';
import { filter } from 'rxjs/operators';
import { GlobalSearch } from './components/global-search/global-search';
import { Sidebar } from './components/sidebar/sidebar';
import { SHOWCASE_PAGE_GROUPS, toNavGroups } from './showcase-pages';

// Also read by the inline pre-paint script in src/index.html — keep the two in sync.
const THEME_STORAGE_KEY = 'cwr-showcase-theme';

/** Strips the query string and fragment from a router URL. */
const toPath = (url: string): string => url.split(/[?#]/)[0];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, GlobalSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly appContent = viewChild<ElementRef<HTMLElement>>('appContent');

  // index.html has already applied any saved theme, so the attribute is the source of truth.
  protected readonly isDarkMode = signal(
    document.documentElement.getAttribute('data-theme') !== 'light',
  );

  // A signal (rather than reading router.url directly) so OnPush views that call
  // isActiveRoute() re-render on every navigation.
  private readonly currentPath = signal(toPath(this.router.url));

  protected readonly topItems: NavbarNavItem[] = [];
  protected readonly groups = toNavGroups(SHOWCASE_PAGE_GROUPS);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        const path = toPath(event.urlAfterRedirects);
        if (path === this.currentPath()) return;
        this.currentPath.set(path);
        this.appContent()?.nativeElement.scrollTo({ top: 0 });
      });
  }

  protected readonly isActiveRoute = (base: string): boolean => {
    const url = this.currentPath();
    const path = `/${base}`;
    return url === path || url.startsWith(`${path}/`);
  };

  protected toggleTheme(): void {
    const dark = !this.isDarkMode();
    this.isDarkMode.set(dark);
    if (dark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the toggle still works.
    }
  }
}
