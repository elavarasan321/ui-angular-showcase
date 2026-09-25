import { Component, computed, signal } from '@angular/core';
import {
  TextInputComponent,
  TextInputState,
  FormFieldComponent,
  PickerInputComponent,
  CheckboxComponent,
  NumericInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 doesn't export a TextInputType type at all (only
// InputState, re-exported as TextInputState); its own `type` input is typed inline as this
// literal union, so it's reproduced locally here.
type TextInputType = 'text' | 'password' | 'search' | 'tel' | 'url';

// TextInputState (InputState) is exported as a plain string literal union, not a readonly array
// const, so the option lists are hardcoded here to match the unions.
const TYPES: readonly TextInputType[] = ['text', 'password', 'search', 'tel', 'url'];
const STATES: readonly TextInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-text-input-playground',
  standalone: true,
  imports: [TextInputComponent, Playground, FormFieldComponent, PickerInputComponent, CheckboxComponent, PickerOptionsPipe, NumericInputComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-text-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [type]="type()"
        [placeholder]="placeholder()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
        [maxlength]="maxlength()"
      ></cwr-text-input>

      <ng-container playground-controls>
        <cwr-form-field label="Type">
          <cwr-picker-input
            [options]="types | pickerOptions"
            [value]="type()"
            (valueChange)="type.set($any($event))"
          ></cwr-picker-input>
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

        <cwr-form-field label="Max length">
          <cwr-numeric-input
            [value]="maxlength()"
            (valueChange)="maxlength.set($event)"
          ></cwr-numeric-input>
        </cwr-form-field>

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
export class TextInputPlayground {
  types = TYPES;
  states = STATES;

  value = signal('');
  type = signal<TextInputType>('text');
  placeholder = signal('Enter your name');
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<TextInputState>('idle');
  maxlength = signal<number | null>(null);

  generatedCode = computed(() => {
    const attrs = [`type="${this.type()}"`, `placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    if (this.maxlength() !== null) attrs.push(`[maxlength]="${this.maxlength()}"`);
    return `<cwr-text-input ${attrs.join(' ')}></cwr-text-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
