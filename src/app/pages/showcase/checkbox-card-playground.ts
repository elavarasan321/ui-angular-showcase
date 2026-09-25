import { Component, computed, signal } from '@angular/core';
import {
  CheckboxCardComponent,
  CheckboxCardState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 doesn't export a CHECKBOX_CARD_STATES-style runtime const,
// so the option list is hardcoded here to match CheckboxCardState.
const STATES: readonly CheckboxCardState[] = ['idle', 'error'];

@Component({
  selector: 'app-checkbox-card-playground',
  standalone: true,
  imports: [CheckboxCardComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-checkbox-card
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        [state]="state()"
      ></cwr-checkbox-card>

      <ng-container playground-controls>
        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
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
          label="Checked"
          [checked]="checked()"
          (checkedChange)="checked.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Indeterminate"
          [checked]="indeterminate()"
          (checkedChange)="indeterminate.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class CheckboxCardPlayground {
  states = STATES;

  label = signal('Accept terms and conditions');
  checked = signal(false);
  indeterminate = signal(false);
  disabled = signal(false);
  state = signal<CheckboxCardState>('idle');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.indeterminate()) attrs.push(`[indeterminate]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-checkbox-card ${attrs.join(' ')}></cwr-checkbox-card>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
