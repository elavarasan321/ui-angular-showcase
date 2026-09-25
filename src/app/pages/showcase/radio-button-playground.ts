import { Component, computed, signal } from '@angular/core';
import {
  RadioButtonComponent,
  RadioButtonState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 exports RadioButtonState as a type only — the
// RADIO_BUTTON_STATES runtime const declared in its .d.ts isn't actually present in the
// published bundle, so the option list is hardcoded here to match the union.
const RADIO_BUTTON_STATES: readonly RadioButtonState[] = ['idle', 'error'];

@Component({
  selector: 'app-radio-button-playground',
  standalone: true,
  imports: [RadioButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-radio-button
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [state]="state()"
        [disabled]="disabled()"
        [showFocusRing]="showFocusRing()"
      ></cwr-radio-button>

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
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Show focus ring"
          [checked]="showFocusRing()"
          (checkedChange)="showFocusRing.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class RadioButtonPlayground {
  states = RADIO_BUTTON_STATES;

  label = signal('Option A');
  checked = signal(false);
  state = signal<RadioButtonState>('idle');
  disabled = signal(false);
  showFocusRing = signal(false);

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.showFocusRing()) attrs.push(`[showFocusRing]="true"`);
    return `<cwr-radio-button ${attrs.join(' ')}></cwr-radio-button>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
