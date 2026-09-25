import { Component, signal } from '@angular/core';
import { TabBarComponent, TabBarItem } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { TabBarPlayground } from './tab-bar-playground';

const BASIC_TABS: TabBarItem[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'documents', label: 'Documents' },
  { value: 'history', label: 'History' },
];

const ICON_TABS: TabBarItem[] = [
  { value: 'overview', label: 'Overview', icon: 'icon.ui.info' },
  { value: 'documents', label: 'Documents', icon: 'icon.ui.upload', badge: 3 },
  { value: 'history', label: 'History', icon: 'icon.ui.search' },
];

const DISABLED_TABS: TabBarItem[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'documents', label: 'Documents' },
  { value: 'history', label: 'History', disabled: true },
];

@Component({
  selector: 'app-tab-bar-showcase',
  standalone: true,
  imports: [TabBarComponent, ExampleBlock, ShowcaseHeader, TabBarPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Tab Bar" selector="cwr-tab-bar"></app-showcase-header>

    <app-tab-bar-playground></app-tab-bar-playground>
    <p>
      <code>cwr-tab-bar</code> renders a horizontally scrollable, drag-to-scroll set of tabs.
      Drive it with an <code>items</code> array and a <code>checkedValue</code>; each item can
      carry a leading icon and a <code>cwr-badge</code>.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-tab-bar
        [items]="basicTabs"
        [checkedValue]="basicValue()"
        (checkedValueChange)="basicValue.set($event)"
        style="width: 100%;"
      ></cwr-tab-bar>
    </app-example-block>

    <app-example-block title="With icons & badge" [code]="iconCode">
      <cwr-tab-bar
        [items]="iconTabs"
        [checkedValue]="iconValue()"
        (checkedValueChange)="iconValue.set($event)"
        style="width: 100%;"
      ></cwr-tab-bar>
    </app-example-block>

    <app-example-block title="Disabled tab" [code]="disabledCode">
      <cwr-tab-bar
        [items]="disabledTabs"
        [checkedValue]="disabledValue()"
        (checkedValueChange)="disabledValue.set($event)"
        style="width: 100%;"
      ></cwr-tab-bar>
    </app-example-block>

    <app-component-reference selector="cwr-tab-bar"></app-component-reference>
  `,
})
export class TabBarShowcase {
  basicTabs = BASIC_TABS;
  iconTabs = ICON_TABS;
  disabledTabs = DISABLED_TABS;

  basicValue = signal('overview');
  iconValue = signal('documents');
  disabledValue = signal('overview');

  basicCode = `<cwr-tab-bar
  [items]="basicTabs"
  [checkedValue]="basicValue()"
  (checkedValueChange)="basicValue.set($event)"
></cwr-tab-bar>`;

  iconCode = `<cwr-tab-bar
  [items]="iconTabs"
  [checkedValue]="iconValue()"
  (checkedValueChange)="iconValue.set($event)"
></cwr-tab-bar>`;

  disabledCode = `<cwr-tab-bar
  [items]="disabledTabs"
  [checkedValue]="disabledValue()"
  (checkedValueChange)="disabledValue.set($event)"
></cwr-tab-bar>`;
}
