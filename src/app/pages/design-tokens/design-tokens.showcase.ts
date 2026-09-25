import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IconComponent,
  ScrollbarComponent,
  SearchInputComponent,
} from '@checkworkrights/ui-angular';
import { ShowcaseHeader } from '../showcase/showcase-header';
import { TextStyleSection } from './text-style-section';
import { TokenClipboardService } from './token-clipboard.service';
import { filterRows, tokenRows } from './token-data';
import { TokenSection, TokenVariant } from './token-section';
import { TokenThemeService } from './token-theme.service';

interface Section {
  id: string;
  title: string;
  group: string;
  variant: TokenVariant | 'text-style';
}

interface Category {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

const CATEGORIES: Category[] = [
  {
    id: 'cat-color',
    title: 'Color',
    description:
      'Seed colors, generated palettes and the semantic roles built on top of them.',
    sections: [
      {
        id: 'palette-accent-seed',
        title: 'Accent seeds',
        group: 'palette-accent-seed',
        variant: 'color',
      },
      {
        id: 'palette-neutral-seed',
        title: 'Neutral seed',
        group: 'palette-neutral-seed',
        variant: 'color',
      },
      {
        id: 'palette-accent-light',
        title: 'Accent palette — Light',
        group: 'palette-accent-light',
        variant: 'palette',
      },
      {
        id: 'palette-accent-dark',
        title: 'Accent palette — Dark',
        group: 'palette-accent-dark',
        variant: 'palette',
      },
      {
        id: 'palette-neutral-light',
        title: 'Neutral palette — Light',
        group: 'palette-neutral-light',
        variant: 'palette',
      },
      {
        id: 'palette-neutral-dark',
        title: 'Neutral palette — Dark',
        group: 'palette-neutral-dark',
        variant: 'palette',
      },
      {
        id: 'color-bg',
        title: 'Background',
        group: 'color-bg',
        variant: 'color',
      },
      {
        id: 'color-text',
        title: 'Text',
        group: 'color-text',
        variant: 'color-text',
      },
      {
        id: 'color-icon',
        title: 'Icon',
        group: 'color-icon',
        variant: 'color',
      },
      {
        id: 'color-border',
        title: 'Border',
        group: 'color-border',
        variant: 'color',
      },
      {
        id: 'color-shadow',
        title: 'Shadow',
        group: 'color-shadow',
        variant: 'color',
      },
      {
        id: 'color-utility',
        title: 'Utility',
        group: 'color-utility',
        variant: 'color',
      },
    ],
  },
  {
    id: 'cat-typography',
    title: 'Typography',
    description:
      'Composite text styles and the primitive font tokens they are made from.',
    sections: [
      {
        id: 'text-style',
        title: 'Text styles',
        group: 'text-style',
        variant: 'text-style',
      },
      {
        id: 'font-family',
        title: 'Font family',
        group: 'font-family',
        variant: 'font-family',
      },
      {
        id: 'font-weight',
        title: 'Font weight',
        group: 'font-weight',
        variant: 'font-weight',
      },
      {
        id: 'font-size',
        title: 'Font size',
        group: 'font-size',
        variant: 'font-size',
      },
      {
        id: 'font-line-height',
        title: 'Line height',
        group: 'font-line-height',
        variant: 'font-line-height',
      },
      {
        id: 'font-letter-spacing',
        title: 'Letter spacing',
        group: 'font-letter-spacing',
        variant: 'font-letter-spacing',
      },
      {
        id: 'font-text-case',
        title: 'Text case',
        group: 'font-text-case',
        variant: 'font-text-case',
      },
      {
        id: 'font-text-decoration',
        title: 'Text decoration',
        group: 'font-text-decoration',
        variant: 'font-text-decoration',
      },
    ],
  },
  {
    id: 'cat-space',
    title: 'Spacing & Sizing',
    description: 'Spacing scale, component sizes and raw dimension primitives.',
    sections: [
      { id: 'space', title: 'Spacing', group: 'space', variant: 'dimension' },
      { id: 'size', title: 'Sizing', group: 'size', variant: 'dimension' },
      {
        id: 'size-icon',
        title: 'Icon sizes',
        group: 'size-icon',
        variant: 'dimension',
      },
      {
        id: 'dimensions-rem',
        title: 'Dimensions (rem)',
        group: 'dimensions-rem',
        variant: 'dimension',
      },
      {
        id: 'dimensions-fixed',
        title: 'Dimensions (fixed)',
        group: 'dimensions-fixed',
        variant: 'dimension',
      },
    ],
  },
  {
    id: 'cat-surface',
    title: 'Borders & Elevation',
    description:
      'Corner radii, strokes, composite borders, shadows and opacity.',
    sections: [
      {
        id: 'border-radius',
        title: 'Border radius',
        group: 'border-radius',
        variant: 'border-radius',
      },
      {
        id: 'border-width',
        title: 'Border width',
        group: 'border-width',
        variant: 'border-width',
      },
      {
        id: 'border',
        title: 'Border composites',
        group: 'border',
        variant: 'border',
      },
      {
        id: 'box-shadow-elevation',
        title: 'Elevation',
        group: 'box-shadow-elevation',
        variant: 'shadow',
      },
      { id: 'opacity', title: 'Opacity', group: 'opacity', variant: 'opacity' },
    ],
  },
  {
    id: 'cat-motion',
    title: 'Motion',
    description: 'Durations, delays, easing curves and ready-made transitions.',
    sections: [
      {
        id: 'timing-duration',
        title: 'Duration',
        group: 'timing-duration',
        variant: 'motion-duration',
      },
      {
        id: 'timing-delay',
        title: 'Delay',
        group: 'timing-delay',
        variant: 'motion-delay',
      },
      {
        id: 'timing-timing-function',
        title: 'Easing',
        group: 'timing-timing-function',
        variant: 'motion-function',
      },
      {
        id: 'transition',
        title: 'Transitions',
        group: 'transition',
        variant: 'motion-transition',
      },
    ],
  },
  {
    id: 'cat-scale',
    title: 'Scales & Breakpoints',
    description:
      'Unitless math scales, density multipliers and responsive breakpoints.',
    sections: [
      {
        id: 'scale-unitless',
        title: 'Unitless scale',
        group: 'scale-unitless',
        variant: 'plain',
      },
      {
        id: 'scale-density-multiplier',
        title: 'Density multiplier',
        group: 'scale-density-multiplier',
        variant: 'plain',
      },
      {
        id: 'breakpoint',
        title: 'Breakpoints',
        group: 'breakpoint',
        variant: 'plain',
      },
    ],
  },
];

const ALL_SECTIONS = CATEGORIES.flatMap((category) => category.sections);
const TOTAL_TOKENS = ALL_SECTIONS.reduce(
  (sum, s) => sum + tokenRows(s.group).length,
  0,
);

@Component({
  selector: 'app-design-tokens-showcase',
  standalone: true,
  imports: [
    ShowcaseHeader,
    TokenSection,
    TextStyleSection,
    SearchInputComponent,
    IconComponent,
    ScrollbarComponent,
  ],
  providers: [TokenThemeService, TokenClipboardService],
  template: `
    <div class="dt">
      <div class="dt__main">
        <app-showcase-header
          title="Design Tokens"
          selector="@checkworkrights/design-tokens"
        ></app-showcase-header>

        <p class="dt__intro">
          {{ totalTokens }} tokens, read live from
          <code>@checkworkrights/design-tokens</code> (<code>light.css</code> /
          <code>dark.css</code>). Values update when you switch themes. Click
          any token to copy its <code>var(--name)</code> reference.
        </p>

        <div class="overview">
          @for (category of categories; track category.id) {
            <button
              type="button"
              class="overview__card"
              [class.overview__card--empty]="categoryCount(category) === 0"
              (click)="scrollTo(category.id, $event)"
            >
              <span class="overview__title">{{ category.title }}</span>
              <span class="overview__count">
                {{ categoryCount(category) }}
                @if (term()) {
                  <span class="overview__of"
                    >/ {{ categoryTotal(category) }}</span
                  >
                }
              </span>
              <span class="overview__desc">{{ category.description }}</span>
            </button>
          }
        </div>

        <div class="toolbar-sentinel" #sentinel></div>
        <div class="toolbar" [class.toolbar--stuck]="stuck()">
          <div class="toolbar__field">
            <cwr-search-input
              #search
              class="toolbar__search"
              [value]="term()"
              (valueChange)="term.set($event)"
              [debounceMs]="120"
              placeholder="Search tokens by name or description…"
            ></cwr-search-input>
            @if (!term()) {
              <kbd class="toolbar__kbd" aria-hidden="true">/</kbd>
            }
          </div>
          <span
            class="toolbar__count"
            [class.toolbar__count--filtered]="term()"
          >
            @if (term()) {
              <strong>{{ matchCount() }}</strong> of {{ totalTokens }}
            } @else {
              <strong>{{ totalTokens }}</strong> tokens
            }
          </span>
        </div>

        @for (category of categories; track category.id) {
          <section
            class="category"
            [id]="category.id"
            [class.is-hidden]="categoryCount(category) === 0"
          >
            <header class="category__header">
              <h2>{{ category.title }}</h2>
              <p>{{ category.description }}</p>
            </header>

            @for (section of category.sections; track section.id) {
              <div [class.is-hidden]="sectionCount(section.id) === 0">
                @if (section.variant === 'text-style') {
                  <app-text-style-section
                    [anchorId]="section.id"
                    [title]="section.title"
                    [filter]="term()"
                  ></app-text-style-section>
                } @else {
                  <app-token-section
                    [anchorId]="section.id"
                    [title]="section.title"
                    [group]="section.group"
                    [variant]="section.variant"
                    [filter]="term()"
                  ></app-token-section>
                }
              </div>
            }
          </section>
        }

        @if (matchCount() === 0) {
          <div class="empty">
            <cwr-icon icon="icon.ui.search" size="lg"></cwr-icon>
            <p class="empty__title">No tokens match “{{ term() }}”</p>
            <p class="empty__text">
              Try a shorter term, such as a group name like “radius” or “brand”.
            </p>
            <button type="button" class="empty__clear" (click)="term.set('')">
              Clear search
            </button>
          </div>
        }
      </div>

      <div class="toc">
        <nav class="toc__scroll" aria-label="Design token sections">
          @for (category of categories; track category.id) {
            @if (categoryCount(category) > 0) {
              <div class="toc__group">
                <span class="toc__heading">{{ category.title }}</span>
                @for (section of category.sections; track section.id) {
                  @if (sectionCount(section.id) > 0) {
                    <a
                      href="#"
                      class="toc__link"
                      [class.toc__link--active]="activeSection() === section.id"
                      (click)="scrollTo(section.id, $event)"
                    >
                      <span class="toc__label">{{ section.title }}</span>
                      <span class="toc__count">{{
                        sectionCount(section.id)
                      }}</span>
                    </a>
                  }
                }
              </div>
            }
          }
        </nav>
        <cwr-scrollbar overflow="vertical"></cwr-scrollbar>
      </div>
    </div>
  `,
  styles: [
    `
      .dt {
        display: flex;
        align-items: flex-start;
        gap: var(--space-xl, 1.5rem);
      }

      .dt__main {
        flex: 1;
        min-width: 0;
      }

      .dt__intro {
        max-width: 48rem;
        margin: 0 0 var(--space-lg, 1.25rem);
        color: var(--color-text-surface-secondary, inherit);
      }

      .dt__intro code {
        font-family: 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
      }

      .is-hidden {
        display: none;
      }

      /* Overview */
      .overview {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
        gap: var(--space-sm, 0.75rem);
        margin-bottom: var(--space-lg, 1.25rem);
      }

      .overview__card {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--space-3xs, 0.25rem) var(--space-xs, 0.5rem);
        padding: var(--space-md, 1rem);
        text-align: left;
        font: inherit;
        color: inherit;
        background: var(--color-bg-surface-raised, transparent);
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: var(--border-radius-surface, 0.75rem);
        cursor: pointer;
        transition:
          border-color 120ms ease,
          transform 120ms ease;
      }

      .overview__card:hover,
      .overview__card:focus-visible {
        border-color: var(--color-border-brand, currentColor);
        transform: translateY(-1px);
      }

      .overview__card--empty {
        opacity: 0.45;
      }

      .overview__title {
        font: var(--text-style-label, inherit);
        color: var(--color-text-surface, currentColor);
      }

      .overview__count {
        font: var(--text-style-label, inherit);
        color: var(--color-text-brand, currentColor);
        font-variant-numeric: tabular-nums;
      }

      .overview__of {
        color: var(--color-text-surface-subtle, currentColor);
        font-weight: 400;
      }

      .overview__desc {
        grid-column: 1 / -1;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
      }

      /* Toolbar */
      .toolbar-sentinel {
        height: 1px;
        margin-bottom: -1px;
      }

      .toolbar {
        position: sticky;
        top: calc(-1 * var(--space-xl, 1.5rem));
        z-index: 2;
        display: flex;
        align-items: center;
        gap: var(--space-md, 1rem);
        margin: 0 0 var(--space-xl, 1.5rem);
        padding: var(--space-sm, 0.75rem) var(--space-md, 1rem);
        background: var(
          --color-bg-surface-raised,
          var(--color-bg-surface, #fff)
        );
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: var(--border-radius-surface, 0.75rem);
        transition:
          margin 160ms ease,
          padding 160ms ease,
          border-radius 160ms ease,
          box-shadow 160ms ease;
      }

      .toolbar--stuck {
        margin-inline: calc(-1 * var(--space-xl, 1.5rem));
        padding-inline: var(--space-xl, 1.5rem);
        border-color: transparent transparent
          var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: 0;
        background: color-mix(
          in srgb,
          var(--color-bg-surface, #fff) 85%,
          transparent
        );
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: var(
          --box-shadow-elevation-sm,
          0 4px 12px rgba(0, 0, 0, 0.08)
        );
      }

      .toolbar__field {
        position: relative;
        flex: 1;
        max-width: 32rem;
      }

      .toolbar__search {
        display: block;
        width: 100%;
      }

      .toolbar__kbd {
        position: absolute;
        top: 50%;
        right: var(--space-sm, 0.75rem);
        transform: translateY(-50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.25rem;
        height: 1.25rem;
        padding: 0 0.25rem;
        box-sizing: border-box;
        font-family: 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.6875rem;
        color: var(--color-text-surface-subtle, currentColor);
        background: var(--color-bg-surface-nested, rgba(128, 128, 128, 0.1));
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.3));
        border-radius: var(--border-radius-xs, 0.25rem);
        pointer-events: none;
      }

      .toolbar__count {
        margin-left: auto;
        padding: var(--space-3xs, 0.25rem) var(--space-sm, 0.75rem);
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
        background: var(--color-bg-surface-nested, rgba(128, 128, 128, 0.1));
        border-radius: 999px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }

      .toolbar__count strong {
        color: var(--color-text-surface, currentColor);
      }

      .toolbar__count--filtered {
        color: var(--color-text-brand, currentColor);
        background: var(--color-bg-brand-subtle, rgba(71, 156, 255, 0.12));
      }

      .toolbar__count--filtered strong {
        color: inherit;
      }

      /* Categories */
      .category {
        scroll-margin-top: 5rem;
        margin-bottom: var(--space-2xl, 3rem);
      }

      .category__header {
        margin-bottom: var(--space-lg, 1.25rem);
        padding-bottom: var(--space-sm, 0.75rem);
        border-bottom: 2px solid
          var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .category__header h2 {
        margin: 0 0 var(--space-3xs, 0.25rem);
      }

      .category__header p {
        margin: 0;
        color: var(--color-text-surface-secondary, currentColor);
      }

      /* Empty state */
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xs, 0.5rem);
        padding: var(--space-2xl, 3rem) var(--space-md, 1rem);
        text-align: center;
        color: var(--color-text-surface-secondary, currentColor);
        border: 1px dashed
          var(--color-border-surface, rgba(128, 128, 128, 0.35));
        border-radius: var(--border-radius-surface, 0.75rem);
      }

      .empty p {
        margin: 0;
      }

      .empty__title {
        font: var(--text-style-label-lg, inherit);
        color: var(--color-text-surface, currentColor);
      }

      .empty__text {
        font: var(--text-style-caption, inherit);
      }

      .empty__clear {
        margin-top: var(--space-xs, 0.5rem);
        padding: var(--space-2xs, 0.375rem) var(--space-md, 1rem);
        font: var(--text-style-button-sm, inherit);
        color: var(--color-text-brand, currentColor);
        background: transparent;
        border: 1px solid var(--color-border-brand, currentColor);
        border-radius: var(--border-radius-sm, 0.375rem);
        cursor: pointer;
      }

      /* Table of contents */
      .toc {
        flex: 0 0 14rem;
        position: sticky;
        top: var(--space-sm, 0.75rem);
      }

      .toc__scroll {
        display: flex;
        flex-direction: column;
        gap: var(--space-md, 1rem);
        max-height: calc(100vh - 6rem);
        overflow-y: auto;
        padding: var(--space-sm, 0.75rem) 14px var(--space-sm, 0.75rem)
          var(--space-2xs, 0.375rem);
        box-sizing: border-box;
      }

      .toc__group {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .toc__heading {
        padding: 0 var(--space-2xs, 0.5rem) var(--space-3xs, 0.25rem);
        font-size: 0.6875rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-text-surface-subtle, currentColor);
      }

      .toc__link {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        padding: var(--space-3xs, 0.25rem) var(--space-2xs, 0.5rem);
        border-left: 2px solid transparent;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, inherit);
        text-decoration: none;
        transition:
          color 120ms ease,
          border-color 120ms ease,
          background-color 120ms ease;
      }

      .toc__label {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .toc__count {
        font-size: 0.6875rem;
        color: var(--color-text-surface-subtle, currentColor);
        font-variant-numeric: tabular-nums;
      }

      .toc__link:hover {
        color: var(--color-text-surface, inherit);
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.08));
      }

      .toc__link--active {
        color: var(--color-text-brand, inherit);
        border-left-color: var(--color-border-brand, currentColor);
        background: var(--color-bg-brand-subtle, rgba(71, 156, 255, 0.1));
        font-weight: 600;
      }

      @media (max-width: 1100px) {
        .toc {
          display: none;
        }
      }
    `,
  ],
})
export class DesignTokensShowcase implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private observer?: IntersectionObserver;
  private stickObserver?: IntersectionObserver;
  private sentinel = viewChild.required<ElementRef<HTMLElement>>('sentinel');
  private search = viewChild.required('search', { read: ElementRef });

  readonly categories = CATEGORIES;
  readonly totalTokens = TOTAL_TOKENS;
  readonly term = signal('');
  readonly stuck = signal(false);
  readonly activeSection = signal(ALL_SECTIONS[0].id);

  private readonly counts = computed(() => {
    const term = this.term();
    return new Map(
      ALL_SECTIONS.map((s) => [s.id, filterRows(s.group, term).length]),
    );
  });

  readonly matchCount = computed(() => {
    let total = 0;
    for (const count of this.counts().values()) total += count;
    return total;
  });

  sectionCount(id: string): number {
    return this.counts().get(id) ?? 0;
  }

  categoryCount(category: Category): number {
    return category.sections.reduce(
      (sum, s) => sum + this.sectionCount(s.id),
      0,
    );
  }

  categoryTotal(category: Category): number {
    return category.sections.reduce(
      (sum, s) => sum + tokenRows(s.group).length,
      0,
    );
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        this.activeSection.set(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    document
      .querySelectorAll('.token-section')
      .forEach((el) => this.observer!.observe(el));

    this.stickObserver = new IntersectionObserver(([entry]) =>
      this.stuck.set(
        !entry.isIntersecting &&
          entry.boundingClientRect.top < window.innerHeight / 2,
      ),
    );
    this.stickObserver.observe(this.sentinel().nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stickObserver?.disconnect();
  }

  @HostListener('document:keydown', ['$event'])
  focusSearch(event: KeyboardEvent): void {
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey)
      return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable="true"]'))
      return;
    const input = this.search().nativeElement.querySelector('input');
    if (!input) return;
    event.preventDefault();
    input.focus();
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    if (ALL_SECTIONS.some((s) => s.id === id)) this.activeSection.set(id);
    this.router
      .navigate([], { relativeTo: this.route, fragment: id })
      .then(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  }
}
