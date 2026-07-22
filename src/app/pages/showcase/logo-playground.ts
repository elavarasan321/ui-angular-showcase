import { Component, computed, signal } from '@angular/core';
import type { LogoSize } from '@checkworkrights/ui-angular';
import { LogoComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares SIZES (for Logo/Logomark/Wordmark) in its types but
// doesn't actually export it from the compiled bundle, so the option list is hardcoded here to
// match LogoSize. Runtime defaults (checked against the compiled bundle): size = 'lg',
// showWordmark = true, showLogomark = true.
const SIZES: readonly LogoSize[] = ['xs', 'sm', 'md', 'lg'];

@Component({
  selector: 'app-logo-playground',
  standalone: true,
  imports: [LogoComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-logo
        playground-preview
        [size]="size()"
        [showWordmark]="showWordmark()"
        [showLogomark]="showLogomark()"
      ></cwr-logo>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Size</span>
          <select [value]="size()" (change)="size.set($any($event.target).value)">
            @for (s of sizes; track s) {
              <option [value]="s">{{ s }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showWordmark()"
            (change)="showWordmark.set($any($event.target).checked)"
          />
          Show wordmark
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showLogomark()"
            (change)="showLogomark.set($any($event.target).checked)"
          />
          Show logomark
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select,
      .playground__field input[type='text'] {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }

      .playground__checkbox {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        font: var(--text-style-body);
        color: var(--color-text-surface);
      }
    `,
  ],
})
export class LogoPlayground {
  sizes = SIZES;

  size = signal<LogoSize>('lg');
  showWordmark = signal(true);
  showLogomark = signal(true);

  generatedCode = computed(() => {
    const attrs = [`size="${this.size()}"`];
    if (!this.showWordmark()) attrs.push(`[showWordmark]="false"`);
    if (!this.showLogomark()) attrs.push(`[showLogomark]="false"`);
    return `<cwr-logo ${attrs.join(' ')}></cwr-logo>`;
  });
}
