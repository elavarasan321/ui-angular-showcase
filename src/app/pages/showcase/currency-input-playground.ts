import { Component, computed, signal } from '@angular/core';
import { CurrencyInputComponent, CurrencyInputState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// CurrencyInputState (InputState) is exported as a plain string literal union, not a readonly
// array const, so the option list is hardcoded here to match the union.
const STATES: readonly CurrencyInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-currency-input-playground',
  standalone: true,
  imports: [CurrencyInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-currency-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [currencySymbol]="currencySymbol()"
        [placeholder]="placeholder()"
        [allowDecimals]="allowDecimals()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-currency-input>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Currency symbol</span>
          <input
            type="text"
            [value]="currencySymbol()"
            (input)="currencySymbol.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Placeholder</span>
          <input
            type="text"
            [value]="placeholder()"
            (input)="placeholder.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>State</span>
          <select (change)="state.set($any($event.target).value)">
            @for (s of states; track s) {
              <option [value]="s" [selected]="s === state()">{{ s }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="allowDecimals()"
            (change)="allowDecimals.set($any($event.target).checked)"
          />
          Allow decimals
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="required()"
            (change)="required.set($any($event.target).checked)"
          />
          Required
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="disabled()"
            (change)="disabled.set($any($event.target).checked)"
          />
          Disabled
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="readOnly()"
            (change)="readOnly.set($any($event.target).checked)"
          />
          Read only
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select,
      .playground__field input[type='text'] {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }

      .playground__checkbox {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        font: var(--text-style-body);
        color: var(--color-text-surface);
      }
    `,
  ],
})
export class CurrencyInputPlayground {
  states = STATES;

  value = signal<number | null>(null);
  currencySymbol = signal('$');
  placeholder = signal('0.00');
  allowDecimals = signal(true);
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<CurrencyInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [
      `currencySymbol="${this.currencySymbol()}"`,
      `placeholder="${this.placeholder()}"`,
    ];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (!this.allowDecimals()) attrs.push(`[allowDecimals]="false"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-currency-input ${attrs.join(' ')}></cwr-currency-input>`;
  });
}
