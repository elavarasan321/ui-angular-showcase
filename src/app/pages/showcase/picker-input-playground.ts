import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  PickerInputComponent,
  PickerInputOption,
  ButtonComponent,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PickerInputComponent, ButtonComponent, Playground, FormFieldComponent, TextInputComponent, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-picker-input
        playground-preview
        style="width: 100%; max-width: 20rem;"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholderText]="placeholderText()"
        [allowEmptyValue]="allowEmptyValue()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
      ></cwr-picker-input>

      <ng-container playground-controls>
        <cwr-form-field label="Placeholder">
          <cwr-text-input
            [value]="placeholderText()"
            (valueChange)="placeholderText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Allow empty value"
          [checked]="allowEmptyValue()"
          (checkedChange)="allowEmptyValue.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Read only"
          [checked]="readOnly()"
          (checkedChange)="readOnly.set($event)"
        ></cwr-checkbox>

        <!-- The picker has no built-in way to clear a selection, so this lets you see the
             placeholder that allowEmptyValue reveals when the value is empty. -->
        <cwr-button
          variant="outline"
          intent="neutral"
          size="sm"
          label="Clear value"
          [disabled]="!value()"
          (buttonClick)="value.set(null)"
        ></cwr-button>
      </ng-container>
    </app-playground>
  `
})
export class PickerInputPlayground {
  options = FREQUENCY_OPTIONS;

  value = signal<string | null>('monthly');
  placeholderText = signal('Select frequency');
  allowEmptyValue = signal(false);
  disabled = signal(false);
  readOnly = signal(false);

  generatedCode = computed(() => {
    const attrs = [`placeholderText="${this.placeholderText()}"`];
    if (this.allowEmptyValue()) attrs.push(`[allowEmptyValue]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);

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
