import { Component, computed, inject, signal } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';
import { TOKEN_DESCRIPTIONS, TOKEN_GROUPS } from './design-tokens.generated';
import { TokenThemeService } from './token-theme.service';

const PROPERTY_SUFFIX =
  /-(font-family|font-weight|font-size|line-height|text-decoration|text-case|letter-spacing)$/;

const SUB_PROPERTY_FALLBACKS = ['font-family', 'font-weight', 'font-size', 'line-height'];

interface TextStyleRow {
  stem: string;
  cssVar: string;
  description: string;
}

function titleFromStem(stem: string): string {
  return stem
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

@Component({
  selector: 'app-text-style-section',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section class="token-section" id="text-style">
      <h2>Text Styles</h2>
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
                  <div class="token-box token-box--text">
                    <span class="token-text-sample" [style.font]="varRef(row.stem)">{{
                      row.stem
                    }}</span>
                  </div>
                  <span class="token-value">{{ resolvedValue(row.cssVar) }}</span>
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
                    copiedVar() === row.cssVar ? 'Copied!' : varRef(row.stem)
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
        font: var(--text-style-body);
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
        display: flex;
        align-items: center;
      }

      .token-box--text {
        height: auto;
        min-height: 2.5rem;
        justify-content: flex-start;
        text-align: left;
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
        font-size: var(--font-size-md, 1rem);
        font-family: 'SFMono-Regular', Consolas, monospace;
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
export class TextStyleSection {
  private theme = inject(TokenThemeService);

  copiedVar = signal<string | null>(null);
  private copiedTimeout?: ReturnType<typeof setTimeout>;

  rows = computed<TextStyleRow[]>(() => {
    this.theme.version();
    const all = TOKEN_GROUPS['text-style'] ?? [];
    const stems = all.filter((s) => !PROPERTY_SUFFIX.test(s));
    return stems.map((stem) => {
      const description =
        SUB_PROPERTY_FALLBACKS.map((prop) => TOKEN_DESCRIPTIONS[`text-style-${stem}-${prop}`]).find(
          Boolean,
        ) ?? titleFromStem(stem);
      return { stem, cssVar: `--text-style-${stem}`, description };
    });
  });

  varRef(stem: string): string {
    return `var(--text-style-${stem})`;
  }

  resolvedValue(cssVar: string): string {
    this.theme.version();
    return getComputedStyle(document.body).getPropertyValue(cssVar).trim() || '—';
  }

  copy(cssVar: string): void {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(`var(${cssVar})`);
    this.copiedVar.set(cssVar);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = setTimeout(() => this.copiedVar.set(null), 1200);
  }
}
