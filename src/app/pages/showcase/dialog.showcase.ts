import { Component, signal } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { DialogPlayground } from './dialog-playground';

@Component({
  selector: 'app-dialog-showcase',
  standalone: true,
  imports: [DialogComponent, ButtonComponent, ExampleBlock, ShowcaseHeader, DialogPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Dialog" selector="cwr-dialog"></app-showcase-header>

    <app-dialog-playground></app-dialog-playground>
    <p>
      <code>cwr-dialog</code> is a fixed-width, centered overlay for a single focused message —
      typically an illustration, a title, and an intro, with actions in the footer. Unlike
      <code>cwr-modal</code>, it has no <code>size</code> input and its header can stack the
      illustration above the title with <code>headerDirection="column"</code>. Reach for
      <code>cwr-modal</code> instead when the body needs to hold arbitrary content like a form or
      table.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-button
        variant="solid"
        intent="brand"
        size="sm"
        label="Verify identity"
        (buttonClick)="basicOpen.set(true)"
      ></cwr-button>
      @if (basicOpen()) {
        <cwr-dialog
          title="Verify your identity"
          introText="We need a couple of documents to confirm who you are."
          illustration="illustration.document.awaiting-verification"
          headerDirection="column"
          (dismiss)="basicOpen.set(false)"
        >
          <p>Upload a passport or driver's licence to continue.</p>
          <span overlayFooterTrailing>
            <cwr-button
              variant="ghost"
              intent="neutral"
              size="sm"
              label="Not now"
              (buttonClick)="basicOpen.set(false)"
            ></cwr-button>
            <cwr-button
              variant="solid"
              intent="brand"
              size="sm"
              label="Get started"
              (buttonClick)="basicOpen.set(false)"
            ></cwr-button>
          </span>
        </cwr-dialog>
      }
    </app-example-block>

    <app-example-block title="Row header direction" [code]="rowCode">
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="Open row-header dialog"
        (buttonClick)="rowOpen.set(true)"
      ></cwr-button>
      @if (rowOpen()) {
        <cwr-dialog
          title="Document expired"
          introText="Renew this document to keep your verification active."
          illustration="illustration.document.expired"
          (dismiss)="rowOpen.set(false)"
        >
          <p>Documents expire two years after they're issued.</p>
        </cwr-dialog>
      }
    </app-example-block>

    <app-component-reference selector="cwr-dialog"></app-component-reference>
  `,
})
export class DialogShowcase {
  basicOpen = signal(false);
  rowOpen = signal(false);

  basicCode = `<cwr-button label="Verify identity" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-dialog
    title="Verify your identity"
    introText="We need a couple of documents to confirm who you are."
    illustration="illustration.document.awaiting-verification"
    headerDirection="column"
    (dismiss)="open.set(false)"
  >
    <p>Upload a passport or driver's licence to continue.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="ghost" intent="neutral" size="sm" label="Not now" (buttonClick)="open.set(false)"></cwr-button>
      <cwr-button variant="solid" intent="brand" size="sm" label="Get started" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-dialog>
}`;

  rowCode = `@if (open()) {
  <cwr-dialog
    title="Document expired"
    introText="Renew this document to keep your verification active."
    illustration="illustration.document.expired"
    (dismiss)="open.set(false)"
  >
    <p>Documents expire two years after they're issued.</p>
  </cwr-dialog>
}`;
}
