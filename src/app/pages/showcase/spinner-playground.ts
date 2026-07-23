import { Component, computed, signal } from '@angular/core';
import type { spinnerSize } from '@checkworkrights/ui-angular';
import { SpinnerComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares SPINNER_SIZES in its types but doesn't actually
// export it from the compiled bundle, so the option list is hardcoded here to match spinnerSize.
const SIZES: readonly spinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

@Component({
  selector: 'app-spinner-playground',
  standalone: true,
  imports: [SpinnerComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-spinner playground-preview [size]="size()" style="position: relative;"></cwr-spinner>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Size</span>
          <select (change)="size.set($any($event.target).value)">
            @for (s of sizes; track s) {
              <option [value]="s" [selected]="s === size()">{{ s }}</option>
            }
          </select>
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
export class SpinnerPlayground {
  sizes = SIZES;

  size = signal<spinnerSize>('md');

  generatedCode = computed(() => {
    return `<cwr-spinner size="${this.size()}" style="position: relative;"></cwr-spinner>`;
  });
}
