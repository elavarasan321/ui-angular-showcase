import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent, FormFieldComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { CurrencyInputPlayground } from './currency-input-playground';

@Component({
  selector: 'app-currency-input-showcase',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyInputComponent,
    FormFieldComponent,
    ExampleBlock,
    ShowcaseHeader,
    CurrencyInputPlayground,
  ],
  template: `
    <app-showcase-header
      title="Currency Input"
      selector="cwr-currency-input"
    ></app-showcase-header>

    <app-currency-input-playground></app-currency-input-playground>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-currency-input [(ngModel)]="amount"></cwr-currency-input>
      <span>Value: {{ amount }}</span>
    </app-example-block>

    <app-example-block title="Inside a form field" [code]="formFieldCode">
      <cwr-form-field label="Amount" labelFor="amount" hintText="Enter an amount">
        <cwr-currency-input id="amount"></cwr-currency-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Currency symbol" [code]="currencySymbolCode">
      <cwr-currency-input currencySymbol="$" placeholder="0.00"></cwr-currency-input>
      <cwr-currency-input currencySymbol="€" placeholder="0.00"></cwr-currency-input>
      <cwr-currency-input currencySymbol="£" placeholder="0.00"></cwr-currency-input>
    </app-example-block>

    <app-example-block title="Whole numbers only" [code]="allowDecimalsCode">
      <cwr-currency-input [allowDecimals]="false" placeholder="0"></cwr-currency-input>
    </app-example-block>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-currency-input state="error"></cwr-currency-input>
      <cwr-currency-input [disabled]="true"></cwr-currency-input>
      <cwr-currency-input [readOnly]="true" [value]="1250.5"></cwr-currency-input>
    </app-example-block>
  `,
})
export class CurrencyInputShowcase {
  amount: number | null = null;

  ngModelCode = `<cwr-currency-input [(ngModel)]="amount"></cwr-currency-input>`;

  formFieldCode = `<cwr-form-field label="Amount" labelFor="amount" hintText="Enter an amount">
  <cwr-currency-input id="amount"></cwr-currency-input>
</cwr-form-field>`;

  currencySymbolCode = `<cwr-currency-input currencySymbol="$" placeholder="0.00"></cwr-currency-input>
<cwr-currency-input currencySymbol="€" placeholder="0.00"></cwr-currency-input>
<cwr-currency-input currencySymbol="£" placeholder="0.00"></cwr-currency-input>`;

  allowDecimalsCode = `<cwr-currency-input [allowDecimals]="false" placeholder="0"></cwr-currency-input>`;

  statesCode = `<cwr-currency-input state="error"></cwr-currency-input>
<cwr-currency-input [disabled]="true"></cwr-currency-input>
<cwr-currency-input [readOnly]="true" [value]="1250.5"></cwr-currency-input>`;
}
