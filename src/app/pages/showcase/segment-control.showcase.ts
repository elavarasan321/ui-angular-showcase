import { Component, signal } from '@angular/core';
import { SegmentControlComponent, SegmentControlItem } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { SegmentControlPlayground } from './segment-control-playground';

@Component({
  selector: 'app-segment-control-showcase',
  standalone: true,
  imports: [SegmentControlComponent, ExampleBlock, ShowcaseHeader, SegmentControlPlayground],
  template: `
    <app-showcase-header
      title="Segment Control"
      selector="cwr-segment-control"
    ></app-showcase-header>

    <app-segment-control-playground></app-segment-control-playground>

    <app-example-block title="Icon and text (default)" [code]="iconAndTextCode">
      <cwr-segment-control
        [items]="viewItems"
        [checkedValue]="viewMode()"
        (checkedValueChange)="viewMode.set($event)"
      ></cwr-segment-control>
      <span>Selected: {{ viewMode() }}</span>
    </app-example-block>

    <app-example-block title="Text only" [code]="textOnlyCode">
      <cwr-segment-control
        [items]="planItems"
        variant="text-only"
        [checkedValue]="plan()"
        (checkedValueChange)="plan.set($event)"
      ></cwr-segment-control>
    </app-example-block>

    <app-example-block title="Icon only" [code]="iconOnlyCode">
      <cwr-segment-control
        [items]="viewItems"
        variant="icon-only"
        [checkedValue]="viewMode()"
        (checkedValueChange)="viewMode.set($event)"
      ></cwr-segment-control>
    </app-example-block>

    <app-example-block title="Badge & disabled items" [code]="badgeCode">
      <cwr-segment-control
        [items]="inboxItems"
        [checkedValue]="inbox()"
        (checkedValueChange)="inbox.set($event)"
      ></cwr-segment-control>
    </app-example-block>
  `,
})
export class SegmentControlShowcase {
  viewItems: SegmentControlItem[] = [
    { value: 'list', label: 'List', icon: 'icon.ui.list-view', ariaLabel: 'List view' },
    { value: 'grid', label: 'Grid', icon: 'icon.ui.card-view', ariaLabel: 'Grid view' },
    { value: 'table', label: 'Table', icon: 'icon.ui.table-layout', ariaLabel: 'Table view' },
  ];
  viewMode = signal('list');

  planItems: SegmentControlItem[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  plan = signal('monthly');

  inboxItems: SegmentControlItem[] = [
    { value: 'inbox', label: 'Inbox', icon: 'icon.ui.email', badge: 4 },
    { value: 'sent', label: 'Sent', icon: 'icon.ui.email-sent' },
    { value: 'archive', label: 'Archive', icon: 'icon.ui.archive', disabled: true },
  ];
  inbox = signal('inbox');

  iconAndTextCode = `<cwr-segment-control
  [items]="[
    { value: 'list', label: 'List', icon: 'icon.ui.list-view' },
    { value: 'grid', label: 'Grid', icon: 'icon.ui.card-view' },
    { value: 'table', label: 'Table', icon: 'icon.ui.table-layout' }
  ]"
  [checkedValue]="viewMode()"
  (checkedValueChange)="viewMode.set($event)"
></cwr-segment-control>`;

  textOnlyCode = `<cwr-segment-control
  [items]="[
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ]"
  variant="text-only"
  [checkedValue]="plan()"
  (checkedValueChange)="plan.set($event)"
></cwr-segment-control>`;

  iconOnlyCode = `<cwr-segment-control
  [items]="[
    { value: 'list', icon: 'icon.ui.list-view', ariaLabel: 'List view' },
    { value: 'grid', icon: 'icon.ui.card-view', ariaLabel: 'Grid view' },
    { value: 'table', icon: 'icon.ui.table-layout', ariaLabel: 'Table view' }
  ]"
  variant="icon-only"
  [checkedValue]="viewMode()"
  (checkedValueChange)="viewMode.set($event)"
></cwr-segment-control>`;

  badgeCode = `<cwr-segment-control
  [items]="[
    { value: 'inbox', label: 'Inbox', icon: 'icon.ui.email', badge: 4 },
    { value: 'sent', label: 'Sent', icon: 'icon.ui.email-sent' },
    { value: 'archive', label: 'Archive', icon: 'icon.ui.archive', disabled: true }
  ]"
  [checkedValue]="inbox()"
  (checkedValueChange)="inbox.set($event)"
></cwr-segment-control>`;
}
