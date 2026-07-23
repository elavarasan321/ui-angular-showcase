import { Component } from '@angular/core';
import {
  FormComponent,
  FormFieldComponent,
  TextInputComponent,
  ButtonComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { FormPlayground } from './form-playground';

@Component({
  selector: 'app-form-showcase',
  standalone: true,
  imports: [
    FormComponent,
    FormFieldComponent,
    TextInputComponent,
    ButtonComponent,
    ExampleBlock,
    ShowcaseHeader,
    FormPlayground,
  ],
  template: `
    <app-showcase-header title="Form" selector="cwr-form"></app-showcase-header>

    <app-form-playground></app-form-playground>
    <p>
      <code>cwr-form</code> wraps a form body, providing consistent field spacing, a submitting
      state, and a form-level error banner. When placed on a host with a <code>formGroup</code>
      directive it also hooks into that <code>FormGroupDirective</code> automatically.
    </p>

    <app-example-block title="Basic form" [code]="basicCode">
      <cwr-form style="width: 100%; max-width: 24rem;">
        <cwr-form-field label="Full name" [mandatory]="true" labelFor="basic-form-name">
          <cwr-text-input id="basic-form-name" placeholder="Enter your full name"></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Email" [mandatory]="true" labelFor="basic-form-email">
          <cwr-text-input id="basic-form-email" placeholder="name@example.com"></cwr-text-input>
        </cwr-form-field>
        <cwr-button variant="solid" intent="brand" label="Submit"></cwr-button>
      </cwr-form>
    </app-example-block>

    <app-example-block title="Submitting state" [code]="submittingCode">
      <cwr-form [submitting]="true" style="width: 100%; max-width: 24rem;">
        <cwr-form-field label="Full name" [mandatory]="true" labelFor="submitting-form-name">
          <cwr-text-input
            id="submitting-form-name"
            [disabled]="true"
            placeholder="Enter your full name"
          ></cwr-text-input>
        </cwr-form-field>
        <cwr-button
          variant="solid"
          intent="brand"
          label="Submit"
          [loading]="true"
          [disabled]="true"
        ></cwr-button>
      </cwr-form>
    </app-example-block>

    <app-example-block title="Form-level error" [code]="errorCode">
      <cwr-form
        [hasError]="true"
        errorTitle="We couldn't submit your form"
        errorHint="Please check the highlighted fields and try again."
        style="width: 100%; max-width: 24rem;"
      >
        <cwr-form-field
          label="Email"
          [mandatory]="true"
          labelFor="error-form-email"
          [hasError]="true"
          errorText="Enter a valid email address"
        >
          <cwr-text-input id="error-form-email" placeholder="name@example.com"></cwr-text-input>
        </cwr-form-field>
        <cwr-button variant="solid" intent="brand" label="Submit"></cwr-button>
      </cwr-form>
    </app-example-block>
  `,
})
export class FormShowcase {
  basicCode = `<cwr-form>
  <cwr-form-field label="Full name" [mandatory]="true" labelFor="name">
    <cwr-text-input id="name" placeholder="Enter your full name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Email" [mandatory]="true" labelFor="email">
    <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
  </cwr-form-field>
  <cwr-button variant="solid" intent="brand" label="Submit"></cwr-button>
</cwr-form>`;

  submittingCode = `<cwr-form [submitting]="true">
  <cwr-form-field label="Full name" [mandatory]="true" labelFor="name">
    <cwr-text-input id="name" [disabled]="true" placeholder="Enter your full name"></cwr-text-input>
  </cwr-form-field>
  <cwr-button variant="solid" intent="brand" label="Submit" [loading]="true" [disabled]="true"></cwr-button>
</cwr-form>`;

  errorCode = `<cwr-form
  [hasError]="true"
  errorTitle="We couldn't submit your form"
  errorHint="Please check the highlighted fields and try again."
>
  <cwr-form-field label="Email" [mandatory]="true" labelFor="email"
    [hasError]="true" errorText="Enter a valid email address">
    <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
  </cwr-form-field>
  <cwr-button variant="solid" intent="brand" label="Submit"></cwr-button>
</cwr-form>`;
}
