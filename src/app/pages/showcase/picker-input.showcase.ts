import { Component, signal } from '@angular/core';
import { PickerInputComponent, PickerInputOption } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { PickerInputPlayground } from './picker-input-playground';

const FREQUENCY_OPTIONS: PickerInputOption[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnightly', value: 'fortnightly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annually', value: 'annually' },
];

@Component({
  selector: 'app-picker-input-showcase',
  standalone: true,
  imports: [PickerInputComponent, ExampleBlock, ShowcaseHeader, PickerInputPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Picker Input" selector="cwr-picker-input"></app-showcase-header>

    <app-picker-input-playground></app-picker-input-playground>
    <p>
      <code>cwr-picker-input</code> looks and behaves like a styled native
      <code>&lt;select&gt;</code>: click to open a <code>cwr-listbox</code> of fixed options and
      pick one, without a search box. Use <code>cwr-select-input</code> instead when the option
      list is long enough to need filtering.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-picker-input
        [options]="frequencyOptions"
        [value]="frequency()"
        (valueChange)="frequency.set($event)"
        style="width: 100%; max-width: 20rem;"
      ></cwr-picker-input>
    </app-example-block>

    <app-example-block title="Allow clearing" [code]="allowEmptyCode">
      <cwr-picker-input
        [options]="frequencyOptions"
        [allowEmptyValue]="true"
        placeholderText="No preference"
        style="width: 100%; max-width: 20rem;"
      ></cwr-picker-input>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-picker-input
        [options]="frequencyOptions"
        state="error"
        style="width: 100%; max-width: 20rem;"
      ></cwr-picker-input>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-picker-input
        [options]="frequencyOptions"
        [value]="'monthly'"
        [disabled]="true"
        style="width: 100%; max-width: 20rem;"
      ></cwr-picker-input>
    </app-example-block>

    <app-component-reference selector="cwr-picker-input"></app-component-reference>
  `,
})
export class PickerInputShowcase {
  frequencyOptions = FREQUENCY_OPTIONS;
  frequency = signal<string | null>('monthly');

  basicCode = `<cwr-picker-input
  [options]="frequencyOptions"
  [value]="frequency()"
  (valueChange)="frequency.set($event)"
></cwr-picker-input>`;

  allowEmptyCode = `<cwr-picker-input
  [options]="frequencyOptions"
  [allowEmptyValue]="true"
  placeholderText="No preference"
></cwr-picker-input>`;

  errorCode = `<cwr-picker-input [options]="frequencyOptions" state="error"></cwr-picker-input>`;

  disabledCode = `<cwr-picker-input [options]="frequencyOptions" [value]="'monthly'" [disabled]="true"></cwr-picker-input>`;
}
