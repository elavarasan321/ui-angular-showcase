import { Component, computed, signal } from '@angular/core';
import {
  FormComponent,
  FormFieldComponent,
  TextInputComponent,
  ButtonComponent,
  FORM_GAPS,
  FormGap,
  PickerInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

@Component({
  selector: 'app-form-playground',
  standalone: true,
  imports: [FormComponent, FormFieldComponent, TextInputComponent, ButtonComponent, Playground, PickerInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-form
        playground-preview
        style="width: 100%; max-width: 24rem;"
        [submitting]="submitting()"
        [gap]="gap()"
        [hasError]="hasError()"
        [errorTitle]="hasError() ? errorTitle() : undefined"
        [errorHint]="hasError() ? errorHint() : undefined"
      >
        <cwr-form-field label="Email" labelFor="form-playground-email">
          <cwr-text-input id="form-playground-email" placeholder="name@example.com"></cwr-text-input>
        </cwr-form-field>
        <cwr-button
          variant="solid"
          intent="brand"
          label="Submit"
          [loading]="submitting()"
          [disabled]="submitting()"
        ></cwr-button>
      </cwr-form>

      <ng-container playground-controls>
        <cwr-form-field label="Gap">
          <cwr-picker-input
            [options]="gaps | pickerOptions"
            [value]="gap()"
            (valueChange)="gap.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Submitting"
          [checked]="submitting()"
          (checkedChange)="submitting.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Has error"
          [checked]="hasError()"
          (checkedChange)="hasError.set($event)"
        ></cwr-checkbox>

        @if (hasError()) {
          <cwr-form-field label="Error title">
            <cwr-text-input
              [value]="errorTitle()"
              (valueChange)="errorTitle.set($event)"
            ></cwr-text-input>
          </cwr-form-field>

          <cwr-form-field label="Error hint">
            <cwr-text-input
              [value]="errorHint()"
              (valueChange)="errorHint.set($event)"
            ></cwr-text-input>
          </cwr-form-field>
        }
      </ng-container>
    </app-playground>
  `
})
export class FormPlayground {
  gaps = FORM_GAPS;

  submitting = signal(false);
  gap = signal<FormGap>('lg');
  hasError = signal(false);
  errorTitle = signal("We couldn't submit your form");
  errorHint = signal('Please check the highlighted fields and try again.');

  generatedCode = computed(() => {
    const attrs = [`gap="${this.gap()}"`];
    if (this.submitting()) attrs.push(`[submitting]="true"`);
    if (this.hasError()) {
      attrs.push(`[hasError]="true"`);
      if (this.errorTitle()) attrs.push(`errorTitle="${this.errorTitle()}"`);
      if (this.errorHint()) attrs.push(`errorHint="${this.errorHint()}"`);
    }

    const buttonAttrs = this.submitting() ? ' [loading]="true" [disabled]="true"' : '';

    return `<cwr-form ${attrs.join(' ')}>
  <cwr-form-field label="Email" labelFor="email">
    <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
  </cwr-form-field>
  <cwr-button variant="solid" intent="brand" label="Submit"${buttonAttrs}></cwr-button>
</cwr-form>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
