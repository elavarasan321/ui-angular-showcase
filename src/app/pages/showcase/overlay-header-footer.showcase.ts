import { Component, signal } from '@angular/core';
import {
  OverlayHeaderComponent,
  OverlayFooterComponent,
  ButtonComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { OverlayHeaderFooterPlayground } from './overlay-header-footer-playground';

const SURFACE_STYLE =
  'width: 100%; max-width: 32rem; border: 1px solid var(--color-border-neutral-subtle, #e2e2e2); border-radius: var(--border-radius-md, 8px); overflow: hidden;';

@Component({
  selector: 'app-overlay-header-footer-showcase',
  standalone: true,
  imports: [OverlayHeaderComponent,
    OverlayFooterComponent,
    ButtonComponent,
    ExampleBlock,
    ShowcaseHeader,
    OverlayHeaderFooterPlayground, ComponentReference],
  template: `
    <app-showcase-header
      title="Overlay Header & Footer"
      selector="cwr-overlay-header · cwr-overlay-footer"
    ></app-showcase-header>

    <app-overlay-header-footer-playground></app-overlay-header-footer-playground>
    <p>
      <code>cwr-overlay-header</code> and <code>cwr-overlay-footer</code> are the building blocks
      <code>cwr-modal</code>, <code>cwr-dialog</code>, and <code>cwr-drawer</code> compose
      internally. Use them directly only when building a custom overlay surface that isn't one of
      those three.
    </p>

    <app-example-block title="Header — row direction" [code]="rowCode">
      <div [style]="surfaceStyle">
        <cwr-overlay-header
          title="Verify your identity"
          introText="We need a couple of documents to confirm who you are."
          illustration="illustration.document.awaiting-verification"
          (dismiss)="onDismiss()"
        ></cwr-overlay-header>
      </div>
    </app-example-block>

    <app-example-block title="Header — column direction" [code]="columnCode">
      <div [style]="surfaceStyle">
        <cwr-overlay-header
          title="Document expired"
          introText="Renew this document to keep your verification active."
          illustration="illustration.document.expired"
          direction="column"
          (dismiss)="onDismiss()"
        ></cwr-overlay-header>
      </div>
    </app-example-block>

    <app-example-block title="Footer justify content" [code]="footerCode">
      <div [style]="surfaceStyle">
        <cwr-overlay-footer justifyContent="space-between">
          <span overlayFooterLeading>
            <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel"></cwr-button>
          </span>
          <span overlayFooterTrailing>
            <cwr-button variant="solid" intent="brand" size="sm" label="Confirm"></cwr-button>
          </span>
        </cwr-overlay-footer>
      </div>
    </app-example-block>

    <app-component-reference selector="cwr-overlay-header · cwr-overlay-footer"></app-component-reference>
  `,
})
export class OverlayHeaderFooterShowcase {
  surfaceStyle = SURFACE_STYLE;
  dismissed = signal(false);

  onDismiss(): void {
    this.dismissed.set(true);
  }

  rowCode = `<cwr-overlay-header
  title="Verify your identity"
  introText="We need a couple of documents to confirm who you are."
  illustration="illustration.document.awaiting-verification"
  (dismiss)="onDismiss()"
></cwr-overlay-header>`;

  columnCode = `<cwr-overlay-header
  title="Document expired"
  introText="Renew this document to keep your verification active."
  illustration="illustration.document.expired"
  direction="column"
  (dismiss)="onDismiss()"
></cwr-overlay-header>`;

  footerCode = `<cwr-overlay-footer justifyContent="space-between">
  <span overlayFooterLeading>
    <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel"></cwr-button>
  </span>
  <span overlayFooterTrailing>
    <cwr-button variant="solid" intent="brand" size="sm" label="Confirm"></cwr-button>
  </span>
</cwr-overlay-footer>`;
}
