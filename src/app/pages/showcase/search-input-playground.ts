import { Component, computed, signal } from '@angular/core';
import {
  SearchInputComponent,
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
  NumericInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

@Component({
  selector: 'app-search-input-playground',
  standalone: true,
  imports: [SearchInputComponent, Playground, FormFieldComponent, TextInputComponent, CheckboxComponent, NumericInputComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-search-input
        playground-preview
        style="width: 100%; max-width: 20rem;"
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [debounceMs]="debounceMs()"
      ></cwr-search-input>

      <ng-container playground-controls>
        <cwr-form-field label="Placeholder">
          <cwr-text-input
            [value]="placeholder()"
            (valueChange)="placeholder.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Debounce (ms)">
          <cwr-numeric-input
            [value]="debounceMs()"
            (valueChange)="debounceMs.set($event ?? 0)"
          ></cwr-numeric-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class SearchInputPlayground {
  value = signal('');
  placeholder = signal('Search…');
  disabled = signal(false);
  debounceMs = signal(0);

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.debounceMs()) attrs.push(`[debounceMs]="${this.debounceMs()}"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-search-input
  [value]="searchTerm()"
  (valueChange)="searchTerm.set($event)"
  ${attrs.join('\n  ')}
></cwr-search-input>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
