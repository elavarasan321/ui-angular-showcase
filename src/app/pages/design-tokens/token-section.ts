import { Component, Input, computed, inject, signal } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';
import { TOKEN_DESCRIPTIONS, TOKEN_GROUPS } from './design-tokens.generated';
import { TokenThemeService } from './token-theme.service';

export type TokenVariant =
  | 'color'
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

const TEXT_VARIANTS: TokenVariant[] = [
  'font-family',
  'font-weight',
  'font-size',
  'font-line-height',
  'font-letter-spacing',
  'font-text-case',
  'font-text-decoration',
];
const COMPACT_VARIANTS: TokenVariant[] = ['dimension'];
const MOTION_VARIANTS: TokenVariant[] = [
  'motion-duration',
  'motion-delay',
  'motion-function',
  'motion-transition',
];

interface TokenRow {
  suffix: string;
  cssVar: string;
  description: string;
}

function titleFromSuffix(suffix: string): string {
  return suffix
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

@Component({
  selector: 'app-token-section',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section class="token-section" [id]="anchorId">
      <h2>{{ title }}</h2>
      <table class="token-table">
        <colgroup>
          <col style="width: 25%" />
          <col style="width: 50%" />
          <col style="width: 25%" />
        </colgroup>
        <thead>
          <tr>
            <th>Example</th>
            <th>Description</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.cssVar) {
            <tr class="token-row">
              <td class="token-example-cell">
                <div class="token-example">
                  @if (variant === 'plain') {
                    <span class="token-value token-value--plain">{{
                      resolvedValue(row.cssVar)
                    }}</span>
                  } @else if (isMotion) {
                    <div class="motion-track">
                      <span
                        class="motion-box"
                        [style.transition]="motionTransition(row.cssVar)"
                      ></span>
                    </div>
                    <span class="token-value">{{ resolvedValue(row.cssVar) }}</span>
                  } @else {
                    <div
                      class="token-box"
                      [class.token-box--compact]="isCompact"
                      [class.token-box--text]="isText"
                      [class.token-box--shadow]="variant === 'shadow'"
                    >
                      @switch (variant) {
                        @case ('color') {
                          <span class="token-fill" [style.background]="varRef(row.cssVar)"></span>
                        }
                        @case ('opacity') {
                          <span
                            class="token-fill"
                            style="background: var(--color-bg-brand, #479cff);"
                            [style.opacity]="varRef(row.cssVar)"
                          ></span>
                        }
                        @case ('shadow') {
                          <span
                            class="token-fill"
                            style="background: var(--color-bg-surface-raised, #222);"
                            [style.box-shadow]="varRef(row.cssVar)"
                          ></span>
                        }
                        @case ('border') {
                          <span
                            class="token-fill"
                            style="background: var(--color-bg-surface);"
                            [style.border]="varRef(row.cssVar)"
                          ></span>
                        }
                        @case ('border-radius') {
                          <span
                            class="token-fill"
                            style="background: var(--color-bg-brand, #479cff);"
                            [style.border-radius]="varRef(row.cssVar)"
                          ></span>
                        }
                        @case ('border-width') {
                          <span
                            class="token-fill"
                            style="background: var(--color-bg-surface); border-style: solid; border-color: var(--color-border-brand, currentColor);"
                            [style.border-width]="varRef(row.cssVar)"
                          ></span>
                        }
                        @case ('font-family') {
                          <span
                            class="token-text-sample"
                            [style.font-family]="varRef(row.cssVar)"
                            >{{ row.suffix }}</span
                          >
                        }
                        @case ('font-weight') {
                          <span
                            class="token-text-sample"
                            [style.font-weight]="varRef(row.cssVar)"
                            >{{ row.suffix }}</span
                          >
                        }
                        @case ('font-size') {
                          <span class="token-text-sample" [style.font-size]="varRef(row.cssVar)">{{
                            row.suffix
                          }}</span>
                        }
                        @case ('font-line-height') {
                          <span
                            class="token-text-sample"
                            [style.line-height]="varRef(row.cssVar)"
                            >{{ row.description }}</span
                          >
                        }
                        @case ('font-letter-spacing') {
                          <span
                            class="token-text-sample"
                            [style.letter-spacing]="varRef(row.cssVar)"
                            >{{ row.suffix }}</span
                          >
                        }
                        @case ('font-text-case') {
                          <span
                            class="token-text-sample"
                            [style.text-transform]="varRef(row.cssVar)"
                            >{{ row.suffix }}</span
                          >
                        }
                        @case ('font-text-decoration') {
                          <span
                            class="token-text-sample"
                            [style.text-decoration]="varRef(row.cssVar)"
                            >{{ row.suffix }}</span
                          >
                        }
                        @case ('dimension') {
                          <span
                            class="token-dimension-fill"
                            [style.width]="varRef(row.cssVar)"
                          ></span>
                        }
                      }
                    </div>
                    <span class="token-value">{{ resolvedValue(row.cssVar) }}</span>
                  }
                </div>
              </td>
              <td class="token-description">{{ row.description }}</td>
              <td class="token-token">
                <button
                  type="button"
                  class="copy-chip"
                  [class.copy-chip--copied]="copiedVar() === row.cssVar"
                  (click)="copy(row.cssVar)"
                >
                  <span class="copy-chip__text">{{
                    copiedVar() === row.cssVar ? 'Copied!' : varRef(row.cssVar)
                  }}</span>
                  <cwr-icon
                    class="copy-chip__icon"
                    [icon]="copiedVar() === row.cssVar ? 'icon.ui.check' : 'icon.ui.copy'"
                    size="sm"
                  ></cwr-icon>
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      .token-section {
        margin-bottom: var(--space-2xl, 3rem);
        scroll-margin-top: var(--space-xl, 1.5rem);
      }

      .token-section h2 {
        margin-bottom: var(--space-md, 1rem);
      }

      .token-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
      }

      .token-table th {
        text-align: left;
        font: var(--text-style-label, inherit);
        color: var(--color-text-surface-secondary, currentColor);
        padding: var(--space-2xs, 0.5rem) var(--space-lg, 1.25rem) var(--space-2xs, 0.5rem) 0;
      }

      .token-row td {
        vertical-align: middle;
        padding-block: var(--space-md, 1rem);
        padding-inline: 0 var(--space-lg, 1.25rem);
        border-bottom: 1px solid var(--color-border-surface, #222);
        overflow-wrap: break-word;
      }

      .token-description {
        font: var(--text-style-body, inherit);
        color: var(--color-text-surface-secondary, currentColor);
      }

      .token-example {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3xs, 0.25rem);
        width: 100%;
      }

      .token-box {
        width: 100%;
        height: 5.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .token-box--compact {
        height: 2.5rem;
        justify-content: flex-start;
      }

      .token-box--text {
        height: auto;
        min-height: 2.5rem;
        justify-content: flex-start;
        text-align: left;
      }

      .token-box--shadow {
        height: 6.75rem;
      }

      .token-fill {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: var(--border-radius-md, 0.5rem);
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.3));
      }

      .token-dimension-fill {
        height: 1.25rem;
        min-width: 2px;
        background: var(--color-bg-brand, #479cff);
        border-radius: var(--border-radius-xs, 0.125rem);
      }

      .motion-track {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 2.5rem;
        background: var(--color-bg-surface-nested);
        border-radius: var(--border-radius-md);
        padding: var(--space-2xs, 0.5rem);
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
      }

      .motion-hint {
        position: absolute;
        top: var(--space-3xs, 0.25rem);
        right: var(--space-2xs, 0.5rem);
        font-size: 0.65rem;
        color: var(--color-text-surface-subtle, currentColor);
        opacity: 0.7;
        pointer-events: none;
      }

      .motion-box {
        display: block;
        flex-shrink: 0;
        height: 1.5rem;
        width: 1.5rem;
        margin-left: 0;
        background: var(--color-bg-brand, #479cff);
        border-radius: var(--border-radius-sm, 0.25rem);
      }

      .motion-track:hover .motion-box {
        margin-left: calc(100% - 1.5rem);
      }

      .token-text-sample {
        white-space: normal;
      }

      .token-value {
        font-size: var(--font-size-sm, 0.75rem) !important;
        font-family: 'SFMono-Regular', Consolas, monospace;
        color: var(--color-text-surface-secondary, currentColor);
        word-break: break-all;
        padding-top: var(--space-3xs, 0.25rem);
      }

      .copy-chip {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-3xs, 0.25rem);
        cursor: pointer;
        font: var(--text-style-body);
        color: var(--color-text-brand, currentColor);
        background: var(--color-bg-surface-nested, transparent);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-md, 1rem);
        width: 100%;
        box-sizing: border-box;
        word-break: break-word;
        transition:
          background-color 120ms ease,
          border-color 120ms ease;
      }

      .copy-chip:hover {
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.1));
        border-color: var(--color-border-brand, currentColor);
      }

      .copy-chip--copied {
        background: var(--color-bg-positive-subtle, rgba(0, 122, 61, 0.15));
        border-color: var(--color-border-positive, #2e7d32);
        color: var(--color-text-positive, #2e7d32);
      }

      .copy-chip__icon {
        flex-shrink: 0;
      }
    `,
  ],
})
export class TokenSection {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) group!: string;
  @Input({ required: true }) variant!: TokenVariant;
  @Input() anchorId = '';

  private theme = inject(TokenThemeService);

  copiedVar = signal<string | null>(null);
  private copiedTimeout?: ReturnType<typeof setTimeout>;

  get isCompact(): boolean {
    return COMPACT_VARIANTS.includes(this.variant);
  }

  get isText(): boolean {
    return TEXT_VARIANTS.includes(this.variant);
  }

  get isMotion(): boolean {
    return MOTION_VARIANTS.includes(this.variant);
  }

  motionTransition(cssVar: string): string {
    switch (this.variant) {
      case 'motion-duration':
        return `margin-left var(${cssVar}) ease`;
      case 'motion-delay':
        return `margin-left 300ms var(${cssVar}) ease`;
      case 'motion-function':
        return `margin-left 400ms var(${cssVar})`;
      case 'motion-transition':
        return `margin-left var(${cssVar})`;
      default:
        return '';
    }
  }

  rows = computed<TokenRow[]>(() => {
    const suffixes = TOKEN_GROUPS[this.group] ?? [];
    return suffixes.map((suffix) => {
      const cssVar = `--${this.group}-${suffix}`;
      const description = TOKEN_DESCRIPTIONS[cssVar.slice(2)] ?? titleFromSuffix(suffix);
      return { suffix, cssVar, description };
    });
  });

  varRef(cssVar: string): string {
    return `var(${cssVar})`;
  }

  resolvedValue(cssVar: string): string {
    this.theme.version();
    return getComputedStyle(document.body).getPropertyValue(cssVar).trim() || '—';
  }

  copy(cssVar: string): void {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(this.varRef(cssVar));
    this.copiedVar.set(cssVar);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = setTimeout(() => this.copiedVar.set(null), 1200);
  }
}
