import { Component, computed, signal } from '@angular/core';
import {
  CheckboxComponent,
  CheckboxState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 doesn't export a CHECKBOX_STATES-style runtime const, so
// the option list is hardcoded here to match CheckboxState.
const STATES: readonly CheckboxState[] = ['idle', 'error'];

@Component({
  selector: 'app-checkbox-playground',
  standalone: true,
  imports: [CheckboxComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-checkbox
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        [state]="state()"
      ></cwr-checkbox>

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
export class CheckboxPlayground {
  states = STATES;

  label = signal('Accept terms and conditions');
  checked = signal(false);
  indeterminate = signal(false);
  disabled = signal(false);
  state = signal<CheckboxState>('idle');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.indeterminate()) attrs.push(`[indeterminate]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-checkbox ${attrs.join(' ')}></cwr-checkbox>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
