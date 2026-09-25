import { Component, computed, signal } from '@angular/core';
import {
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

const INPUT_ID = 'playground-demo-input';

@Component({
  selector: 'app-form-field-playground',
  standalone: true,
  imports: [FormFieldComponent, TextInputComponent, Playground, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-form-field
        playground-preview
        [label]="label()"
        [labelFor]="inputId"
        [mandatory]="mandatory()"
        [hasError]="hasError()"
        [hintText]="hintText() || undefined"
        [errorText]="hasError() ? errorText() : undefined"
      >
        <cwr-text-input [id]="inputId" placeholder="Enter value"></cwr-text-input>
      </cwr-form-field>

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

        @if (hasError()) {
          <cwr-form-field label="Error text">
            <cwr-text-input
              [value]="errorText()"
              (valueChange)="errorText.set($event)"
            ></cwr-text-input>
          </cwr-form-field>
        }

        <cwr-checkbox
          label="Mandatory"
          [checked]="mandatory()"
          (checkedChange)="mandatory.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Has error"
          [checked]="hasError()"
          (checkedChange)="hasError.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class FormFieldPlayground {
  inputId = INPUT_ID;

  label = signal('Employee name');
  mandatory = signal(false);
  hasError = signal(false);
  hintText = signal('Enter your full legal name');
  errorText = signal('This field is required');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`, `labelFor="${this.inputId}"`];
    if (this.mandatory()) attrs.push(`[mandatory]="true"`);
    if (this.hasError()) attrs.push(`[hasError]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.hasError() && this.errorText()) attrs.push(`errorText="${this.errorText()}"`);

    return `<cwr-form-field ${attrs.join(' ')}>
  <cwr-text-input id="${this.inputId}" placeholder="Enter value"></cwr-text-input>
</cwr-form-field>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
