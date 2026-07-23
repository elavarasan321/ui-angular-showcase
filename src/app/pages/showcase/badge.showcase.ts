import { Component } from '@angular/core';
import { BadgeComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { BadgePlayground } from './badge-playground';

@Component({
  selector: 'app-badge-showcase',
  standalone: true,
  imports: [BadgeComponent, ExampleBlock, ShowcaseHeader, BadgePlayground],
  template: `
    <app-showcase-header title="Badge" selector="cwr-badge"></app-showcase-header>
    <app-badge-playground></app-badge-playground>

    <app-example-block title="Intents" [code]="intentsCode">
      <cwr-badge value="Neutral" intent="neutral"></cwr-badge>
      <cwr-badge value="Brand" intent="brand"></cwr-badge>
      <cwr-badge value="Positive" intent="positive"></cwr-badge>
      <cwr-badge value="Warning" intent="warning"></cwr-badge>
      <cwr-badge value="Caution" intent="caution"></cwr-badge>
      <cwr-badge value="Negative" intent="negative"></cwr-badge>
    </app-example-block>

    <app-example-block title="Emphasis" [code]="emphasisCode">
      <cwr-badge value="Solid" intent="brand" emphasis="solid"></cwr-badge>
      <cwr-badge value="Subtle" intent="brand" emphasis="subtle"></cwr-badge>
      <cwr-badge value="Inverse" intent="brand" emphasis="inverse"></cwr-badge>
    </app-example-block>

    <app-example-block title="Numeric value" [code]="numericCode">
      <cwr-badge [value]="3" intent="brand"></cwr-badge>
      <cwr-badge [value]="12" intent="negative"></cwr-badge>
    </app-example-block>
  `,
})
export class BadgeShowcase {
  intentsCode = `<cwr-badge value="Neutral" intent="neutral"></cwr-badge>
<cwr-badge value="Brand" intent="brand"></cwr-badge>
<cwr-badge value="Positive" intent="positive"></cwr-badge>
<cwr-badge value="Warning" intent="warning"></cwr-badge>
<cwr-badge value="Caution" intent="caution"></cwr-badge>
<cwr-badge value="Negative" intent="negative"></cwr-badge>`;

  emphasisCode = `<cwr-badge value="Solid" intent="brand" emphasis="solid"></cwr-badge>
<cwr-badge value="Subtle" intent="brand" emphasis="subtle"></cwr-badge>
<cwr-badge value="Inverse" intent="brand" emphasis="inverse"></cwr-badge>`;

  numericCode = `<cwr-badge [value]="3" intent="brand"></cwr-badge>
<cwr-badge [value]="12" intent="negative"></cwr-badge>`;
}
