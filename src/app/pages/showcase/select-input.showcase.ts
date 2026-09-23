import { Component, computed, signal } from '@angular/core';
import { SelectInputComponent, SelectInputOption } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { SelectInputPlayground } from './select-input-playground';

const COUNTRY_OPTIONS: SelectInputOption[] = [
  { label: 'Afghanistan', value: 'AF' },
  { label: 'Australia', value: 'AU' },
  { label: 'Austria', value: 'AT' },
  { label: 'Bangladesh', value: 'BD' },
  { label: 'Canada', value: 'CA' },
  { label: 'India', value: 'IN' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'United States', value: 'US' },
];

@Component({
  selector: 'app-select-input-showcase',
  standalone: true,
  imports: [SelectInputComponent, ExampleBlock, ShowcaseHeader, SelectInputPlayground],
  template: `
    <app-showcase-header title="Select Input" selector="cwr-select-input"></app-showcase-header>

    <app-select-input-playground></app-select-input-playground>
    <p>
      <code>cwr-select-input</code> is a searchable combobox: it filters its option list as the
      user types. Handle <code>(searchChange)</code> to update <code>[options]</code> — locally,
      as shown below, or from a server request — and <code>(valueChange)</code> to read the
      selected value.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-select-input
        [options]="filteredOptions()"
        [value]="country()"
        (valueChange)="country.set($event)"
        (searchChange)="searchTerm.set($event)"
        style="width: 100%; max-width: 20rem;"
      ></cwr-select-input>
    </app-example-block>

    <app-example-block title="Loading" [code]="loadingCode">
      <cwr-select-input
        [options]="[]"
        [loading]="true"
        style="width: 100%; max-width: 20rem;"
      ></cwr-select-input>
    </app-example-block>

    <app-example-block title="No results / error" [code]="errorCode">
      <cwr-select-input
        [options]="[]"
        emptyResultsText="No countries match 'zzz'"
        style="width: 100%; max-width: 20rem;"
      ></cwr-select-input>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-select-input
        [options]="filteredOptions()"
        [disabled]="true"
        style="width: 100%; max-width: 20rem;"
      ></cwr-select-input>
    </app-example-block>
  `,
})
export class SelectInputShowcase {
  country = signal<string | null>('AU');
  searchTerm = signal('');

  filteredOptions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter((o) => o.label.toLowerCase().includes(term));
  });

  basicCode = `<cwr-select-input
  [options]="filteredOptions()"
  [value]="country()"
  (valueChange)="country.set($event)"
  (searchChange)="searchTerm.set($event)"
></cwr-select-input>`;

  loadingCode = `<cwr-select-input [options]="[]" [loading]="true"></cwr-select-input>`;

  errorCode = `<cwr-select-input [options]="[]" emptyResultsText="No countries match 'zzz'"></cwr-select-input>`;

  disabledCode = `<cwr-select-input [options]="filteredOptions()" [disabled]="true"></cwr-select-input>`;
}
