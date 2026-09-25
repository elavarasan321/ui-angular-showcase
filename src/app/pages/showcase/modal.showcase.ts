import { Component, signal } from '@angular/core';
import { ModalComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { ModalPlayground } from './modal-playground';

@Component({
  selector: 'app-modal-showcase',
  standalone: true,
  imports: [ModalComponent, ButtonComponent, ExampleBlock, ShowcaseHeader, ModalPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Modal" selector="cwr-modal"></app-showcase-header>

    <app-modal-playground></app-modal-playground>
    <p>
      <code>cwr-modal</code> is a centered, focus-trapped overlay for a short, self-contained task
      — confirming an action, showing a summary. It composes <code>cwr-overlay-header</code> and
      <code>cwr-overlay-footer</code> internally; project footer buttons with
      <code>overlayFooterLeading</code>/<code>overlayFooterTrailing</code>. Render it with
      <code>&#64;if</code> and toggle a signal to open and close it.
    </p>

    <app-example-block title="Basic confirmation" [code]="basicCode">
      <cwr-button
        variant="solid"
        intent="negative"
        size="sm"
        label="Delete document"
        (buttonClick)="basicOpen.set(true)"
      ></cwr-button>
      @if (basicOpen()) {
        <cwr-modal
          title="Delete this document?"
          introText="This action can't be undone."
          illustration="illustration.document.fail"
          (dismiss)="basicOpen.set(false)"
        >
          <p>The document and any associated verification results will be permanently removed.</p>
          <span overlayFooterTrailing>
            <cwr-button
              variant="ghost"
              intent="neutral"
              size="sm"
              label="Cancel"
              (buttonClick)="basicOpen.set(false)"
            ></cwr-button>
            <cwr-button
              variant="solid"
              intent="negative"
              size="sm"
              label="Delete"
              (buttonClick)="basicOpen.set(false)"
            ></cwr-button>
          </span>
        </cwr-modal>
      }
    </app-example-block>

    <app-example-block title="Larger size" [code]="sizeCode">
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="Open large modal"
        (buttonClick)="largeOpen.set(true)"
      ></cwr-button>
      @if (largeOpen()) {
        <cwr-modal size="lg" title="Verification summary" (dismiss)="largeOpen.set(false)">
          <p>A larger modal for content that needs more room, like a table or a form.</p>
        </cwr-modal>
      }
    </app-example-block>

    <app-example-block title="Non-dismissible" [code]="nonDismissibleCode">
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="Open non-dismissible modal"
        (buttonClick)="lockedOpen.set(true)"
      ></cwr-button>
      @if (lockedOpen()) {
        <cwr-modal
          title="Processing…"
          [dismissible]="false"
          (dismiss)="lockedOpen.set(false)"
        >
          <p>This modal hides its close button and ignores Escape until the task finishes.</p>
          <span overlayFooterTrailing>
            <cwr-button
              variant="solid"
              intent="brand"
              size="sm"
              label="Done"
              (buttonClick)="lockedOpen.set(false)"
            ></cwr-button>
          </span>
        </cwr-modal>
      }
    </app-example-block>

    <app-component-reference selector="cwr-modal"></app-component-reference>
  `,
})
export class ModalShowcase {
  basicOpen = signal(false);
  largeOpen = signal(false);
  lockedOpen = signal(false);

  basicCode = `<cwr-button label="Delete document" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-modal
    title="Delete this document?"
    introText="This action can't be undone."
    illustration="illustration.document.fail"
    (dismiss)="open.set(false)"
  >
    <p>The document and any associated verification results will be permanently removed.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel" (buttonClick)="open.set(false)"></cwr-button>
      <cwr-button variant="solid" intent="negative" size="sm" label="Delete" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-modal>
}`;

  sizeCode = `@if (open()) {
  <cwr-modal size="lg" title="Verification summary" (dismiss)="open.set(false)">
    <p>A larger modal for content that needs more room, like a table or a form.</p>
  </cwr-modal>
}`;

  nonDismissibleCode = `@if (open()) {
  <cwr-modal title="Processing…" [dismissible]="false" (dismiss)="open.set(false)">
    <p>This modal hides its close button and ignores Escape until the task finishes.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="solid" intent="brand" size="sm" label="Done" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-modal>
}`;
}
