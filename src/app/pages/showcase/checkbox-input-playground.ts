import { Component, computed, signal } from '@angular/core';
import {
  CheckboxInputComponent,
  CheckboxInputState,
  FormFieldComponent,
  PickerInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares CheckboxInputState as a plain string literal union,
// not a readonly array const, so the option list is hardcoded here to match the union.
const STATES: readonly CheckboxInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-checkbox-input-playground',
  standalone: true,
  imports: [CheckboxInputComponent, Playground, FormFieldComponent, PickerInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-checkbox-input
        playground-preview
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        [state]="state()"
        aria-label="Select row"
      ></cwr-checkbox-input>

      <ng-container playground-controls>
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
export class CheckboxInputPlayground {
  states = STATES;

  checked = signal(false);
  indeterminate = signal(false);
  disabled = signal(false);
  state = signal<CheckboxInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`aria-label="Select row"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.indeterminate()) attrs.push(`[indeterminate]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-checkbox-input ${attrs.join(' ')} (checkedChange)="checked = $event"></cwr-checkbox-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
