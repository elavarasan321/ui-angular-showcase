import { Component, computed, signal } from '@angular/core';
import { PickerInputComponent, PickerInputOption } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const FREQUENCY_OPTIONS: PickerInputOption[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnightly', value: 'fortnightly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annually', value: 'annually' },
];

@Component({
  selector: 'app-picker-input-playground',
  standalone: true,
  imports: [PickerInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-picker-input
        playground-preview
        style="width: 100%; max-width: 20rem;"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholderText]="placeholderText()"
        [disabled]="disabled()"
      ></cwr-picker-input>

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
export class PickerInputPlayground {
  options = FREQUENCY_OPTIONS;

  value = signal<string | null>('monthly');
  placeholderText = signal('Select frequency');
  disabled = signal(false);

  generatedCode = computed(() => {
    const attrs = [`placeholderText="${this.placeholderText()}"`];
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-picker-input
  [options]="frequencyOptions"
  [value]="frequency()"
  (valueChange)="frequency.set($event)"
  ${attrs.join('\n  ')}
></cwr-picker-input>`;
  });
}
