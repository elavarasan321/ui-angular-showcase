import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, FormFieldComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { DateInputPlayground } from './date-input-playground';

@Component({
  selector: 'app-date-input-showcase',
  standalone: true,
  imports: [
    FormsModule,
    DateInputComponent,
    FormFieldComponent,
    ExampleBlock,
    ShowcaseHeader,
    DateInputPlayground,
  ],
  template: `
    <app-showcase-header title="Date Input" selector="cwr-date-input"></app-showcase-header>

    <app-date-input-playground></app-date-input-playground>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-date-input [(ngModel)]="dob"></cwr-date-input>
      <span>Value: {{ dob }}</span>
    </app-example-block>

    <app-example-block title="Inside a form field" [code]="formFieldCode">
      <cwr-form-field label="Date of birth" hintText="DD/MM/YYYY">
        <cwr-date-input></cwr-date-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Separators" [code]="separatorsCode">
      <cwr-date-input separator="/"></cwr-date-input>
      <cwr-date-input separator="-"></cwr-date-input>
      <cwr-date-input separator="."></cwr-date-input>
    </app-example-block>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-date-input state="error"></cwr-date-input>
      <cwr-date-input [disabled]="true"></cwr-date-input>
      <cwr-date-input [readOnly]="true" value="25/12/2024"></cwr-date-input>
    </app-example-block>
  `,
})
export class DateInputShowcase {
  dob: string | null = null;

  ngModelCode = `<cwr-date-input [(ngModel)]="dob"></cwr-date-input>`;

  formFieldCode = `<cwr-form-field label="Date of birth" hintText="DD/MM/YYYY">
  <cwr-date-input></cwr-date-input>
</cwr-form-field>`;

  separatorsCode = `<cwr-date-input separator="/"></cwr-date-input>
<cwr-date-input separator="-"></cwr-date-input>
<cwr-date-input separator="."></cwr-date-input>`;

  statesCode = `<cwr-date-input state="error"></cwr-date-input>
<cwr-date-input [disabled]="true"></cwr-date-input>
<cwr-date-input [readOnly]="true" value="25/12/2024"></cwr-date-input>`;
}
