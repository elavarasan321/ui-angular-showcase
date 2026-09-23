import { Component, signal } from '@angular/core';
import {
  MenuButtonComponent,
  MenuComponent,
  IconButtonComponent,
  InlineButtonComponent,
  CwrMenuItem,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { MenuButtonPlayground } from './menu-button-playground';

const ROW_MENU_ITEMS: CwrMenuItem[] = [
  { id: 'edit', label: 'Edit', leadingIcon: 'icon.ui.edit' },
  { id: 'duplicate', label: 'Duplicate', leadingIcon: 'icon.ui.upload' },
  { id: 'divider-1', isDivider: true },
  { id: 'delete', label: 'Delete', leadingIcon: 'icon.ui.delete', isDestructive: true },
];

@Component({
  selector: 'app-menu-button-showcase',
  standalone: true,
  imports: [
    MenuButtonComponent,
    MenuComponent,
    IconButtonComponent,
    InlineButtonComponent,
    ExampleBlock,
    ShowcaseHeader,
    MenuButtonPlayground,
  ],
  template: `
    <app-showcase-header title="Menu Button" selector="cwr-menu · cwr-menu-button"></app-showcase-header>

    <app-menu-button-playground></app-menu-button-playground>
    <p>
      <code>cwr-menu-button</code> shows and hides a popup on click, and manages focus and
      keyboard navigation between its trigger and the content projected into
      <code>[slot=slot]</code> — almost always a <code>cwr-menu</code>. Project the trigger into
      <code>[slot=button]</code>: a <code>cwr-button</code>, <code>cwr-icon-button</code>, or
      <code>cwr-inline-button</code> all work. The projected menu needs a template reference
      named <code>#slotFocus</code> and an <code>aria-haspopup="menu"</code> attribute so the
      button can manage focus and accessibility correctly.
    </p>

    <app-example-block title="Icon button trigger" [code]="iconTriggerCode">
      <cwr-menu-button justify="right">
        <cwr-icon-button slot="button" icon="icon.ui.info" label="Row actions"></cwr-icon-button>
        <cwr-menu
          slot="slot"
          #slotFocus
          aria-haspopup="menu"
          [items]="rowMenuItems"
          (itemSelected)="rowSelection.set($event)"
        />
      </cwr-menu-button>
      @if (rowSelection()) {
        <p style="font: var(--text-style-caption);">Selected: <code>{{ rowSelection() }}</code></p>
      }
    </app-example-block>

    <app-example-block title="Inline button trigger, left justified" [code]="inlineTriggerCode">
      <cwr-menu-button justify="left">
        <cwr-inline-button slot="button" variant="brand">New</cwr-inline-button>
        <cwr-menu slot="slot" #slotFocus aria-haspopup="menu" [items]="newMenuItems" />
      </cwr-menu-button>
    </app-example-block>
  `,
})
export class MenuButtonShowcase {
  rowMenuItems = ROW_MENU_ITEMS;
  newMenuItems: CwrMenuItem[] = [
    { id: 'new-file', label: 'New file', leadingIcon: 'icon.ui.upload' },
    { id: 'new-folder', label: 'New folder', leadingIcon: 'icon.ui.upload' },
  ];

  rowSelection = signal('');

  iconTriggerCode = `<cwr-menu-button justify="right">
  <cwr-icon-button slot="button" icon="icon.ui.info" label="Row actions"></cwr-icon-button>
  <cwr-menu
    slot="slot"
    #slotFocus
    aria-haspopup="menu"
    [items]="rowMenuItems"
    (itemSelected)="onSelect($event)"
  />
</cwr-menu-button>`;

  inlineTriggerCode = `<cwr-menu-button justify="left">
  <cwr-inline-button slot="button" variant="brand">New</cwr-inline-button>
  <cwr-menu slot="slot" #slotFocus aria-haspopup="menu" [items]="newMenuItems" />
</cwr-menu-button>`;
}
