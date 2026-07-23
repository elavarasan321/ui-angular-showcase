import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { RadioButtonPlayground } from './radio-button-playground';

@Component({
  selector: 'app-radio-button-showcase',
  standalone: true,
  imports: [RadioButtonComponent, ExampleBlock, ShowcaseHeader, RadioButtonPlayground],
  template: `
    <app-showcase-header title="Radio Button" selector="cwr-radio-button"></app-showcase-header>

    <app-radio-button-playground></app-radio-button-playground>

    <app-example-block title="Radio group" [code]="groupCode">
      <cwr-radio-button
        label="Weekly"
        [checked]="frequency() === 'weekly'"
        (checkedChange)="frequency.set('weekly')"
      ></cwr-radio-button>
      <cwr-radio-button
        label="Fortnightly"
        [checked]="frequency() === 'fortnightly'"
        (checkedChange)="frequency.set('fortnightly')"
      ></cwr-radio-button>
      <cwr-radio-button
        label="Monthly"
        [checked]="frequency() === 'monthly'"
        (checkedChange)="frequency.set('monthly')"
      ></cwr-radio-button>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-radio-button label="Option A" state="error"></cwr-radio-button>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-radio-button label="Disabled unchecked" [disabled]="true"></cwr-radio-button>
      <cwr-radio-button
        label="Disabled checked"
        [checked]="true"
        [disabled]="true"
      ></cwr-radio-button>
    </app-example-block>
  `,
})
export class RadioButtonShowcase {
  frequency = signal<'weekly' | 'fortnightly' | 'monthly'>('weekly');

  groupCode = `<cwr-radio-button
  label="Weekly"
  [checked]="frequency() === 'weekly'"
  (checkedChange)="frequency.set('weekly')"
></cwr-radio-button>
<cwr-radio-button
  label="Fortnightly"
  [checked]="frequency() === 'fortnightly'"
  (checkedChange)="frequency.set('fortnightly')"
></cwr-radio-button>
<cwr-radio-button
  label="Monthly"
  [checked]="frequency() === 'monthly'"
  (checkedChange)="frequency.set('monthly')"
></cwr-radio-button>`;

  errorCode = `<cwr-radio-button label="Option A" state="error"></cwr-radio-button>`;

  disabledCode = `<cwr-radio-button label="Disabled unchecked" [disabled]="true"></cwr-radio-button>
<cwr-radio-button label="Disabled checked" [checked]="true" [disabled]="true"></cwr-radio-button>`;
}
