import { Component } from '@angular/core';
import { TooltipIconComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { TooltipIconPlayground } from './tooltip-icon-playground';

@Component({
  selector: 'app-tooltip-icon-showcase',
  standalone: true,
  imports: [TooltipIconComponent, ExampleBlock, ShowcaseHeader, TooltipIconPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Tooltip Icon" selector="cwr-tooltip-icon"></app-showcase-header>

    <app-tooltip-icon-playground></app-tooltip-icon-playground>
    <p>
      <code>cwr-tooltip-icon</code> is a small, focusable info icon that reveals a
      <code>cwr-tooltip</code> on hover or focus — a shorthand for adding contextual help next to a
      label without wiring up <code>cwr-icon-button</code> and <code>cwr-tooltip</code> yourself.
    </p>

    <app-example-block title="Next to a label" [code]="labelCode">
      <span style="display: inline-flex; align-items: center; gap: 4px;">
        <span>Annual percentage rate</span>
        <cwr-tooltip-icon
          label="Annual percentage rate"
          hintText="The yearly cost of the loan, including fees, expressed as a percentage."
        ></cwr-tooltip-icon>
      </span>
    </app-example-block>

    <app-example-block title="With a link" [code]="linkCode">
      <span style="display: inline-flex; align-items: center; gap: 4px;">
        <span>Visa status</span>
        <cwr-tooltip-icon
          label="Visa status"
          hintText="We check this against the government's visa entitlement verification system."
          linkHref="https://immi.homeaffairs.gov.au/"
          linkLabel="Learn more"
        ></cwr-tooltip-icon>
      </span>
    </app-example-block>

    <app-example-block title="Arrow position" [code]="arrowCode">
      <cwr-tooltip-icon
        label="Top aligned"
        hintText="This tooltip opens above the icon."
        arrowPosition="top"
      ></cwr-tooltip-icon>
    </app-example-block>

    <app-component-reference selector="cwr-tooltip-icon"></app-component-reference>
  `,
})
export class TooltipIconShowcase {
  labelCode = `<span style="display: inline-flex; align-items: center; gap: 4px;">
  <span>Annual percentage rate</span>
  <cwr-tooltip-icon
    label="Annual percentage rate"
    hintText="The yearly cost of the loan, including fees, expressed as a percentage."
  ></cwr-tooltip-icon>
</span>`;

  linkCode = `<span style="display: inline-flex; align-items: center; gap: 4px;">
  <span>Visa status</span>
  <cwr-tooltip-icon
    label="Visa status"
    hintText="We check this against the government's visa entitlement verification system."
    linkHref="https://immi.homeaffairs.gov.au/"
    linkLabel="Learn more"
  ></cwr-tooltip-icon>
</span>`;

  arrowCode = `<cwr-tooltip-icon
  label="Top aligned"
  hintText="This tooltip opens above the icon."
  arrowPosition="top"
></cwr-tooltip-icon>`;
}
