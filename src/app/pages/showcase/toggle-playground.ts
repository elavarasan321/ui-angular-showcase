import { Component, computed, signal } from '@angular/core';
import {
  ToggleComponent,
  ToggleState,
  LabelPosition,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 exports ToggleState/LabelPosition as types only — the
// TOGGLE_STATES/LABEL_POSITIONS runtime consts declared in its .d.ts aren't actually present in
// the published bundle, so the option lists are hardcoded here to match the unions.
const TOGGLE_STATES: readonly ToggleState[] = ['idle', 'error', 'loading'];
const LABEL_POSITIONS: readonly LabelPosition[] = ['start', 'end'];

@Component({
  selector: 'app-toggle-playground',
  standalone: true,
  imports: [ToggleComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-toggle
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [state]="state()"
        [position]="position()"
        [disabled]="disabled()"
        [hintText]="hintText() || undefined"
        [errorText]="state() === 'error' ? errorText() : undefined"
      ></cwr-toggle>

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

        <cwr-form-field label="Position">
          <cwr-picker-input
            [options]="positions | pickerOptions"
            [value]="position()"
            (valueChange)="position.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Hint text">
          <cwr-text-input
            [value]="hintText()"
            (valueChange)="hintText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        @if (state() === 'error') {
          <cwr-form-field label="Error text">
            <cwr-text-input
              [value]="errorText()"
              (valueChange)="errorText.set($event)"
            ></cwr-text-input>
          </cwr-form-field>
        }

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
      </ng-container>
    </app-playground>
  `
})
export class TogglePlayground {
  states = TOGGLE_STATES;
  positions = LABEL_POSITIONS;

  label = signal('Enable notifications');
  checked = signal(false);
  state = signal<ToggleState>('idle');
  position = signal<LabelPosition>('end');
  disabled = signal(false);
  hintText = signal('You can change this later in settings');
  errorText = signal('Something went wrong. Please try again.');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.position() !== 'end') attrs.push(`position="${this.position()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.state() === 'error' && this.errorText()) {
      attrs.push(`errorText="${this.errorText()}"`);
    }
    return `<cwr-toggle ${attrs.join(' ')}></cwr-toggle>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
