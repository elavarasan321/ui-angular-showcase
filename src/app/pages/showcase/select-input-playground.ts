import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  SelectInputComponent,
  SelectInputOption,
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

const ALL_OPTIONS: SelectInputOption[] = [
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
  selector: 'app-select-input-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectInputComponent, Playground, FormFieldComponent, TextInputComponent, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-select-input
        playground-preview
        style="width: 100%; max-width: 20rem;"
        [options]="filteredOptions()"
        [value]="value()"
        (valueChange)="value.set($event)"
        (searchChange)="searchTerm.set($event)"
        [placeholderText]="placeholderText()"
        [allowEmptyValue]="allowEmptyValue()"
        [loading]="loading()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
      ></cwr-select-input>

      <ng-container playground-controls>
        <cwr-form-field label="Placeholder">
          <cwr-text-input
            [value]="placeholderText()"
            (valueChange)="placeholderText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Allow empty value"
          [checked]="allowEmptyValue()"
          (checkedChange)="allowEmptyValue.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Loading"
          [checked]="loading()"
          (checkedChange)="loading.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Read only"
          [checked]="readOnly()"
          (checkedChange)="readOnly.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class SelectInputPlayground {
  value = signal<string | null>('AU');
  placeholderText = signal('Search & select');
  allowEmptyValue = signal(false);
  loading = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  searchTerm = signal('');

  filteredOptions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return ALL_OPTIONS;
    return ALL_OPTIONS.filter((o) => o.label.toLowerCase().includes(term));
  });

  generatedCode = computed(() => {
    const attrs = [`placeholderText="${this.placeholderText()}"`];
    if (this.allowEmptyValue()) attrs.push(`[allowEmptyValue]="true"`);
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);

    return `<cwr-select-input
  [options]="countryOptions()"
  [value]="country()"
  (valueChange)="country.set($event)"
  (searchChange)="onSearch($event)"
  ${attrs.join('\n  ')}
></cwr-select-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
