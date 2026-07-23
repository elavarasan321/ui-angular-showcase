import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailInputComponent, FormFieldComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { EmailInputPlayground } from './email-input-playground';

@Component({
  selector: 'app-email-input-showcase',
  standalone: true,
  imports: [
    FormsModule,
    EmailInputComponent,
    FormFieldComponent,
    ExampleBlock,
    ShowcaseHeader,
    EmailInputPlayground,
  ],
  template: `
    <app-showcase-header title="Email Input" selector="cwr-email-input"></app-showcase-header>

    <app-email-input-playground></app-email-input-playground>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-email-input [(ngModel)]="email" placeholder="name@example.com"></cwr-email-input>
      <span>Value: {{ email }}</span>
    </app-example-block>

    <app-example-block title="Inside a form field" [code]="formFieldCode">
      <cwr-form-field label="Email" [mandatory]="true" labelFor="email" hintText="We'll never share your email">
        <cwr-email-input id="email" placeholder="name@example.com"></cwr-email-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Leading icon" [code]="leadingIconCode">
      <cwr-email-input placeholder="name@example.com"></cwr-email-input>
      <cwr-email-input [leadingIcon]="true" placeholder="name@example.com"></cwr-email-input>
    </app-example-block>

    <p>
      <code>cwr-email-input</code> validates the entered value's email format internally and
      emits <code>(validationError)</code> as that validity changes; typing something that isn't a
      well-formed email address will flip the input into its error appearance even without setting
      <code>state="error"</code> yourself.
    </p>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-email-input state="error" placeholder="name@example.com"></cwr-email-input>
      <cwr-email-input [disabled]="true" placeholder="name@example.com"></cwr-email-input>
      <cwr-email-input [readOnly]="true" value="name@example.com"></cwr-email-input>
    </app-example-block>
  `,
})
export class EmailInputShowcase {
  email = '';

  ngModelCode = `<cwr-email-input [(ngModel)]="email" placeholder="name@example.com"></cwr-email-input>`;

  formFieldCode = `<cwr-form-field label="Email" [mandatory]="true" labelFor="email" hintText="We'll never share your email">
  <cwr-email-input id="email" placeholder="name@example.com"></cwr-email-input>
</cwr-form-field>`;

  leadingIconCode = `<cwr-email-input placeholder="name@example.com"></cwr-email-input>
<cwr-email-input [leadingIcon]="true" placeholder="name@example.com"></cwr-email-input>`;

  statesCode = `<cwr-email-input state="error" placeholder="name@example.com"></cwr-email-input>
<cwr-email-input [disabled]="true" placeholder="name@example.com"></cwr-email-input>
<cwr-email-input [readOnly]="true" value="name@example.com"></cwr-email-input>`;
}
