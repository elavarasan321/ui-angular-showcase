import { Component, computed, signal } from '@angular/core';
import { SelectInputComponent, SelectInputOption } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const ALL_OPTIONS: SelectInputOption[] = [
  { label: 'Afghanistan', value: 'AF' },
  { label: 'Australia', value: 'AU' },
  { label: 'Austria', value: 'AT' },
  { label: 'Bangladesh', value: 'BD' },
  { label: 'Canada', value: 'CA' },
  { label: 'India', value: 'IN' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'United States', value: 'US' },
];

@Component({
  selector: 'app-select-input-playground',
  standalone: true,
  imports: [SelectInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-select-input
        playground-preview
        style="width: 100%; max-width: 20rem;"
        [options]="filteredOptions()"
        [value]="value()"
        (valueChange)="value.set($event)"
        (searchChange)="searchTerm.set($event)"
        [placeholderText]="placeholderText()"
        [loading]="loading()"
        [disabled]="disabled()"
      ></cwr-select-input>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Placeholder</span>
          <input
            type="text"
            [value]="placeholderText()"
            (input)="placeholderText.set($any($event.target).value)"
          />
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="loading()"
            (change)="loading.set($any($event.target).checked)"
          />
          Loading
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
export class SelectInputPlayground {
  value = signal<string | null>('AU');
  placeholderText = signal('Search & select');
  loading = signal(false);
  disabled = signal(false);
  searchTerm = signal('');

  filteredOptions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return ALL_OPTIONS;
    return ALL_OPTIONS.filter((o) => o.label.toLowerCase().includes(term));
  });

  generatedCode = computed(() => {
    const attrs = [`placeholderText="${this.placeholderText()}"`];
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-select-input
  [options]="countryOptions()"
  [value]="country()"
  (valueChange)="country.set($event)"
  (searchChange)="onSearch($event)"
  ${attrs.join('\n  ')}
></cwr-select-input>`;
  });
}
