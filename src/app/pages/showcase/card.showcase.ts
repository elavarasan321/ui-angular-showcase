import { Component } from '@angular/core';
import { CardComponent, ButtonComponent, BadgeComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { CardPlayground } from './card-playground';

@Component({
  selector: 'app-card-showcase',
  standalone: true,
  imports: [CardComponent, ButtonComponent, BadgeComponent, ExampleBlock, ShowcaseHeader, CardPlayground],
  template: `
    <app-showcase-header title="Card" selector="cwr-card"></app-showcase-header>

    <app-card-playground></app-card-playground>
    <p>
      <code>cwr-card</code> is a bordered content container with an optional title, description,
      and header slots for inline or trailing content — a badge next to the title, or an action
      button aligned to the header row.
    </p>

    <app-example-block title="Surfaces" [code]="surfacesCode">
      <cwr-card surface="surface" title="Surface" style="width: 100%;"
        >Default surface with a subtle border.</cwr-card
      >
      <cwr-card surface="raised-surface" title="Raised surface" style="width: 100%;"
        >Sits above the page background.</cwr-card
      >
      <cwr-card surface="lowered-surface" title="Lowered surface" style="width: 100%;"
        >Recessed below the page background.</cwr-card
      >
    </app-example-block>

    <app-example-block title="Header with trailing action" [code]="trailingCode">
      <cwr-card title="Documents" description="3 documents uploaded" style="width: 100%;">
        <span cardHeaderTrailing>
          <cwr-button variant="outline" intent="neutral" size="sm" label="Upload"></cwr-button>
        </span>
        Document list goes here.
      </cwr-card>
    </app-example-block>

    <app-example-block title="Header with inline badge" [code]="inlineCode">
      <cwr-card title="Verification" style="width: 100%;">
        <span cardHeaderInline>
          <cwr-badge intent="positive" emphasis="subtle" value="Verified"></cwr-badge>
        </span>
        This applicant's identity has been verified.
      </cwr-card>
    </app-example-block>

    <app-example-block title="Heading level & layout" [code]="headingCode">
      <cwr-card title="Compact heading" heading="h4" layout="stacked" style="width: 100%;"
        >Used for dense, nested cards.</cwr-card
      >
    </app-example-block>
  `,
})
export class CardShowcase {
  surfacesCode = `<cwr-card surface="surface" title="Surface">Default surface with a subtle border.</cwr-card>
<cwr-card surface="raised-surface" title="Raised surface">Sits above the page background.</cwr-card>
<cwr-card surface="lowered-surface" title="Lowered surface">Recessed below the page background.</cwr-card>`;

  trailingCode = `<cwr-card title="Documents" description="3 documents uploaded">
  <span cardHeaderTrailing>
    <cwr-button variant="outline" intent="neutral" size="sm" label="Upload"></cwr-button>
  </span>
  Document list goes here.
</cwr-card>`;

  inlineCode = `<cwr-card title="Verification">
  <span cardHeaderInline>
    <cwr-badge intent="positive" emphasis="subtle" value="Verified"></cwr-badge>
  </span>
  This applicant's identity has been verified.
</cwr-card>`;

  headingCode = `<cwr-card title="Compact heading" heading="h4" layout="stacked">Used for dense, nested cards.</cwr-card>`;
}
