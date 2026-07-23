import { Component, signal } from '@angular/core';
import { RadioButtonCardComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { RadioButtonCardPlayground } from './radio-button-card-playground';

@Component({
  selector: 'app-radio-button-card-showcase',
  standalone: true,
  imports: [RadioButtonCardComponent, ExampleBlock, ShowcaseHeader, RadioButtonCardPlayground],
  template: `
    <app-showcase-header
      title="Radio Button Card"
      selector="cwr-radio-button-card"
    ></app-showcase-header>

    <app-radio-button-card-playground></app-radio-button-card-playground>

    <app-example-block title="Radio group" [code]="groupCode">
      <cwr-radio-button-card
        label="Weekly"
        [checked]="frequency() === 'weekly'"
        (checkedChange)="frequency.set('weekly')"
      ></cwr-radio-button-card>
      <cwr-radio-button-card
        label="Fortnightly"
        [checked]="frequency() === 'fortnightly'"
        (checkedChange)="frequency.set('fortnightly')"
      ></cwr-radio-button-card>
      <cwr-radio-button-card
        label="Monthly"
        [checked]="frequency() === 'monthly'"
        (checkedChange)="frequency.set('monthly')"
      ></cwr-radio-button-card>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-radio-button-card label="Option A" state="error"></cwr-radio-button-card>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-radio-button-card label="Disabled unchecked" [disabled]="true"></cwr-radio-button-card>
      <cwr-radio-button-card
        label="Disabled checked"
        [checked]="true"
        [disabled]="true"
      ></cwr-radio-button-card>
    </app-example-block>
  `,
})
export class RadioButtonCardShowcase {
  frequency = signal<'weekly' | 'fortnightly' | 'monthly'>('weekly');

  groupCode = `<cwr-radio-button-card
  label="Weekly"
  [checked]="frequency() === 'weekly'"
  (checkedChange)="frequency.set('weekly')"
></cwr-radio-button-card>
<cwr-radio-button-card
  label="Fortnightly"
  [checked]="frequency() === 'fortnightly'"
  (checkedChange)="frequency.set('fortnightly')"
></cwr-radio-button-card>
<cwr-radio-button-card
  label="Monthly"
  [checked]="frequency() === 'monthly'"
  (checkedChange)="frequency.set('monthly')"
></cwr-radio-button-card>`;

  errorCode = `<cwr-radio-button-card label="Option A" state="error"></cwr-radio-button-card>`;

  disabledCode = `<cwr-radio-button-card label="Disabled unchecked" [disabled]="true"></cwr-radio-button-card>
<cwr-radio-button-card label="Disabled checked" [checked]="true" [disabled]="true"></cwr-radio-button-card>`;
}
