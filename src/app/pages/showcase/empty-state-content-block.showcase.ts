import { Component } from '@angular/core';
import {
  EmptyStateContentBlockComponent,
  ButtonComponent,
  InlineButtonComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { EmptyStateContentBlockPlayground } from './empty-state-content-block-playground';

@Component({
  selector: 'app-empty-state-content-block-showcase',
  standalone: true,
  imports: [
    EmptyStateContentBlockComponent,
    ButtonComponent,
    InlineButtonComponent,
    ExampleBlock,
    ShowcaseHeader,
    EmptyStateContentBlockPlayground,
  ],
  template: `
    <app-showcase-header
      title="Empty State Content Block"
      selector="cwr-empty-state-content-block"
    ></app-showcase-header>

    <app-empty-state-content-block-playground></app-empty-state-content-block-playground>
    <p>
      <code>cwr-empty-state-content-block</code> centers an illustration, title, optional
      description, and up to a couple of actions — for when a list, table, or panel has nothing
      to show yet.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-empty-state-content-block
        illustration="illustration.document.awaiting-verification"
        title="No documents yet"
        description="Upload a document to get started with verification."
        [hasActions]="false"
        style="width: 100%;"
      ></cwr-empty-state-content-block>
    </app-example-block>

    <app-example-block title="With a primary action" [code]="actionCode">
      <cwr-empty-state-content-block
        illustration="illustration.document.awaiting-verification"
        title="No documents yet"
        description="Upload a document to get started with verification."
        style="width: 100%;"
      >
        <cwr-button variant="solid" intent="brand" size="sm" label="Upload document"></cwr-button>
      </cwr-empty-state-content-block>
    </app-example-block>

    <app-example-block title="Primary and secondary actions" [code]="twoActionsCode">
      <cwr-empty-state-content-block
        illustration="illustration.document.expired"
        title="This document has expired"
        description="Renew it to keep your verification up to date."
        style="width: 100%;"
      >
        <cwr-button variant="solid" intent="brand" size="sm" label="Renew now"></cwr-button>
        <cwr-inline-button variant="neutral">Remind me later</cwr-inline-button>
      </cwr-empty-state-content-block>
    </app-example-block>
  `,
})
export class EmptyStateContentBlockShowcase {
  basicCode = `<cwr-empty-state-content-block
  illustration="illustration.document.awaiting-verification"
  title="No documents yet"
  description="Upload a document to get started with verification."
  [hasActions]="false"
></cwr-empty-state-content-block>`;

  actionCode = `<cwr-empty-state-content-block
  illustration="illustration.document.awaiting-verification"
  title="No documents yet"
  description="Upload a document to get started with verification."
>
  <cwr-button variant="solid" intent="brand" size="sm" label="Upload document"></cwr-button>
</cwr-empty-state-content-block>`;

  twoActionsCode = `<cwr-empty-state-content-block
  illustration="illustration.document.expired"
  title="This document has expired"
  description="Renew it to keep your verification up to date."
>
  <cwr-button variant="solid" intent="brand" size="sm" label="Renew now"></cwr-button>
  <cwr-inline-button variant="neutral">Remind me later</cwr-inline-button>
</cwr-empty-state-content-block>`;
}
