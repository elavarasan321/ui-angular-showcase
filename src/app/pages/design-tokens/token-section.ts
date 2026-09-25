import { Component, computed, inject, input } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';
import { ResolvedTokenRow, filterRows, humanize, resolveRows } from './token-data';
import { TokenClipboardService } from './token-clipboard.service';
import { SECTION_STYLES } from './token-styles';
import { TokenThemeService } from './token-theme.service';

export type TokenVariant =
  | 'palette'
  | 'color'
  | 'color-text'
  | 'dimension'
  | 'opacity'
  | 'shadow'
  | 'border'
  | 'border-radius'
  | 'border-width'
  | 'font-family'
  | 'font-weight'
  | 'font-size'
  | 'font-line-height'
  | 'font-letter-spacing'
  | 'font-text-case'
  | 'font-text-decoration'
  | 'motion-duration'
  | 'motion-delay'
  | 'motion-function'
  | 'motion-transition'
  | 'plain';

interface Ramp {
  key: string;
  label: string;
  steps: (ResolvedTokenRow & { step: string })[];
}

@Component({
  selector: 'app-token-section',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section class="token-section" [id]="anchorId()">
      <header class="section-header">
        <h3>{{ title() }}</h3>
        <span class="section-count">{{ rows().length }}</span>
      </header>

      @switch (layout()) {
        @case ('palette') {
          <div class="panel ramps">
            @for (ramp of ramps(); track ramp.key) {
              <div class="ramp">
                <div class="ramp__label">{{ ramp.label }}</div>
                <div class="ramp__steps">
                  @for (step of ramp.steps; track step.cssVar) {
                    <button
                      type="button"
                      class="ramp__step"
                      [title]="step.cssVar + '\\n' + step.value + '\\n\\n' + step.description"
                      (click)="clipboard.copy(step.cssVar)"
                    >
                      <span class="ramp__chip" [class.checker]="isAlpha(ramp.key)">
                        <span class="ramp__fill" [style.background]="varRef(step.cssVar)"></span>
                        @if (clipboard.copied() === step.cssVar) {
                          <span class="ramp__copied">
                            <cwr-icon icon="icon.ui.check" size="sm"></cwr-icon>
                          </span>
                        }
                      </span>
                      <span class="ramp__step-name">{{ step.step }}</span>
                    </button>
                  }
                </div>
              </div>
            }
          </div>
          <p class="hint">Click a swatch to copy its <code>var()</code> reference. Hover for the value.</p>
        }

        @case ('swatch') {
          <div class="swatches">
            @for (row of resolved(); track row.cssVar) {
              <button
                type="button"
                class="swatch"
                [class.swatch--copied]="clipboard.copied() === row.cssVar"
                [title]="row.description"
                (click)="clipboard.copy(row.cssVar)"
              >
                <span class="swatch__preview checker">
                  @if (variant() === 'color-text') {
                    <span class="swatch__surface">
                      <span class="swatch__glyph" [style.color]="varRef(row.cssVar)">Aa</span>
                    </span>
                  } @else {
                    <span class="swatch__fill" [style.background]="varRef(row.cssVar)"></span>
                  }
                  <span class="swatch__badge">
                    <cwr-icon
                      [icon]="clipboard.copied() === row.cssVar ? 'icon.ui.check' : 'icon.ui.copy'"
                      size="sm"
                    ></cwr-icon>
                    {{ clipboard.copied() === row.cssVar ? 'Copied' : 'Copy' }}
                  </span>
                </span>
                <span class="swatch__body">
                  <span class="swatch__name mono">{{ row.cssVar }}</span>
                  <span class="swatch__value mono">{{ row.value }}</span>
                  <span class="swatch__desc">{{ row.description }}</span>
                </span>
              </button>
            }
          </div>
        }

        @default {
          <div class="panel list">
            @for (row of resolved(); track row.cssVar) {
              <div class="item">
                <div class="item__preview" [class.item__preview--padded]="variant() === 'shadow'">
                  @switch (variant()) {
                    @case ('plain') {
                      <span class="item__big-value mono">{{ row.value }}</span>
                    }
                    @case ('dimension') {
                      <span class="bar" [style.width]="varRef(row.cssVar)"></span>
                    }
                    @case ('opacity') {
                      <span class="shape checker">
                        <span class="shape__fill shape__fill--brand" [style.opacity]="varRef(row.cssVar)"></span>
                      </span>
                    }
                    @case ('shadow') {
                      <span class="shape shape--raised" [style.box-shadow]="varRef(row.cssVar)"></span>
                    }
                    @case ('border') {
                      <span class="shape shape--wide" [style.border]="varRef(row.cssVar)"></span>
                    }
                    @case ('border-radius') {
                      <span class="shape shape--brand" [style.border-radius]="varRef(row.cssVar)"></span>
                    }
                    @case ('border-width') {
                      <span class="shape shape--outlined" [style.border-width]="varRef(row.cssVar)"></span>
                    }
                    @case ('font-family') {
                      <span class="sample sample--lg" [style.font-family]="varRef(row.cssVar)">Aa Bb Cc 123</span>
                    }
                    @case ('font-weight') {
                      <span class="sample sample--lg" [style.font-weight]="varRef(row.cssVar)">Aa Bb Cc</span>
                    }
                    @case ('font-size') {
                      <span class="sample" [style.font-size]="varRef(row.cssVar)">Aa</span>
                    }
                    @case ('font-line-height') {
                      <span class="sample sample--para" [style.line-height]="varRef(row.cssVar)"
                        >Line height controls the vertical rhythm between wrapped lines.</span
                      >
                    }
                    @case ('font-letter-spacing') {
                      <span class="sample" [style.letter-spacing]="varRef(row.cssVar)">Letter spacing</span>
                    }
                    @case ('font-text-case') {
                      <span class="sample" [style.text-transform]="varRef(row.cssVar)">Sample text</span>
                    }
                    @case ('font-text-decoration') {
                      <span class="sample" [style.text-decoration]="varRef(row.cssVar)">Sample text</span>
                    }
                    @default {
                      <span class="track">
                        <span class="track__dot" [style.transition]="motionTransition(row.cssVar)"></span>
                      </span>
                    }
                  }
                </div>

                <div class="item__meta">
                  <span class="item__name mono">{{ row.cssVar }}</span>
                  <span class="item__desc">{{ row.description }}</span>
                </div>

                <span class="item__value mono">{{ variant() === 'plain' ? '' : row.value }}</span>

                <button
                  type="button"
                  class="copy-btn"
                  [class.copy-btn--copied]="clipboard.copied() === row.cssVar"
                  [attr.aria-label]="'Copy var(' + row.cssVar + ')'"
                  (click)="clipboard.copy(row.cssVar)"
                >
                  <cwr-icon
                    [icon]="clipboard.copied() === row.cssVar ? 'icon.ui.check' : 'icon.ui.copy'"
                    size="sm"
                  ></cwr-icon>
                </button>
              </div>
            }
          </div>
          @if (isMotion()) {
            <p class="hint">Hover a row to play the motion sample.</p>
          }
        }
      }
    </section>
  `,
  styles: [
    SECTION_STYLES,
    `
      .hint {
        margin: var(--space-xs, 0.5rem) 0 0;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-subtle, currentColor);
      }

      /* Palette ramps */
      .ramps {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm, 0.75rem);
        padding: var(--space-md, 1rem);
      }

      .ramp {
        display: grid;
        grid-template-columns: 7rem minmax(0, 1fr);
        align-items: center;
        gap: var(--space-sm, 0.75rem);
      }

      .ramp__label {
        font: var(--text-style-label-sm, inherit);
        color: var(--color-text-surface-secondary, currentColor);
      }

      .ramp__steps {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 3px;
      }

      .ramp__step {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        padding: 0;
        border: 0;
        background: none;
        color: inherit;
        cursor: pointer;
        min-width: 0;
      }

      .ramp__chip {
        position: relative;
        display: block;
        height: 2.75rem;
        border-radius: var(--border-radius-sm, 0.375rem);
        overflow: hidden;
        box-shadow: inset 0 0 0 1px rgba(128, 128, 128, 0.18);
        transition: transform 120ms ease;
      }

      .ramp__step:hover .ramp__chip,
      .ramp__step:focus-visible .ramp__chip {
        transform: translateY(-2px);
        box-shadow:
          inset 0 0 0 1px rgba(128, 128, 128, 0.18),
          0 4px 10px rgba(0, 0, 0, 0.18);
      }

      .ramp__fill {
        position: absolute;
        inset: 0;
      }

      .ramp__copied {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
      }

      .ramp__step-name {
        font: var(--text-style-caption, inherit);
        font-size: 0.6875rem;
        color: var(--color-text-surface-subtle, currentColor);
        text-align: center;
        font-variant-numeric: tabular-nums;
      }

      /* Swatch cards */
      .swatches {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(11.5rem, 1fr));
        gap: var(--space-sm, 0.75rem);
      }

      .swatch {
        display: flex;
        flex-direction: column;
        padding: 0;
        text-align: left;
        color: inherit;
        font: inherit;
        background: var(--color-bg-surface, transparent);
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: var(--border-radius-surface, 0.75rem);
        overflow: hidden;
        cursor: pointer;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease,
          transform 120ms ease;
      }

      .swatch:hover,
      .swatch:focus-visible {
        border-color: var(--color-border-brand, currentColor);
        box-shadow: var(--box-shadow-elevation-sm, 0 2px 8px rgba(0, 0, 0, 0.12));
        transform: translateY(-1px);
      }

      .swatch--copied,
      .swatch--copied:hover {
        border-color: var(--color-border-positive, #2e7d32);
      }

      .swatch__preview {
        position: relative;
        display: block;
        height: 4.5rem;
        border-bottom: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .swatch__fill,
      .swatch__surface {
        position: absolute;
        inset: 0;
      }

      .swatch__surface {
        display: flex;
        align-items: center;
        padding-inline: var(--space-md, 1rem);
        background: var(--color-bg-surface, #fff);
      }

      .swatch__glyph {
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 1;
      }

      .swatch__badge {
        position: absolute;
        top: var(--space-2xs, 0.375rem);
        right: var(--space-2xs, 0.375rem);
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.125rem 0.5rem 0.125rem 0.375rem;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 0.6875rem;
        font-weight: 600;
        opacity: 0;
        transition: opacity 120ms ease;
      }

      .swatch:hover .swatch__badge,
      .swatch:focus-visible .swatch__badge,
      .swatch--copied .swatch__badge {
        opacity: 1;
      }

      .swatch--copied .swatch__badge {
        background: var(--color-bg-positive, #2e7d32);
      }

      .swatch__body {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: var(--space-xs, 0.5rem) var(--space-sm, 0.75rem) var(--space-sm, 0.75rem);
        min-width: 0;
      }

      .swatch__name {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-text-surface, currentColor);
        overflow-wrap: anywhere;
      }

      .swatch__value {
        font-size: 0.6875rem;
        color: var(--color-text-surface-subtle, currentColor);
        overflow-wrap: anywhere;
      }

      .swatch__desc {
        margin-top: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Generic list */
      .item {
        display: grid;
        grid-template-columns: minmax(8rem, 14rem) minmax(0, 1fr) minmax(0, 11rem) auto;
        align-items: center;
        gap: var(--space-md, 1rem);
        padding: var(--space-sm, 0.75rem) var(--space-md, 1rem);
        border-bottom: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        transition: background-color 120ms ease;
      }

      .item:last-child {
        border-bottom: 0;
      }

      .item:hover {
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.06));
      }

      .item__preview {
        display: flex;
        align-items: center;
        min-height: 2.5rem;
        min-width: 0;
        overflow: hidden;
      }

      .item__preview--padded {
        padding: var(--space-sm, 0.75rem);
        overflow: visible;
      }

      .item__meta {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
      }

      .item__name {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--color-text-surface, currentColor);
        overflow-wrap: anywhere;
      }

      .item__desc {
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
      }

      .item__value {
        font-size: 0.75rem;
        color: var(--color-text-surface-subtle, currentColor);
        text-align: right;
        overflow-wrap: anywhere;
      }

      .item__big-value {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text-surface, currentColor);
      }

      .bar {
        display: block;
        height: 0.75rem;
        min-width: 2px;
        max-width: 100%;
        border-radius: 999px;
        background: var(--color-bg-brand, #479cff);
      }

      .shape {
        position: relative;
        display: block;
        width: 3rem;
        height: 3rem;
        box-sizing: border-box;
        border-radius: var(--border-radius-sm, 0.375rem);
        overflow: hidden;
      }

      .shape--wide {
        width: 100%;
        max-width: 8rem;
        background: var(--color-bg-surface-raised, transparent);
      }

      .shape--raised {
        width: 100%;
        max-width: 8rem;
        height: 2.5rem;
        overflow: visible;
        background: var(--color-bg-surface-raised, #fff);
      }

      .shape--brand {
        background: var(--color-bg-brand, #479cff);
      }

      .shape--outlined {
        border-style: solid;
        border-color: var(--color-border-brand, currentColor);
        background: var(--color-bg-surface-raised, transparent);
      }

      .shape__fill {
        position: absolute;
        inset: 0;
      }

      .shape__fill--brand {
        background: var(--color-bg-brand, #479cff);
      }

      .sample {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--color-text-surface, currentColor);
      }

      .sample--lg {
        font-size: 1.125rem;
      }

      .sample--para {
        white-space: normal;
        font-size: 0.8125rem;
        max-width: 14rem;
        background: var(--color-bg-brand-subtle, rgba(71, 156, 255, 0.12));
      }

      .track {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 2rem;
        padding: 0.25rem;
        box-sizing: border-box;
        border-radius: 999px;
        background: var(--color-bg-surface-nested, rgba(128, 128, 128, 0.12));
      }

      .track__dot {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 0;
        border-radius: 999px;
        background: var(--color-bg-brand, #479cff);
      }

      .item:hover .track__dot {
        margin-left: calc(100% - 1.5rem);
      }

      @media (max-width: 1100px) {
        .ramp {
          grid-template-columns: 1fr;
          gap: var(--space-3xs, 0.25rem);
        }
      }

      @media (max-width: 720px) {
        .ramp__steps {
          grid-template-columns: repeat(6, minmax(0, 1fr));
        }

        .item {
          grid-template-columns: minmax(0, 1fr) auto;
        }

        .item__preview {
          grid-column: 1 / -1;
        }

        .item__value {
          grid-column: 1;
          text-align: left;
        }

        .item__value:empty {
          display: none;
        }

        .copy-btn {
          grid-column: 2;
          grid-row: 2;
        }
      }
    `,
  ],
})
export class TokenSection {
  readonly title = input.required<string>();
  readonly group = input.required<string>();
  readonly variant = input.required<TokenVariant>();
  readonly anchorId = input('');
  readonly filter = input('');

  private theme = inject(TokenThemeService);
  protected clipboard = inject(TokenClipboardService);

  readonly rows = computed(() => filterRows(this.group(), this.filter()));

  readonly resolved = computed(() => {
    this.theme.version();
    return resolveRows(this.rows());
  });

  readonly layout = computed(() => {
    const variant = this.variant();
    if (variant === 'palette') return 'palette';
    if (variant === 'color' || variant === 'color-text') return 'swatch';
    return 'list';
  });

  readonly isMotion = computed(() => this.variant().startsWith('motion-'));

  readonly ramps = computed<Ramp[]>(() => {
    const ramps = new Map<string, Ramp>();
    for (const row of this.resolved()) {
      const match = /^(.*)-(\d+)$/.exec(row.name);
      const key = match ? match[1] : row.name;
      const step = match ? match[2] : row.name;
      if (!ramps.has(key)) ramps.set(key, { key, label: humanize(key), steps: [] });
      ramps.get(key)!.steps.push({ ...row, step });
    }
    return [...ramps.values()];
  });

  isAlpha(key: string): boolean {
    return key.includes('alpha');
  }

  varRef(cssVar: string): string {
    return `var(${cssVar})`;
  }

  motionTransition(cssVar: string): string {
    switch (this.variant()) {
      case 'motion-duration':
        return `margin-left var(${cssVar}) ease`;
      case 'motion-delay':
        return `margin-left 300ms ease var(${cssVar})`;
      case 'motion-function':
        return `margin-left 600ms var(${cssVar})`;
      case 'motion-transition':
        return `margin-left var(${cssVar})`;
      default:
        return '';
    }
  }
}
