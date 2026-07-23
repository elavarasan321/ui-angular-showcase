import { Component, computed, signal } from '@angular/core';
import { RadioButtonComponent, RadioButtonState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 exports RadioButtonState as a type only — the
// RADIO_BUTTON_STATES runtime const declared in its .d.ts isn't actually present in the
// published bundle, so the option list is hardcoded here to match the union.
const RADIO_BUTTON_STATES: readonly RadioButtonState[] = ['idle', 'error'];

@Component({
  selector: 'app-radio-button-playground',
  standalone: true,
  imports: [RadioButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-radio-button
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [state]="state()"
        [disabled]="disabled()"
        [showFocusRing]="showFocusRing()"
      ></cwr-radio-button>

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
            [checked]="disabled()"
            (change)="disabled.set($any($event.target).checked)"
          />
          Disabled
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showFocusRing()"
            (change)="showFocusRing.set($any($event.target).checked)"
          />
          Show focus ring
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
export class RadioButtonPlayground {
  states = RADIO_BUTTON_STATES;

  label = signal('Option A');
  checked = signal(false);
  state = signal<RadioButtonState>('idle');
  disabled = signal(false);
  showFocusRing = signal(false);

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.showFocusRing()) attrs.push(`[showFocusRing]="true"`);
    return `<cwr-radio-button ${attrs.join(' ')}></cwr-radio-button>`;
  });
}
