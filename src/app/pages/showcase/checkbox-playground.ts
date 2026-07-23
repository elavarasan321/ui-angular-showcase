import { Component, computed, signal } from '@angular/core';
import { CheckboxComponent, CheckboxState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 doesn't export a CHECKBOX_STATES-style runtime const, so
// the option list is hardcoded here to match CheckboxState.
const STATES: readonly CheckboxState[] = ['idle', 'error'];

@Component({
  selector: 'app-checkbox-playground',
  standalone: true,
  imports: [CheckboxComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-checkbox
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        [state]="state()"
      ></cwr-checkbox>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
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
export class CheckboxPlayground {
  states = STATES;

  label = signal('Accept terms and conditions');
  checked = signal(false);
  indeterminate = signal(false);
  disabled = signal(false);
  state = signal<CheckboxState>('idle');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.indeterminate()) attrs.push(`[indeterminate]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-checkbox ${attrs.join(' ')}></cwr-checkbox>`;
  });
}
