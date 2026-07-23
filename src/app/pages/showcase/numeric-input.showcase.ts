import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericInputComponent, FormFieldComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { NumericInputPlayground } from './numeric-input-playground';

@Component({
  selector: 'app-numeric-input-showcase',
  standalone: true,
  imports: [
    FormsModule,
    NumericInputComponent,
    FormFieldComponent,
    ExampleBlock,
    ShowcaseHeader,
    NumericInputPlayground,
  ],
  template: `
    <app-showcase-header title="Numeric Input" selector="cwr-numeric-input"></app-showcase-header>

    <app-numeric-input-playground></app-numeric-input-playground>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-numeric-input [(ngModel)]="amount" placeholder="Enter amount"></cwr-numeric-input>
      <span>Value: {{ amount }}</span>
    </app-example-block>

    <app-example-block title="Inside a form field" [code]="formFieldCode">
      <cwr-form-field label="Amount" labelFor="amount" hintText="Enter a whole number">
        <cwr-numeric-input id="amount" placeholder="0"></cwr-numeric-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Limit decimals" [code]="limitDecimalsCode">
      <cwr-numeric-input [limitDecimals]="true" [decimals]="2" placeholder="0.00"></cwr-numeric-input>
    </app-example-block>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-numeric-input state="error" placeholder="Enter amount"></cwr-numeric-input>
      <cwr-numeric-input [disabled]="true" placeholder="Enter amount"></cwr-numeric-input>
      <cwr-numeric-input [readOnly]="true" [value]="1250"></cwr-numeric-input>
    </app-example-block>
  `,
})
export class NumericInputShowcase {
  amount: number | null = null;

  ngModelCode = `<cwr-numeric-input [(ngModel)]="amount" placeholder="Enter amount"></cwr-numeric-input>`;

  formFieldCode = `<cwr-form-field label="Amount" labelFor="amount" hintText="Enter a whole number">
  <cwr-numeric-input id="amount" placeholder="0"></cwr-numeric-input>
</cwr-form-field>`;

  limitDecimalsCode = `<cwr-numeric-input [limitDecimals]="true" [decimals]="2" placeholder="0.00"></cwr-numeric-input>`;

  statesCode = `<cwr-numeric-input state="error" placeholder="Enter amount"></cwr-numeric-input>
<cwr-numeric-input [disabled]="true" placeholder="Enter amount"></cwr-numeric-input>
<cwr-numeric-input [readOnly]="true" [value]="1250"></cwr-numeric-input>`;
}
