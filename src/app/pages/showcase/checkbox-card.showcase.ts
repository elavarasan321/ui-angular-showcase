import { Component } from '@angular/core';
import { CheckboxCardComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { CheckboxCardPlayground } from './checkbox-card-playground';

@Component({
  selector: 'app-checkbox-card-showcase',
  standalone: true,
  imports: [CheckboxCardComponent, ExampleBlock, ShowcaseHeader, CheckboxCardPlayground],
  template: `
    <app-showcase-header title="Checkbox Card" selector="cwr-checkbox-card"></app-showcase-header>

    <app-checkbox-card-playground></app-checkbox-card-playground>

    <app-example-block title="Checked & unchecked" [code]="checkedCode">
      <cwr-checkbox-card label="Unchecked option" [checked]="false"></cwr-checkbox-card>
      <cwr-checkbox-card label="Checked option" [checked]="true"></cwr-checkbox-card>
    </app-example-block>

    <app-example-block title="Indeterminate" [code]="indeterminateCode">
      <cwr-checkbox-card label="Select all" [indeterminate]="true"></cwr-checkbox-card>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-checkbox-card label="Accept terms and conditions" state="error"></cwr-checkbox-card>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-checkbox-card label="Disabled unchecked" [disabled]="true"></cwr-checkbox-card>
      <cwr-checkbox-card
        label="Disabled checked"
        [checked]="true"
        [disabled]="true"
      ></cwr-checkbox-card>
    </app-example-block>
  `,
})
export class CheckboxCardShowcase {
  checkedCode = `<cwr-checkbox-card label="Unchecked option" [checked]="false"></cwr-checkbox-card>
<cwr-checkbox-card label="Checked option" [checked]="true"></cwr-checkbox-card>`;

  indeterminateCode = `<cwr-checkbox-card label="Select all" [indeterminate]="true"></cwr-checkbox-card>`;

  errorCode = `<cwr-checkbox-card label="Accept terms and conditions" state="error"></cwr-checkbox-card>`;

  disabledCode = `<cwr-checkbox-card label="Disabled unchecked" [disabled]="true"></cwr-checkbox-card>
<cwr-checkbox-card label="Disabled checked" [checked]="true" [disabled]="true"></cwr-checkbox-card>`;
}
