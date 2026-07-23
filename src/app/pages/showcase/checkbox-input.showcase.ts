import { Component } from '@angular/core';
import { CheckboxInputComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { CheckboxInputPlayground } from './checkbox-input-playground';

@Component({
  selector: 'app-checkbox-input-showcase',
  standalone: true,
  imports: [CheckboxInputComponent, ExampleBlock, ShowcaseHeader, CheckboxInputPlayground],
  template: `
    <app-showcase-header
      title="Checkbox Input"
      selector="cwr-checkbox-input"
    ></app-showcase-header>
    <app-checkbox-input-playground></app-checkbox-input-playground>
    <p>
      <code>cwr-checkbox-input</code> is the bare, unlabeled checkbox primitive used inside
      <code>cwr-checkbox</code> and <code>cwr-checkbox-card</code>. It renders no visible label of
      its own, so always pair it with an <code>aria-label</code> (or
      <code>aria-labelledby</code>) when using it directly.
    </p>

    <app-example-block title="Checked / unchecked" [code]="checkedCode">
      <cwr-checkbox-input aria-label="Unchecked option"></cwr-checkbox-input>
      <cwr-checkbox-input [checked]="true" aria-label="Checked option"></cwr-checkbox-input>
    </app-example-block>

    <app-example-block title="Indeterminate" [code]="indeterminateCode">
      <cwr-checkbox-input [indeterminate]="true" aria-label="Select all"></cwr-checkbox-input>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-checkbox-input state="error" aria-label="Invalid option"></cwr-checkbox-input>
      <cwr-checkbox-input
        state="error"
        [checked]="true"
        aria-label="Invalid checked option"
      ></cwr-checkbox-input>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-checkbox-input
        [disabled]="true"
        aria-label="Disabled unchecked option"
      ></cwr-checkbox-input>
      <cwr-checkbox-input
        [disabled]="true"
        [checked]="true"
        aria-label="Disabled checked option"
      ></cwr-checkbox-input>
    </app-example-block>
  `,
})
export class CheckboxInputShowcase {
  checkedCode = `<cwr-checkbox-input aria-label="Unchecked option"></cwr-checkbox-input>
<cwr-checkbox-input [checked]="true" aria-label="Checked option"></cwr-checkbox-input>`;

  indeterminateCode = `<cwr-checkbox-input [indeterminate]="true" aria-label="Select all"></cwr-checkbox-input>`;

  errorCode = `<cwr-checkbox-input state="error" aria-label="Invalid option"></cwr-checkbox-input>
<cwr-checkbox-input state="error" [checked]="true" aria-label="Invalid checked option"></cwr-checkbox-input>`;

  disabledCode = `<cwr-checkbox-input [disabled]="true" aria-label="Disabled unchecked option"></cwr-checkbox-input>
<cwr-checkbox-input [disabled]="true" [checked]="true" aria-label="Disabled checked option"></cwr-checkbox-input>`;
}
