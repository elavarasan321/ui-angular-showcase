import { Component } from '@angular/core';
import { CheckboxComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { CheckboxPlayground } from './checkbox-playground';

@Component({
  selector: 'app-checkbox-showcase',
  standalone: true,
  imports: [CheckboxComponent, ExampleBlock, ShowcaseHeader, CheckboxPlayground],
  template: `
    <app-showcase-header title="Checkbox" selector="cwr-checkbox"></app-showcase-header>

    <app-checkbox-playground></app-checkbox-playground>

    <app-example-block title="Checked & unchecked" [code]="checkedCode">
      <cwr-checkbox label="Unchecked option" [checked]="false"></cwr-checkbox>
      <cwr-checkbox label="Checked option" [checked]="true"></cwr-checkbox>
    </app-example-block>

    <app-example-block title="Indeterminate" [code]="indeterminateCode">
      <cwr-checkbox label="Select all" [indeterminate]="true"></cwr-checkbox>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-checkbox label="Accept terms and conditions" state="error"></cwr-checkbox>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-checkbox label="Disabled unchecked" [disabled]="true"></cwr-checkbox>
      <cwr-checkbox label="Disabled checked" [checked]="true" [disabled]="true"></cwr-checkbox>
    </app-example-block>
  `,
})
export class CheckboxShowcase {
  checkedCode = `<cwr-checkbox label="Unchecked option" [checked]="false"></cwr-checkbox>
<cwr-checkbox label="Checked option" [checked]="true"></cwr-checkbox>`;

  indeterminateCode = `<cwr-checkbox label="Select all" [indeterminate]="true"></cwr-checkbox>`;

  errorCode = `<cwr-checkbox label="Accept terms and conditions" state="error"></cwr-checkbox>`;

  disabledCode = `<cwr-checkbox label="Disabled unchecked" [disabled]="true"></cwr-checkbox>
<cwr-checkbox label="Disabled checked" [checked]="true" [disabled]="true"></cwr-checkbox>`;
}
