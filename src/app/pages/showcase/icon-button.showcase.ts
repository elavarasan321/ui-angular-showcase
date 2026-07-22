import { Component } from '@angular/core';
import { IconButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { IconButtonPlayground } from './icon-button-playground';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-icon-button-showcase',
  standalone: true,
  imports: [IconButtonComponent, ExampleBlock, ShowcaseHeader, IconButtonPlayground],
  template: `
    <app-showcase-header title="Icon Button" selector="cwr-icon-button"></app-showcase-header>

    <app-icon-button-playground></app-icon-button-playground>

    <app-example-block title="Variants & intents" [code]="variantsCode">
      <cwr-icon-button icon="icon.ui.edit" variant="solid" intent="brand" label="Edit"></cwr-icon-button>
      <cwr-icon-button icon="icon.ui.download" variant="outline" intent="neutral" label="Download"></cwr-icon-button>
      <cwr-icon-button icon="icon.ui.delete" variant="ghost" intent="negative" label="Delete"></cwr-icon-button>
    </app-example-block>

    <app-example-block title="Hint on hover" [code]="hintCode">
      <cwr-icon-button
        icon="icon.ui.info"
        [hasHint]="true"
        label="More information"
        tooltipPosition="top"
      ></cwr-icon-button>
    </app-example-block>

    <app-example-block title="Loading & disabled" [code]="statesCode">
      <cwr-icon-button icon="icon.ui.upload" [loading]="true" [hasHint]="false"></cwr-icon-button>
      <cwr-icon-button icon="icon.ui.upload" [disabled]="true" [hasHint]="false"></cwr-icon-button>
    </app-example-block>
  `,
})
export class IconButtonShowcase {
  variantsCode = `<cwr-icon-button icon="icon.ui.edit" variant="solid" intent="brand" label="Edit"></cwr-icon-button>
<cwr-icon-button icon="icon.ui.download" variant="outline" intent="neutral" label="Download"></cwr-icon-button>
<cwr-icon-button icon="icon.ui.delete" variant="ghost" intent="negative" label="Delete"></cwr-icon-button>`;

  hintCode = `<cwr-icon-button icon="icon.ui.info" [hasHint]="true" label="More information" tooltipPosition="top"></cwr-icon-button>`;

  statesCode = `<cwr-icon-button icon="icon.ui.upload" [loading]="true" [hasHint]="false"></cwr-icon-button>
<cwr-icon-button icon="icon.ui.upload" [disabled]="true" [hasHint]="false"></cwr-icon-button>`;
}
