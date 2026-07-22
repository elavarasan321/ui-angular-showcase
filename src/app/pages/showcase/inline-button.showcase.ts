import { Component } from '@angular/core';
import { InlineButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { InlineButtonPlayground } from './inline-button-playground';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-inline-button-showcase',
  standalone: true,
  imports: [InlineButtonComponent, ExampleBlock, ShowcaseHeader, InlineButtonPlayground],
  template: `
    <app-showcase-header title="Inline Button" selector="cwr-inline-button"></app-showcase-header>

    <app-inline-button-playground></app-inline-button-playground>

    <app-example-block title="Intents" [code]="intentsCode">
      <cwr-inline-button variant="brand">Learn more</cwr-inline-button>
      <cwr-inline-button variant="neutral">Skip</cwr-inline-button>
      <cwr-inline-button variant="negative">Remove</cwr-inline-button>
    </app-example-block>

    <app-example-block title="With icons" [code]="iconsCode">
      <cwr-inline-button variant="brand" [leadingIcon]="'icon.ui.download'"
        >Download report</cwr-inline-button
      >
      <cwr-inline-button variant="brand" [trailingIcon]="'icon.ui.external-link'"
        >Open in new tab</cwr-inline-button
      >
    </app-example-block>

    <app-example-block title="Loading & disabled" [code]="statesCode">
      <cwr-inline-button variant="brand" [loading]="true">Saving...</cwr-inline-button>
      <cwr-inline-button variant="brand" [disabled]="true">Disabled</cwr-inline-button>
    </app-example-block>
  `,
})
export class InlineButtonShowcase {
  intentsCode = `<cwr-inline-button variant="brand">Learn more</cwr-inline-button>
<cwr-inline-button variant="neutral">Skip</cwr-inline-button>
<cwr-inline-button variant="negative">Remove</cwr-inline-button>`;

  iconsCode = `<cwr-inline-button variant="brand" [leadingIcon]="'icon.ui.download'">Download report</cwr-inline-button>
<cwr-inline-button variant="brand" [trailingIcon]="'icon.ui.external-link'">Open in new tab</cwr-inline-button>`;

  statesCode = `<cwr-inline-button variant="brand" [loading]="true">Saving...</cwr-inline-button>
<cwr-inline-button variant="brand" [disabled]="true">Disabled</cwr-inline-button>`;
}
