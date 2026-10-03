import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonComponent,
  ListboxComponent,
  ListboxGroup,
  PopupComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { PopupPlayground } from './popup-playground';

const LISTBOX_GROUPS: ListboxGroup[] = [
  {
    options: ['Australia', 'New Zealand', 'United Kingdom'].map((label) => ({
      id: label,
      label,
      value: label,
    })),
  },
];

@Component({
  selector: 'app-popup-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PopupComponent,
    ButtonComponent,
    ListboxComponent,
    ExampleBlock,
    ShowcaseHeader,
    PopupPlayground,
    ComponentReference,
  ],
  template: `
    <app-showcase-header title="Popup" selector="cwr-popup"></app-showcase-header>
    <app-popup-playground></app-popup-playground>
    <p>
      <code>cwr-popup</code> is the container for anything that pops up from a trigger — a menu, a
      listbox, a status message. Its parent element is the anchor and must be its positioning
      context (<code>position: relative</code>). It opens on the preferred side and edge, and flips
      when the viewport or a clipping ancestor leaves too little room, unless
      <code>placementFixed</code> / <code>alignFixed</code> pin it. Open/close state, keyboard
      handling and focus stay with the component that owns the trigger.
      <code>cwr-menu-button</code>, <code>cwr-select-input</code> and
      <code>cwr-picker-input</code> all render through it.
    </p>

    <app-example-block title="Trigger width" [code]="triggerWidthCode">
      <div class="popup-showcase__stage">
        <div class="popup-showcase__anchor">
          <cwr-button variant="outline" intent="neutral" label="Country"></cwr-button>
          <cwr-popup width="trigger">
            <cwr-listbox [groups]="groups" [showHeader]="false" [showFooter]="false"></cwr-listbox>
          </cwr-popup>
        </div>
      </div>
    </app-example-block>

    <app-example-block title="Above, aligned to the end" [code]="aboveEndCode">
      <div class="popup-showcase__stage popup-showcase__stage--above">
        <div class="popup-showcase__anchor">
          <cwr-button variant="outline" intent="neutral" label="Country"></cwr-button>
          <cwr-popup placement="above" align="end" [placementFixed]="true" [alignFixed]="true">
            <cwr-listbox [groups]="groups" [showHeader]="false" [showFooter]="false"></cwr-listbox>
          </cwr-popup>
        </div>
      </div>
    </app-example-block>

    <app-component-reference selector="cwr-popup"></app-component-reference>
  `,
  styles: [
    `
      .popup-showcase__stage {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-bottom: 11rem;
      }

      .popup-showcase__stage--above {
        padding-top: 11rem;
        padding-bottom: 0;
      }

      .popup-showcase__anchor {
        position: relative;
        width: 16rem;
      }

      .popup-showcase__anchor cwr-button {
        display: block;
      }
    `,
  ],
})
export class PopupShowcase {
  groups = LISTBOX_GROUPS;

  triggerWidthCode = `<div style="position: relative; width: 16rem">
  <cwr-button variant="outline" intent="neutral" label="Country"></cwr-button>
  <cwr-popup width="trigger">
    <cwr-listbox [groups]="groups" [showHeader]="false" [showFooter]="false"></cwr-listbox>
  </cwr-popup>
</div>`;

  aboveEndCode = `<div style="position: relative">
  <cwr-button variant="outline" intent="neutral" label="Country"></cwr-button>
  <cwr-popup placement="above" align="end" [placementFixed]="true" [alignFixed]="true">
    <cwr-listbox [groups]="groups" [showHeader]="false" [showFooter]="false"></cwr-listbox>
  </cwr-popup>
</div>`;
}
