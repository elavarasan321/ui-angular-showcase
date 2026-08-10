import { Component, computed, signal } from '@angular/core';
import { PercentInputComponent, PercentInputState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// PercentInputState (InputState) is exported as a plain string literal union, not a readonly
// array const, so the option list is hardcoded here to match the union.
const STATES: readonly PercentInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-percent-input-playground',
  standalone: true,
  imports: [PercentInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-percent-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [limitDecimals]="limitDecimals()"
        [decimals]="decimals()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-percent-input>

      <ng-container playground-controls>
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
            [checked]="limitDecimals()"
            (change)="limitDecimals.set($any($event.target).checked)"
          />
          Limit decimals
        </label>

        @if (limitDecimals()) {
          <label class="playground__field">
            <span>Decimals</span>
            <input
              type="number"
              min="0"
              [value]="decimals()"
              (input)="decimals.set($any($event.target).valueAsNumber || 0)"
            />
          </label>
        }

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
      .playground__field input[type='text'],
      .playground__field input[type='number'] {
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
export class PercentInputPlayground {
  states = STATES;

  value = signal<number | null>(null);
  placeholder = signal('0.00');
  limitDecimals = signal(false);
  decimals = signal(2);
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<PercentInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.limitDecimals()) {
      attrs.push(`[limitDecimals]="true"`);
      attrs.push(`[decimals]="${this.decimals()}"`);
    }
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-percent-input ${attrs.join(' ')}></cwr-percent-input>`;
  });
}
