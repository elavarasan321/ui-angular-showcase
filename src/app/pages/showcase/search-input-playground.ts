import { Component, computed, signal } from '@angular/core';
import { SearchInputComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

@Component({
  selector: 'app-search-input-playground',
  standalone: true,
  imports: [SearchInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-search-input
        playground-preview
        style="width: 100%; max-width: 20rem;"
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [debounceMs]="debounceMs()"
      ></cwr-search-input>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Placeholder</span>
          <input
            type="text"
            [value]="placeholder()"
            (input)="placeholder.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Debounce (ms)</span>
          <input
            type="text"
            [value]="debounceMs()"
            (input)="debounceMs.set($any($event.target).value || 0)"
          />
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="disabled()"
            (change)="disabled.set($any($event.target).checked)"
          />
          Disabled
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
export class SearchInputPlayground {
  value = signal('');
  placeholder = signal('Search…');
  disabled = signal(false);
  debounceMs = signal(0);

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.debounceMs()) attrs.push(`[debounceMs]="${this.debounceMs()}"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-search-input
  [value]="searchTerm()"
  (valueChange)="searchTerm.set($event)"
  ${attrs.join('\n  ')}
></cwr-search-input>`;
  });
}
