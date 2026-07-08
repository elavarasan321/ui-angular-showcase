import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, TextInputComponent, InlineButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-form-field-showcase',
  standalone: true,
  imports: [
    FormsModule,
    FormFieldComponent,
    TextInputComponent,
    InlineButtonComponent,
    ExampleBlock,
    ShowcaseHeader,
  ],
  template: `
    <app-showcase-header title="Form Field" selector="cwr-form-field"></app-showcase-header>

    <app-example-block title="Basic field wrapping a text input" [code]="basicCode">
      <cwr-form-field label="Full name" [mandatory]="true" labelFor="full-name" hintText="As shown on your passport">
        <cwr-text-input id="full-name" [(ngModel)]="fullName" placeholder="Enter full name"></cwr-text-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-form-field
        label="Email"
        [mandatory]="true"
        labelFor="email"
        [hasError]="true"
        errorText="Enter a valid email address"
      >
        <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Label slot content" [code]="labelSlotCode">
      <cwr-form-field label="Password" labelFor="password">
        <cwr-inline-button labelSlot variant="brand">Forgot password?</cwr-inline-button>
        <cwr-text-input id="password" type="password" placeholder="Enter password"></cwr-text-input>
      </cwr-form-field>
    </app-example-block>
  `,
})
export class FormFieldShowcase {
  fullName = '';

  basicCode = `<cwr-form-field label="Full name" [mandatory]="true" labelFor="full-name" hintText="As shown on your passport">
  <cwr-text-input id="full-name" [(ngModel)]="fullName" placeholder="Enter full name"></cwr-text-input>
</cwr-form-field>`;

  errorCode = `<cwr-form-field label="Email" [mandatory]="true" labelFor="email"
  [hasError]="true" errorText="Enter a valid email address">
  <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
</cwr-form-field>`;

  labelSlotCode = `<cwr-form-field label="Password" labelFor="password">
  <cwr-inline-button labelSlot variant="brand">Forgot password?</cwr-inline-button>
  <cwr-text-input id="password" type="password" placeholder="Enter password"></cwr-text-input>
</cwr-form-field>`;
}
