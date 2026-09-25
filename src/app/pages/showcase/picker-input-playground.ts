import { Component, computed, signal } from '@angular/core';
import {
  PickerInputComponent,
  PickerInputOption,
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

const FREQUENCY_OPTIONS: PickerInputOption[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnightly', value: 'fortnightly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annually', value: 'annually' },
];

@Component({
  selector: 'app-picker-input-playground',
  standalone: true,
  imports: [PickerInputComponent, Playground, FormFieldComponent, TextInputComponent, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
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
        <cwr-form-field label="Placeholder">
          <cwr-text-input
            [value]="placeholderText()"
            (valueChange)="placeholderText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
