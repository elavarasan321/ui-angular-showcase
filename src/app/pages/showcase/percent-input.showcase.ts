import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PercentInputComponent, FormFieldComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { PercentInputPlayground } from './percent-input-playground';

@Component({
  selector: 'app-percent-input-showcase',
  standalone: true,
  imports: [
    FormsModule,
    PercentInputComponent,
    FormFieldComponent,
    ExampleBlock,
    ShowcaseHeader,
    PercentInputPlayground,
  ],
  template: `
    <app-showcase-header title="Percent Input" selector="cwr-percent-input"></app-showcase-header>

    <app-percent-input-playground></app-percent-input-playground>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-percent-input [(ngModel)]="completionRate"></cwr-percent-input>
      <span>Value: {{ completionRate }}</span>
    </app-example-block>

    <app-example-block title="Inside a form field" [code]="formFieldCode">
      <cwr-form-field
        label="Completion rate"
        labelFor="completion-rate"
        hintText="Enter a percentage"
      >
        <cwr-percent-input id="completion-rate"></cwr-percent-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Limit decimals" [code]="limitDecimalsCode">
      <cwr-percent-input [limitDecimals]="true" [decimals]="1"></cwr-percent-input>
    </app-example-block>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-percent-input state="error"></cwr-percent-input>
      <cwr-percent-input [disabled]="true"></cwr-percent-input>
      <cwr-percent-input [readOnly]="true" [value]="42.5"></cwr-percent-input>
    </app-example-block>
  `,
})
export class PercentInputShowcase {
  completionRate: number | null = null;

  ngModelCode = `<cwr-percent-input [(ngModel)]="completionRate"></cwr-percent-input>`;

  formFieldCode = `<cwr-form-field label="Completion rate" labelFor="completion-rate" hintText="Enter a percentage">
  <cwr-percent-input id="completion-rate"></cwr-percent-input>
</cwr-form-field>`;

  limitDecimalsCode = `<cwr-percent-input [limitDecimals]="true" [decimals]="1"></cwr-percent-input>`;

  statesCode = `<cwr-percent-input state="error"></cwr-percent-input>
<cwr-percent-input [disabled]="true"></cwr-percent-input>
<cwr-percent-input [readOnly]="true" [value]="42.5"></cwr-percent-input>`;
}
