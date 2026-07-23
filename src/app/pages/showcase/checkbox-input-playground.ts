import { Component, computed, signal } from '@angular/core';
import { CheckboxInputComponent, CheckboxInputState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares CheckboxInputState as a plain string literal union,
// not a readonly array const, so the option list is hardcoded here to match the union.
const STATES: readonly CheckboxInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-checkbox-input-playground',
  standalone: true,
  imports: [CheckboxInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-checkbox-input
        playground-preview
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        [state]="state()"
        aria-label="Select row"
      ></cwr-checkbox-input>

      <ng-container playground-controls>
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
            [checked]="checked()"
            (change)="checked.set($any($event.target).checked)"
          />
          Checked
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="indeterminate()"
            (change)="indeterminate.set($any($event.target).checked)"
          />
          Indeterminate
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="disabled()"
            (change)="disabled.set($any($event.target).checked)"
          />
          Disabled
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
export class CheckboxInputPlayground {
  states = STATES;

  checked = signal(false);
  indeterminate = signal(false);
  disabled = signal(false);
  state = signal<CheckboxInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`aria-label="Select row"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.indeterminate()) attrs.push(`[indeterminate]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-checkbox-input ${attrs.join(' ')} (checkedChange)="checked = $event"></cwr-checkbox-input>`;
  });
}
