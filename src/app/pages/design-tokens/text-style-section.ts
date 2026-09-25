import { Component, computed, inject, input } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';
import { filterRows, resolveRows } from './token-data';
import { TokenClipboardService } from './token-clipboard.service';
import { SECTION_STYLES } from './token-styles';
import { TokenThemeService } from './token-theme.service';

@Component({
  selector: 'app-text-style-section',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section class="token-section" [id]="anchorId()">
      <header class="section-header">
        <h3>{{ title() }}</h3>
        <span class="section-count">{{ rows().length }}</span>
      </header>

      <div class="panel">
        @for (row of resolved(); track row.cssVar) {
          <div class="specimen">
            <div class="specimen__sample" [style.font]="'var(' + row.cssVar + ')'">
              The quick brown fox jumps over the lazy dog
            </div>
            <div class="specimen__meta">
              <span class="specimen__name mono">{{ row.cssVar }}</span>
              <span class="specimen__value mono">{{ row.value }}</span>
              <span class="specimen__desc">{{ row.description }}</span>
            </div>
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
    </section>
  `,
  styles: [
    SECTION_STYLES,
    `
      .specimen {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: var(--space-2xs, 0.375rem) var(--space-md, 1rem);
        padding: var(--space-md, 1rem);
        border-bottom: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        transition: background-color 120ms ease;
      }

      .specimen:last-child {
        border-bottom: 0;
      }

      .specimen:hover {
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.06));
      }

      .specimen__sample {
        grid-column: 1;
        color: var(--color-text-surface, currentColor);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .specimen__meta {
        grid-column: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-3xs, 0.25rem) var(--space-sm, 0.75rem);
        min-width: 0;
      }

      .specimen__name {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--color-text-brand, currentColor);
      }

      .specimen__value {
        font-size: 0.75rem;
        color: var(--color-text-surface-subtle, currentColor);
        overflow-wrap: anywhere;
      }

      .specimen__desc {
        flex-basis: 100%;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
      }

      .copy-btn {
        grid-column: 2;
        grid-row: 1 / span 2;
        align-self: center;
      }
    `,
  ],
})
export class TextStyleSection {
  readonly title = input('Text Styles');
  readonly anchorId = input('text-style');
  readonly filter = input('');

  private theme = inject(TokenThemeService);
  protected clipboard = inject(TokenClipboardService);

  readonly rows = computed(() => filterRows('text-style', this.filter()));

  readonly resolved = computed(() => {
    this.theme.version();
    return resolveRows(this.rows());
  });
}
