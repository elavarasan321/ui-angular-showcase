import { Component, computed, signal } from '@angular/core';
import {
  DateInputComponent,
  DateInputState,
  FormFieldComponent,
  PickerInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// DateInputState (InputState) is exported as a plain string literal union, not a readonly array
// const, so the option list is hardcoded here to match the union.
const STATES: readonly DateInputState[] = ['idle', 'error'];
const SEPARATORS: readonly string[] = ['/', '-', '.'];

@Component({
  selector: 'app-date-input-playground',
  standalone: true,
  imports: [DateInputComponent, Playground, FormFieldComponent, PickerInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-date-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [separator]="separator()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-date-input>

      <ng-container playground-controls>
        <cwr-form-field label="Separator">
          <cwr-picker-input
            [options]="separators | pickerOptions"
            [value]="separator()"
            (valueChange)="separator.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="State">
          <cwr-picker-input
            [options]="states | pickerOptions"
            [value]="state()"
            (valueChange)="state.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

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
export class DateInputPlayground {
  states = STATES;
  separators = SEPARATORS;

  value = signal<string | null>(null);
  separator = signal('/');
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<DateInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`separator="${this.separator()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-date-input ${attrs.join(' ')}></cwr-date-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
