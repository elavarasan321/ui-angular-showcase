import { Component } from '@angular/core';
import {
  FieldsetComponent,
  FormFieldComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { FieldsetPlayground } from './fieldset-playground';

@Component({
  selector: 'app-fieldset-showcase',
  standalone: true,
  imports: [
    FieldsetComponent,
    FormFieldComponent,
    TextInputComponent,
    ExampleBlock,
    ShowcaseHeader,
    FieldsetPlayground,
  ],
  template: `
    <app-showcase-header title="Fieldset" selector="cwr-fieldset"></app-showcase-header>

    <app-fieldset-playground></app-fieldset-playground>
    <p>
      <code>cwr-fieldset</code> groups related <code>cwr-form-field</code>s under an optional legend
      and description, laying its projected content out in a responsive grid.
    </p>

    <app-example-block title="Two-column layout" [code]="twoColumnCode">
      <cwr-fieldset
        legend="Contact details"
        description="We'll use this to get in touch"
        [columns]="2"
        style="width: 100%;"
      >
        <cwr-form-field label="First name" labelFor="two-col-first-name">
          <cwr-text-input id="two-col-first-name" placeholder="Enter first name"></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Last name" labelFor="two-col-last-name">
          <cwr-text-input id="two-col-last-name" placeholder="Enter last name"></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Email" labelFor="two-col-email">
          <cwr-text-input id="two-col-email" placeholder="name@example.com"></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Phone" labelFor="two-col-phone">
          <cwr-text-input id="two-col-phone" placeholder="Enter phone number"></cwr-text-input>
        </cwr-form-field>
      </cwr-fieldset>
    </app-example-block>

    <app-example-block title="Custom column sizes" [code]="columnSizesCode">
      <cwr-fieldset legend="Address" [columns]="2" [columnSizes]="[2, 1]" style="width: 100%;">
        <cwr-form-field label="Street address" labelFor="col-sizes-street">
          <cwr-text-input
            id="col-sizes-street"
            placeholder="Enter street address"
          ></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Postcode" labelFor="col-sizes-postcode">
          <cwr-text-input id="col-sizes-postcode" placeholder="Enter postcode"></cwr-text-input>
        </cwr-form-field>
      </cwr-fieldset>
    </app-example-block>

    <app-example-block title="Gap variants" [code]="gapCode">
      <cwr-fieldset legend="Compact (md gap)" [columns]="2" gap="md" rowGap="md" style="width: 100%;">
        <cwr-form-field label="First name" labelFor="gap-md-first-name">
          <cwr-text-input id="gap-md-first-name" placeholder="Enter first name"></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Last name" labelFor="gap-md-last-name">
          <cwr-text-input id="gap-md-last-name" placeholder="Enter last name"></cwr-text-input>
        </cwr-form-field>
      </cwr-fieldset>

      <cwr-fieldset legend="Spacious (xl gap)" [columns]="2" gap="xl" rowGap="xl" style="width: 100%;">
        <cwr-form-field label="First name" labelFor="gap-xl-first-name">
          <cwr-text-input id="gap-xl-first-name" placeholder="Enter first name"></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Last name" labelFor="gap-xl-last-name">
          <cwr-text-input id="gap-xl-last-name" placeholder="Enter last name"></cwr-text-input>
        </cwr-form-field>
      </cwr-fieldset>
    </app-example-block>
  `,
})
export class FieldsetShowcase {
  twoColumnCode = `<cwr-fieldset legend="Contact details" description="We'll use this to get in touch" [columns]="2">
  <cwr-form-field label="First name" labelFor="first-name">
    <cwr-text-input id="first-name" placeholder="Enter first name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Last name" labelFor="last-name">
    <cwr-text-input id="last-name" placeholder="Enter last name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Email" labelFor="email">
    <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Phone" labelFor="phone">
    <cwr-text-input id="phone" placeholder="Enter phone number"></cwr-text-input>
  </cwr-form-field>
</cwr-fieldset>`;

  columnSizesCode = `<cwr-fieldset legend="Address" [columns]="2" [columnSizes]="[2, 1]">
  <cwr-form-field label="Street address" labelFor="street">
    <cwr-text-input id="street" placeholder="Enter street address"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Postcode" labelFor="postcode">
    <cwr-text-input id="postcode" placeholder="Enter postcode"></cwr-text-input>
  </cwr-form-field>
</cwr-fieldset>`;

  gapCode = `<cwr-fieldset legend="Compact (md gap)" [columns]="2" gap="md" rowGap="md">
  <cwr-form-field label="First name" labelFor="first-name">
    <cwr-text-input id="first-name" placeholder="Enter first name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Last name" labelFor="last-name">
    <cwr-text-input id="last-name" placeholder="Enter last name"></cwr-text-input>
  </cwr-form-field>
</cwr-fieldset>

<cwr-fieldset legend="Spacious (xl gap)" [columns]="2" gap="xl" rowGap="xl">
  <cwr-form-field label="First name" labelFor="first-name">
    <cwr-text-input id="first-name" placeholder="Enter first name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Last name" labelFor="last-name">
    <cwr-text-input id="last-name" placeholder="Enter last name"></cwr-text-input>
  </cwr-form-field>
</cwr-fieldset>`;
}
