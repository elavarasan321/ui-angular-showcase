import { Component } from '@angular/core';
import { TooltipComponent, IconButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { TooltipPlayground } from './tooltip-playground';

@Component({
  selector: 'app-tooltip-showcase',
  standalone: true,
  imports: [TooltipComponent, IconButtonComponent, ExampleBlock, ShowcaseHeader, TooltipPlayground],
  template: `
    <app-showcase-header title="Tooltip" selector="cwr-tooltip"></app-showcase-header>
    <app-tooltip-playground></app-tooltip-playground>
    <p>
      Like <code>cwr-hint</code>, <code>cwr-tooltip</code> has no visible markup of its own — it attaches to
      its parent element and shows on hover/focus. Wrap the trigger and the tooltip together in a positioned
      container.
    </p>

    <app-example-block title="Basic tooltip" [code]="basicCode">
      <span style="position: relative; display: inline-flex;">
        <cwr-icon-button icon="icon.ui.info" label="Visa status" [hasHint]="false"></cwr-icon-button>
        <cwr-tooltip label="Visa status" arrowPosition="bottom"></cwr-tooltip>
      </span>
    </app-example-block>

    <app-example-block title="With hint text and a link" [code]="linkCode">
      <span style="position: relative; display: inline-flex;">
        <cwr-icon-button icon="icon.ui.hint" label="Right to work" [hasHint]="false"></cwr-icon-button>
        <cwr-tooltip
          label="Right to work"
          [hintText]="'Explains what this check verifies'"
          [showHintText]="true"
          [showLink]="true"
          linkHref="https://immi.homeaffairs.gov.au/"
          arrowPosition="top"
        ></cwr-tooltip>
      </span>
    </app-example-block>
  `,
})
export class TooltipShowcase {
  basicCode = `<span style="position: relative; display: inline-flex;">
  <cwr-icon-button icon="icon.ui.info" label="Visa status" [hasHint]="false"></cwr-icon-button>
  <cwr-tooltip label="Visa status" arrowPosition="bottom"></cwr-tooltip>
</span>`;

  linkCode = `<span style="position: relative; display: inline-flex;">
  <cwr-icon-button icon="icon.ui.hint" label="Right to work" [hasHint]="false"></cwr-icon-button>
  <cwr-tooltip label="Right to work" [hintText]="'Explains what this check verifies'"
    [showHintText]="true" [showLink]="true" linkHref="https://immi.homeaffairs.gov.au/"
    arrowPosition="top"></cwr-tooltip>
</span>`;
}
