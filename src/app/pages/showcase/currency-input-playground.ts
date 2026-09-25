import { Component, computed, signal } from '@angular/core';
import {
  CurrencyInputComponent,
  CurrencyInputState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// CurrencyInputState (InputState) is exported as a plain string literal union, not a readonly
// array const, so the option list is hardcoded here to match the union.
const STATES: readonly CurrencyInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-currency-input-playground',
  standalone: true,
  imports: [CurrencyInputComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-currency-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [currencySymbol]="currencySymbol()"
        [placeholder]="placeholder()"
        [allowDecimals]="allowDecimals()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-currency-input>

      <ng-container playground-controls>
        <cwr-form-field label="Currency symbol">
          <cwr-text-input
            [value]="currencySymbol()"
            (valueChange)="currencySymbol.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

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
          label="Allow decimals"
          [checked]="allowDecimals()"
          (checkedChange)="allowDecimals.set($event)"
        ></cwr-checkbox>

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
export class CurrencyInputPlayground {
  states = STATES;

  value = signal<number | null>(null);
  currencySymbol = signal('$');
  placeholder = signal('0.00');
  allowDecimals = signal(true);
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<CurrencyInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [
      `currencySymbol="${this.currencySymbol()}"`,
      `placeholder="${this.placeholder()}"`,
    ];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (!this.allowDecimals()) attrs.push(`[allowDecimals]="false"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-currency-input ${attrs.join(' ')}></cwr-currency-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
