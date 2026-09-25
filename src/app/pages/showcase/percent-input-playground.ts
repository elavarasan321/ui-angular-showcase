import { Component, computed, signal } from '@angular/core';
import {
  PercentInputComponent,
  PercentInputState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
  NumericInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// PercentInputState (InputState) is exported as a plain string literal union, not a readonly
// array const, so the option list is hardcoded here to match the union.
const STATES: readonly PercentInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-percent-input-playground',
  standalone: true,
  imports: [PercentInputComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe, NumericInputComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-percent-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [limitDecimals]="limitDecimals()"
        [decimals]="decimals()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-percent-input>

      <ng-container playground-controls>
        <cwr-form-field label="Placeholder">
          <cwr-text-input
            [value]="placeholder()"
            (valueChange)="placeholder.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="State">
          <cwr-picker-input
            [options]="states | pickerOptions"
            [value]="state()"
            (valueChange)="state.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Limit decimals"
          [checked]="limitDecimals()"
          (checkedChange)="limitDecimals.set($event)"
        ></cwr-checkbox>

        @if (limitDecimals()) {
          <cwr-form-field label="Decimals">
            <cwr-numeric-input
              [value]="decimals()"
              (valueChange)="decimals.set($event ?? 0)"
            ></cwr-numeric-input>
          </cwr-form-field>
        }

        <cwr-checkbox
          label="Required"
          [checked]="required()"
          (checkedChange)="required.set($event)"
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
      </ng-container>
    </app-playground>
  `
})
export class PercentInputPlayground {
  states = STATES;

  value = signal<number | null>(null);
  placeholder = signal('0.00');
  limitDecimals = signal(false);
  decimals = signal(2);
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<PercentInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.limitDecimals()) {
      attrs.push(`[limitDecimals]="true"`);
      attrs.push(`[decimals]="${this.decimals()}"`);
    }
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-percent-input ${attrs.join(' ')}></cwr-percent-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
