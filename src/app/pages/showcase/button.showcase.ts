import { Component } from '@angular/core';
import { ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [ButtonComponent, ExampleBlock, ShowcaseHeader],
  template: `
    <app-showcase-header title="Button" selector="cwr-button"></app-showcase-header>

    <app-example-block title="Variants & intents" [code]="variantsCode">
      <cwr-button variant="solid" intent="brand" label="Save employee"></cwr-button>
      <cwr-button variant="outline" intent="neutral" label="Cancel"></cwr-button>
      <cwr-button variant="ghost" intent="negative" label="Delete"></cwr-button>
    </app-example-block>

    <app-example-block title="Sizes" [code]="sizesCode">
      <cwr-button size="md" label="Medium"></cwr-button>
      <cwr-button size="sm" label="Small"></cwr-button>
    </app-example-block>

    <app-example-block title="Icons, loading & disabled states" [code]="statesCode">
      <cwr-button [leadingIcon]="'icon.ui.add'" label="Add employee"></cwr-button>
      <cwr-button [loading]="true" label="Saving..."></cwr-button>
      <cwr-button [disabled]="true" label="Disabled"></cwr-button>
    </app-example-block>

    <app-example-block title="Click handler" [code]="clickCode">
      <cwr-button label="Click me" (buttonClick)="onClick()"></cwr-button>
      @if (clicks) {
        <span>Clicked {{ clicks }} time(s)</span>
      }
    </app-example-block>
  `,
})
export class ButtonShowcase {
  clicks = 0;

  onClick(): void {
    this.clicks++;
  }

  variantsCode = `<cwr-button variant="solid" intent="brand" label="Save employee"></cwr-button>
<cwr-button variant="outline" intent="neutral" label="Cancel"></cwr-button>
<cwr-button variant="ghost" intent="negative" label="Delete"></cwr-button>`;

  sizesCode = `<cwr-button size="md" label="Medium"></cwr-button>
<cwr-button size="sm" label="Small"></cwr-button>`;

  statesCode = `<cwr-button [leadingIcon]="'icon.ui.add'" label="Add employee"></cwr-button>
<cwr-button [loading]="true" label="Saving..."></cwr-button>
<cwr-button [disabled]="true" label="Disabled"></cwr-button>`;

  clickCode = `<cwr-button label="Click me" (buttonClick)="onClick()"></cwr-button>`;
}
