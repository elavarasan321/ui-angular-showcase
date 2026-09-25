import { Component, computed, signal } from '@angular/core';
import {
  EmailInputComponent,
  EmailInputState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// EmailInputState (InputState) is exported as a plain string literal union, not a readonly array
// const, so the option list is hardcoded here to match the union.
const STATES: readonly EmailInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-email-input-playground',
  standalone: true,
  imports: [EmailInputComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-email-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [leadingIcon]="leadingIcon()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-email-input>

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
          label="Leading icon"
          [checked]="leadingIcon()"
          (checkedChange)="leadingIcon.set($event)"
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
export class EmailInputPlayground {
  states = STATES;

  value = signal('');
  placeholder = signal('name@example.com');
  leadingIcon = signal(false);
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<EmailInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.leadingIcon()) attrs.push(`[leadingIcon]="true"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-email-input ${attrs.join(' ')}></cwr-email-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
