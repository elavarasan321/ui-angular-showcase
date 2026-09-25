import { Component, computed, signal } from '@angular/core';
import {
  ToggleCardComponent,
  ToggleCardState,
  ToggleCardLabelPosition,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const TOGGLE_CARD_STATES: readonly ToggleCardState[] = ['idle', 'error', 'loading'];
const TOGGLE_CARD_LABEL_POSITIONS: readonly ToggleCardLabelPosition[] = ['start', 'end'];

@Component({
  selector: 'app-toggle-card-playground',
  standalone: true,
  imports: [ToggleCardComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-toggle-card
        playground-preview
        style="width: 100%;"
        [label]="label()"
        [checked]="checked()"
        [hintText]="hintText() || undefined"
        [errorText]="state() === 'error' ? errorText() : undefined"
        [state]="state()"
        [disabled]="disabled()"
        [position]="position()"
        (checkedChange)="checked.set($event)"
      ></cwr-toggle-card>

      <ng-container playground-controls>
        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Hint text">
          <cwr-text-input
            [value]="hintText()"
            (valueChange)="hintText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="State">
          <cwr-picker-input
            [options]="states | pickerOptions"
            [value]="state()"
            (valueChange)="state.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Label position">
          <cwr-picker-input
            [options]="positions | pickerOptions"
            [value]="position()"
            (valueChange)="position.set($any($event))"
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
      </ng-container>
    </app-playground>
  `
})
export class ToggleCardPlayground {
  states = TOGGLE_CARD_STATES;
  positions = TOGGLE_CARD_LABEL_POSITIONS;

  label = signal('Email notifications');
  checked = signal(true);
  hintText = signal('Get an email whenever a document is verified');
  errorText = signal('Choose an option to continue');
  state = signal<ToggleCardState>('idle');
  disabled = signal(false);
  position = signal<ToggleCardLabelPosition>('end');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`, `state="${this.state()}"`, `position="${this.position()}"`];
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.state() === 'error' && this.errorText()) attrs.push(`errorText="${this.errorText()}"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-toggle-card ${attrs.join(' ')}></cwr-toggle-card>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
