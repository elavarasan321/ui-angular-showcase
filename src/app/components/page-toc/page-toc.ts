import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

export interface TocEntry {
  id: string;
  label: string;
  /** An h3 that follows an h2, shown indented under it. */
  nested: boolean;
}

/** How far below the top of the scroll container a heading counts as the one being read. */
const ACTIVE_OFFSET_PX = 96;

/** Class of the `#` link added to each outline heading (styled in styles.scss). */
const ANCHOR_CLASS = 'heading-anchor';
const COPIED_CLASS = 'is-copied';
const COPIED_FEEDBACK_MS = 1500;

const isModifiedClick = (event: MouseEvent): boolean =>
  event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

/**
 * Headings that belong to demo content rather than the page outline: anything rendered by a
 * library component (a cwr-title-block example, an open dialog) or inside a live preview.
 */
const isDemoHeading = (heading: HTMLElement): boolean => {
  if (heading.closest('app-highlight-snippet, .playground__preview, [data-toc-ignore]')) {
    return true;
  }
  for (let el = heading.parentElement; el; el = el.parentElement) {
    if (el.tagName.startsWith('CWR-')) return true;
  }
  return false;
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';

const sameEntries = (a: readonly TocEntry[], b: readonly TocEntry[]): boolean =>
  a.length === b.length &&
  a.every((entry, i) => {
    const other = b[i];
    return entry.id === other.id && entry.label === other.label && entry.nested === other.nested;
  });

/**
 * "On this page" list built from the h2/h3 headings of the current page, highlighting the
 * section being read. It also gives each of those headings a `#` link that copies a link to
 * that section, query params included, so a shared link keeps the playground setup.
 *
 * Pages that have their own contents list opt out of both with `data-page-toc="none"` on an
 * element inside them.
 */
@Component({
  selector: 'app-page-toc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (entries().length > 1) {
      <nav class="page-toc" aria-labelledby="page-toc-title">
        <p class="page-toc__title" id="page-toc-title">On this page</p>
        <ul class="page-toc__list">
          @for (entry of entries(); track entry.id) {
            <li>
              <a
                class="page-toc__link"
                [class.page-toc__link--nested]="entry.nested"
                [class.is-active]="entry.id === activeId()"
                [attr.aria-current]="entry.id === activeId() ? 'location' : null"
                [href]="hrefFor(entry.id)"
                (click)="onLinkClick($event, entry)"
                >{{ entry.label }}</a
              >
            </li>
          }
        </ul>
      </nav>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .page-toc {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs, 0.5rem);
      }

      .page-toc__title {
        margin: 0;
        padding: 0 var(--space-2xs, 0.5rem);
        font-size: 0.6875rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-text-surface-subtle, currentColor);
      }

      .page-toc__list {
        display: flex;
        flex-direction: column;
        gap: 1px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .page-toc__link {
        display: block;
        padding: var(--space-3xs, 0.25rem) var(--space-2xs, 0.5rem);
        border-left: 2px solid transparent;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, inherit);
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition:
          color 120ms ease,
          border-color 120ms ease,
          background-color 120ms ease;
      }

      .page-toc__link--nested {
        padding-left: var(--space-md, 1rem);
      }

      .page-toc__link:hover {
        color: var(--color-text-surface, inherit);
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.08));
      }

      .page-toc__link:focus-visible {
        outline: var(--border-focus);
        outline-offset: calc(-1 * var(--space-focus-offset, 2px));
      }

      .page-toc__link.is-active {
        color: var(--color-text-brand, inherit);
        border-left-color: var(--color-border-brand, currentColor);
        background: var(--color-bg-brand-subtle, rgba(71, 156, 255, 0.1));
        font-weight: 600;
      }

      @media (prefers-reduced-motion: reduce) {
        .page-toc__link {
          transition: none;
        }
      }
    `,
  ],
})
export class PageToc {
  /** The element holding the routed page; its headings make up the list. */
  readonly content = input.required<HTMLElement>();
  /** The element that scrolls the page. */
  readonly scrollContainer = input.required<HTMLElement>();

  protected readonly entries = signal<TocEntry[]>([], { equal: sameEntries });
  protected readonly activeId = signal<string | null>(null);

  private readonly router = inject(Router);

  private headings: HTMLElement[] = [];
  private scanFrame = 0;
  private scrollFrame = 0;
  /** Set while a click-started scroll runs, so the clicked entry stays highlighted. */
  private followingClick = false;
  /** Path whose URL fragment has already been scrolled to. */
  private fragmentHandledFor: string | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Routed pages load lazily and render parts of themselves later (API reference, filtered
    // token sections), so rescan whenever the page's DOM changes.
    effect((onCleanup) => {
      const content = this.content();
      const observer = new MutationObserver(() => this.scheduleScan());
      observer.observe(content, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'hidden'],
      });
      // One delegated listener for the `#` links, which are plain DOM added by scan().
      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as Element).closest<HTMLAnchorElement>(`a.${ANCHOR_CLASS}`);
        if (anchor && !isModifiedClick(event)) {
          event.preventDefault();
          this.copyLink(anchor);
        }
      };
      content.addEventListener('click', onClick);
      this.scheduleScan();
      onCleanup(() => {
        observer.disconnect();
        content.removeEventListener('click', onClick);
      });
    });

    effect((onCleanup) => {
      const container = this.scrollContainer();
      const onScroll = () => {
        if (this.followingClick || this.scrollFrame) return;
        this.scrollFrame = requestAnimationFrame(() => {
          this.scrollFrame = 0;
          this.updateActive();
        });
      };
      const onScrollEnd = () => (this.followingClick = false);
      container.addEventListener('scroll', onScroll, { passive: true });
      container.addEventListener('scrollend', onScrollEnd);
      onCleanup(() => {
        container.removeEventListener('scroll', onScroll);
        container.removeEventListener('scrollend', onScrollEnd);
      });
    });

    destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.scanFrame);
      cancelAnimationFrame(this.scrollFrame);
    });
  }

  protected hrefFor(id: string): string {
    return `${location.pathname}${location.search}#${id}`;
  }

  protected onLinkClick(event: MouseEvent, entry: TocEntry): void {
    // Let modified clicks open the link in a new tab or window as usual.
    if (isModifiedClick(event)) return;
    event.preventDefault();
    this.goTo(entry.id);
  }

  private goTo(id: string): void {
    const heading = this.headings.find((el) => el.id === id);
    if (!heading) return;

    // A heading near the bottom can't scroll to the top, which would leave a later entry
    // highlighted; keep the clicked one until the scroll ends.
    this.followingClick = true;
    this.activeId.set(id);
    // The fragment added below must not trigger the arrive-at-#section jump on the next scan.
    this.fragmentHandledFor = location.pathname;
    heading.scrollIntoView({ behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
    // Through the router (not history.replaceState) so later query-param updates from the
    // playground keep the fragment.
    void this.router.navigate([], {
      fragment: id,
      queryParamsHandling: 'preserve',
      replaceUrl: true,
    });
  }

  private copyLink(anchor: HTMLAnchorElement): void {
    const id = anchor.dataset['target']!;
    this.goTo(id);
    // Built now rather than read from the anchor: the playground may have changed the query.
    const url = `${location.origin}${this.hrefFor(id)}`;
    navigator.clipboard?.writeText(url).then(
      () => {
        anchor.classList.add(COPIED_CLASS);
        setTimeout(() => anchor.classList.remove(COPIED_CLASS), COPIED_FEEDBACK_MS);
      },
      () => {
        // Clipboard access denied; the URL bar still holds the link.
      },
    );
  }

  /** Adds (or refreshes) the `#` link at the end of an outline heading. */
  private ensureAnchor(heading: HTMLElement, label: string): void {
    let anchor = heading.querySelector<HTMLAnchorElement>(`:scope > a.${ANCHOR_CLASS}`);
    if (!anchor) {
      anchor = document.createElement('a');
      anchor.className = ANCHOR_CLASS;
      heading.append(anchor);
    }
    // The visible `#` comes from CSS, so it never leaks into the heading's textContent.
    anchor.dataset['target'] = heading.id;
    anchor.setAttribute('aria-label', `Copy link to ${label}`);
    const href = this.hrefFor(heading.id);
    if (anchor.getAttribute('href') !== href) anchor.setAttribute('href', href);
  }

  private scheduleScan(): void {
    if (this.scanFrame) return;
    this.scanFrame = requestAnimationFrame(() => {
      this.scanFrame = 0;
      this.scan();
    });
  }

  private scan(): void {
    const content = this.content();
    if (content.querySelector('[data-page-toc="none"]')) {
      this.headings = [];
      this.entries.set([]);
      return;
    }

    this.headings = Array.from(content.querySelectorAll<HTMLElement>('h2, h3')).filter(
      (heading) =>
        !isDemoHeading(heading) &&
        heading.getClientRects().length > 0 &&
        !!heading.textContent?.trim(),
    );

    let seenH2 = false;
    const entries = this.headings.map((heading) => {
      if (!heading.id) heading.id = this.uniqueId(slugify(heading.textContent!.trim()));
      const isH2 = heading.tagName === 'H2';
      seenH2 ||= isH2;
      const label =
        heading.dataset['tocLabel'] ?? heading.textContent!.trim().replace(/\s+/g, ' ');
      this.ensureAnchor(heading, label);
      return { id: heading.id, label, nested: !isH2 && seenH2 };
    });
    this.entries.set(entries);

    this.scrollToFragmentOnce();
    if (!this.followingClick) this.updateActive();
  }

  /** On arriving at `/page#section`, scroll to the section once its heading exists. */
  private scrollToFragmentOnce(): void {
    const path = location.pathname;
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || this.fragmentHandledFor === path) return;
    const heading = this.headings.find((el) => el.id === id);
    if (!heading) return;
    this.fragmentHandledFor = path;
    heading.scrollIntoView();
  }

  private updateActive(): void {
    if (!this.headings.length) {
      this.activeId.set(null);
      return;
    }
    const container = this.scrollContainer();
    const atBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 2;
    if (atBottom) {
      this.activeId.set(this.headings[this.headings.length - 1].id);
      return;
    }
    const threshold = container.getBoundingClientRect().top + ACTIVE_OFFSET_PX;
    let active = this.headings[0];
    for (const heading of this.headings) {
      if (heading.getBoundingClientRect().top > threshold) break;
      active = heading;
    }
    this.activeId.set(active.id);
  }

  private uniqueId(base: string): string {
    let id = base;
    for (let n = 2; document.getElementById(id); n++) id = `${base}-${n}`;
    return id;
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
