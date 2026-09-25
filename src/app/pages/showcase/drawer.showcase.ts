import { Component, signal } from '@angular/core';
import { DrawerComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { DrawerPlayground } from './drawer-playground';

@Component({
  selector: 'app-drawer-showcase',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent, ExampleBlock, ShowcaseHeader, DrawerPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Drawer" selector="cwr-drawer"></app-showcase-header>

    <app-drawer-playground></app-drawer-playground>
    <p>
      <code>cwr-drawer</code> slides in from the right edge of the screen — a focus-trapped
      overlay for a longer task, like editing a record, without leaving the current page context.
      It composes the same <code>cwr-overlay-header</code>/<code>cwr-overlay-footer</code> as
      <code>cwr-modal</code> and <code>cwr-dialog</code>.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-button
        variant="solid"
        intent="brand"
        size="sm"
        label="Edit applicant"
        (buttonClick)="basicOpen.set(true)"
      ></cwr-button>
      @if (basicOpen()) {
        <cwr-drawer title="Edit applicant details" (dismiss)="basicOpen.set(false)">
          <p>Form fields for editing the applicant's details would go here.</p>
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
              intent="brand"
              size="sm"
              label="Save changes"
              (buttonClick)="basicOpen.set(false)"
            ></cwr-button>
          </span>
        </cwr-drawer>
      }
    </app-example-block>

    <app-example-block title="With intro text" [code]="introCode">
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="View history"
        (buttonClick)="introOpen.set(true)"
      ></cwr-button>
      @if (introOpen()) {
        <cwr-drawer
          title="Verification history"
          introText="A record of every check we've run for this applicant."
          (dismiss)="introOpen.set(false)"
        >
          <p>Timeline of verification events would go here.</p>
        </cwr-drawer>
      }
    </app-example-block>

    <app-component-reference selector="cwr-drawer"></app-component-reference>
  `,
})
export class DrawerShowcase {
  basicOpen = signal(false);
  introOpen = signal(false);

  basicCode = `<cwr-button label="Edit applicant" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-drawer title="Edit applicant details" (dismiss)="open.set(false)">
    <p>Form fields for editing the applicant's details would go here.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel" (buttonClick)="open.set(false)"></cwr-button>
      <cwr-button variant="solid" intent="brand" size="sm" label="Save changes" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-drawer>
}`;

  introCode = `@if (open()) {
  <cwr-drawer
    title="Verification history"
    introText="A record of every check we've run for this applicant."
    (dismiss)="open.set(false)"
  >
    <p>Timeline of verification events would go here.</p>
  </cwr-drawer>
}`;
}
