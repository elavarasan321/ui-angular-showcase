import { Component, computed, signal } from '@angular/core';
import {
  TextareaInputComponent,
  TextareaInputState,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
  NumericInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// TextareaInputState (InputState) is exported as a plain string literal union, not a readonly
// array const, so the option list is hardcoded here to match the union.
const STATES: readonly TextareaInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-textarea-input-playground',
  standalone: true,
  imports: [TextareaInputComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe, NumericInputComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-textarea-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [canResize]="canResize()"
        [maxlength]="maxlength()"
        [state]="state()"
      ></cwr-textarea-input>

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

        <cwr-form-field label="Max length">
          <cwr-numeric-input
            [value]="maxlength()"
            (valueChange)="maxlength.set($event)"
          ></cwr-numeric-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Can resize"
          [checked]="canResize()"
          (checkedChange)="canResize.set($event)"
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
export class TextareaInputPlayground {
  states = STATES;

  value = signal<string | null>('');
  placeholder = signal('Type here…');
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  canResize = signal(false);
  maxlength = signal<number | null>(null);
  state = signal<TextareaInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.canResize()) attrs.push(`[canResize]="true"`);
    if (this.maxlength() !== null) attrs.push(`[maxlength]="${this.maxlength()}"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-textarea-input ${attrs.join(' ')}></cwr-textarea-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
