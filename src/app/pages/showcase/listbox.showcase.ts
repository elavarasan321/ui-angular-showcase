import { Component, signal } from '@angular/core';
import { ListboxComponent, ListboxGroup, ListboxOptionData } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ListboxPlayground } from './listbox-playground';

@Component({
  selector: 'app-listbox-showcase',
  standalone: true,
  imports: [ListboxComponent, ExampleBlock, ShowcaseHeader, ListboxPlayground],
  template: `
    <app-showcase-header title="Listbox" selector="cwr-listbox"></app-showcase-header>

    <app-listbox-playground></app-listbox-playground>

    <app-example-block title="Basic groups & search" [code]="basicCode">
      <cwr-listbox
        [groups]="countryGroups"
        [searchValue]="query()"
        (searchValueChange)="query.set($event)"
        (optionClick)="onCountrySelect($event)"
      ></cwr-listbox>
      <span>Selected: {{ selectedCountry() }}</span>
    </app-example-block>

    <app-example-block title="Checkable options" [code]="checkableCode">
      <cwr-listbox [groups]="checkGroups" [showFooter]="false"></cwr-listbox>
    </app-example-block>

    <app-example-block title="No header, footer action" [code]="footerCode">
      <cwr-listbox
        [groups]="simpleGroups"
        [showHeader]="false"
        footerLabel="Manage locations"
        footerLeadingIcon="icon.ui.add"
        (footerActionClicked)="onManageLocations()"
      ></cwr-listbox>
    </app-example-block>

    <app-example-block title="Scrollable & focused" [code]="scrollCode">
      <cwr-listbox
        [groups]="longGroups"
        [allowVerticalScrolling]="true"
        [hasFocus]="true"
        [showFooter]="false"
      ></cwr-listbox>
    </app-example-block>
  `,
})
export class ListboxShowcase {
  query = signal('');
  selectedCountry = signal('none yet');

  countryGroups: ListboxGroup[] = [
    {
      options: [
        { id: 'au', label: 'Australia', value: 'au' },
        { id: 'nz', label: 'New Zealand', value: 'nz' },
        { id: 'us', label: 'United States', value: 'us' },
      ],
    },
  ];

  checkGroups: ListboxGroup[] = [
    {
      label: 'Check types',
      options: [
        { id: 'police', label: 'Police check', showCheckbox: true, checked: true },
        { id: 'ref', label: 'Reference check', showCheckbox: true, checked: false },
        { id: 'rtw', label: 'Right to work', showCheckbox: true, checked: false },
      ],
    },
  ];

  simpleGroups: ListboxGroup[] = [
    {
      options: [
        { id: 'syd', label: 'Sydney', leadingIcon: 'icon.ui.location' },
        { id: 'mel', label: 'Melbourne', leadingIcon: 'icon.ui.location' },
      ],
    },
  ];

  longGroups: ListboxGroup[] = [
    {
      label: 'A–M',
      options: [
        { id: 'au', label: 'Australia' },
        { id: 'ca', label: 'Canada' },
        { id: 'de', label: 'Germany' },
        { id: 'fr', label: 'France' },
        { id: 'in', label: 'India' },
        { id: 'jp', label: 'Japan' },
      ],
    },
    {
      label: 'N–Z',
      options: [
        { id: 'nz', label: 'New Zealand' },
        { id: 'sg', label: 'Singapore' },
        { id: 'uk', label: 'United Kingdom' },
        { id: 'us', label: 'United States' },
      ],
    },
  ];

  onCountrySelect(option: ListboxOptionData): void {
    this.selectedCountry.set(option.label);
  }

  onManageLocations(): void {
    // Handle the footer action, e.g. open a "manage locations" dialog.
  }

  basicCode = `<cwr-listbox
  [groups]="[{ options: [
    { id: 'au', label: 'Australia', value: 'au' },
    { id: 'nz', label: 'New Zealand', value: 'nz' },
    { id: 'us', label: 'United States', value: 'us' }
  ] }]"
  [searchValue]="query()"
  (searchValueChange)="query.set($event)"
  (optionClick)="onCountrySelect($event)"
></cwr-listbox>`;

  checkableCode = `<cwr-listbox
  [groups]="[{ label: 'Check types', options: [
    { id: 'police', label: 'Police check', showCheckbox: true, checked: true },
    { id: 'ref', label: 'Reference check', showCheckbox: true, checked: false },
    { id: 'rtw', label: 'Right to work', showCheckbox: true, checked: false }
  ] }]"
  [showFooter]="false"
></cwr-listbox>`;

  footerCode = `<cwr-listbox
  [groups]="[{ options: [
    { id: 'syd', label: 'Sydney', leadingIcon: 'icon.ui.location' },
    { id: 'mel', label: 'Melbourne', leadingIcon: 'icon.ui.location' }
  ] }]"
  [showHeader]="false"
  footerLabel="Manage locations"
  footerLeadingIcon="icon.ui.add"
  (footerActionClicked)="onManageLocations()"
></cwr-listbox>`;

  scrollCode = `<cwr-listbox
  [groups]="longGroups"
  [allowVerticalScrolling]="true"
  [hasFocus]="true"
  [showFooter]="false"
></cwr-listbox>`;
}
