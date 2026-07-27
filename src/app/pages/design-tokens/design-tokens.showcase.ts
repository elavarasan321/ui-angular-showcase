import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowcaseHeader } from '../showcase/showcase-header';
import { TokenSection, TokenVariant } from './token-section';
import { TextStyleSection } from './text-style-section';
import { TokenThemeService } from './token-theme.service';

interface Section {
  id: string;
  title: string;
  group: string;
  variant: TokenVariant;
}

const SECTIONS: Section[] = [
  {
    id: 'palette-accent-seed',
    title: 'Seed Colors — Accent',
    group: 'palette-accent-seed',
    variant: 'color',
  },
  {
    id: 'palette-neutral-seed',
    title: 'Seed Colors — Neutral',
    group: 'palette-neutral-seed',
    variant: 'color',
  },
  {
    id: 'palette-accent-light',
    title: 'Accent Palette — Light',
    group: 'palette-accent-light',
    variant: 'color',
  },
  {
    id: 'palette-accent-dark',
    title: 'Accent Palette — Dark',
    group: 'palette-accent-dark',
    variant: 'color',
  },
  {
    id: 'palette-neutral-light',
    title: 'Neutral Palette — Light',
    group: 'palette-neutral-light',
    variant: 'color',
  },
  {
    id: 'palette-neutral-dark',
    title: 'Neutral Palette — Dark',
    group: 'palette-neutral-dark',
    variant: 'color',
  },
  { id: 'color-bg', title: 'Semantic Colors — Background', group: 'color-bg', variant: 'color' },
  { id: 'color-text', title: 'Semantic Colors — Text', group: 'color-text', variant: 'color' },
  { id: 'color-icon', title: 'Semantic Colors — Icon', group: 'color-icon', variant: 'color' },
  {
    id: 'color-border',
    title: 'Semantic Colors — Border',
    group: 'color-border',
    variant: 'color',
  },
  {
    id: 'color-shadow',
    title: 'Semantic Colors — Shadow',
    group: 'color-shadow',
    variant: 'color',
  },
  {
    id: 'color-utility',
    title: 'Semantic Colors — Utility',
    group: 'color-utility',
    variant: 'color',
  },
  { id: 'font-family', title: 'Font Family', group: 'font-family', variant: 'font-family' },
  { id: 'font-weight', title: 'Font Weight', group: 'font-weight', variant: 'font-weight' },
  { id: 'font-size', title: 'Font Size', group: 'font-size', variant: 'font-size' },
  {
    id: 'font-line-height',
    title: 'Line Height',
    group: 'font-line-height',
    variant: 'font-line-height',
  },
  {
    id: 'font-letter-spacing',
    title: 'Letter Spacing',
    group: 'font-letter-spacing',
    variant: 'font-letter-spacing',
  },
  { id: 'font-text-case', title: 'Text Case', group: 'font-text-case', variant: 'font-text-case' },
  {
    id: 'font-text-decoration',
    title: 'Text Decoration',
    group: 'font-text-decoration',
    variant: 'font-text-decoration',
  },
  { id: 'space', title: 'Spacing', group: 'space', variant: 'dimension' },
  { id: 'size', title: 'Sizing', group: 'size', variant: 'dimension' },
  { id: 'size-icon', title: 'Icon Sizes', group: 'size-icon', variant: 'dimension' },
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
  { id: 'border-radius', title: 'Border Radius', group: 'border-radius', variant: 'border-radius' },
  { id: 'border-width', title: 'Border Width', group: 'border-width', variant: 'border-width' },
  { id: 'border', title: 'Border Composites', group: 'border', variant: 'border' },
  {
    id: 'box-shadow-elevation',
    title: 'Elevation',
    group: 'box-shadow-elevation',
    variant: 'shadow',
  },
  { id: 'opacity', title: 'Opacity', group: 'opacity', variant: 'opacity' },
  { id: 'scale-unitless', title: 'Scales', group: 'scale-unitless', variant: 'plain' },
  {
    id: 'scale-density-multiplier',
    title: 'Density Multiplier',
    group: 'scale-density-multiplier',
    variant: 'plain',
  },
  { id: 'breakpoint', title: 'Breakpoints', group: 'breakpoint', variant: 'plain' },
  {
    id: 'timing-duration',
    title: 'Timing — Duration',
    group: 'timing-duration',
    variant: 'motion-duration',
  },
  { id: 'timing-delay', title: 'Timing — Delay', group: 'timing-delay', variant: 'motion-delay' },
  {
    id: 'timing-timing-function',
    title: 'Timing — Easing',
    group: 'timing-timing-function',
    variant: 'motion-function',
  },
  { id: 'transition', title: 'Transitions', group: 'transition', variant: 'motion-transition' },
];

@Component({
  selector: 'app-design-tokens-showcase',
  standalone: true,
  imports: [ShowcaseHeader, TokenSection, TextStyleSection],
  providers: [TokenThemeService],
  template: `
    <div class="page-layout">
      <div class="page-content">
        <app-showcase-header
          title="Design Tokens"
          selector="@checkworkrights/design-tokens"
        ></app-showcase-header>

        <p class="intro">
          Every token below is read live from
          <code>@checkworkrights/design-tokens</code> (<code>dark.css</code> /
          <code>light.css</code>). Toggle the theme with the button in the corner to see values
          update. Click any token to copy its <code>var(--name)</code> reference.
        </p>

        @for (section of sections; track section.id) {
          <app-token-section
            [anchorId]="section.id"
            [title]="section.title"
            [group]="section.group"
            [variant]="section.variant"
          ></app-token-section>
        }

        <app-text-style-section></app-text-style-section>
      </div>

      <nav class="toc">
        @for (section of sections; track section.id) {
          <a
            href="#"
            class="toc__link"
            [class.toc__link--active]="activeSection() === section.id"
            (click)="scrollTo(section.id, $event)"
            >{{ section.title }}</a
          >
        }
        <a
          href="#"
          class="toc__link"
          [class.toc__link--active]="activeSection() === 'text-style'"
          (click)="scrollTo('text-style', $event)"
          >Text Styles</a
        >
      </nav>
    </div>
  `,
  styles: [
    `
      .page-layout {
        display: flex;
        align-items: flex-start;
        gap: var(--space-xl, 1.5rem);
      }

      .page-content {
        flex: 1;
        min-width: 0;
      }

      .intro {
        max-width: 60rem;
        margin-bottom: var(--space-xl, 1.5rem);
      }

      .intro code {
        font-family: 'SFMono-Regular', Consolas, monospace;
      }

      .toc {
        flex: 0 0 14rem;
        display: flex;
        flex-direction: column;
        padding: var(--space-md, 1rem);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-md, 0.5rem);
        position: sticky;
        top: var(--space-sm);
        max-height: calc(100vh - 6rem);
        overflow-y: auto;
        box-sizing: border-box;
      }

      .toc__link {
        display: block;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, inherit);
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: var(--space-3xs, 0.25rem) var(--space-2xs, 0.5rem);
        border-radius: var(--border-radius-sm, 0.25rem);
        transition:
          background-color 120ms ease,
          color 120ms ease;
      }

      .toc__link:hover {
        color: var(--color-text-brand, inherit);
        text-decoration: underline;
      }

      .toc__link--active {
        background: var(--color-bg-brand, #479cff);
        color: var(--color-text-brand-inverse, #fff);
      }

      .toc__link--active:hover {
        color: var(--color-text-brand-inverse, #fff);
        text-decoration: none;
      }

      @media (max-width: 900px) {
        .page-layout {
          flex-direction: column-reverse;
        }

        .toc {
          position: static;
          width: 100%;
          flex-direction: row;
          flex-wrap: wrap;
          max-height: none;
          overflow-y: visible;
        }
      }
    `,
  ],
})
export class DesignTokensShowcase implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private observer?: IntersectionObserver;

  sections = SECTIONS;
  activeSection = signal(SECTIONS[0]?.id ?? '');

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        this.activeSection.set(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    document.querySelectorAll('.token-section').forEach((el) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.activeSection.set(id);
    this.router.navigate([], { relativeTo: this.route, fragment: id }).then(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
