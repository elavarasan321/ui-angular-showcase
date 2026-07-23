import { Component, computed, signal } from '@angular/core';
import { ToggleComponent, ToggleState, LabelPosition } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 exports ToggleState/LabelPosition as types only — the
// TOGGLE_STATES/LABEL_POSITIONS runtime consts declared in its .d.ts aren't actually present in
// the published bundle, so the option lists are hardcoded here to match the unions.
const TOGGLE_STATES: readonly ToggleState[] = ['idle', 'error', 'loading'];
const LABEL_POSITIONS: readonly LabelPosition[] = ['start', 'end'];

@Component({
  selector: 'app-toggle-playground',
  standalone: true,
  imports: [ToggleComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-toggle
        playground-preview
        [label]="label()"
        [checked]="checked()"
        (checkedChange)="checked.set($event)"
        [state]="state()"
        [position]="position()"
        [disabled]="disabled()"
        [hintText]="hintText() || undefined"
        [errorText]="state() === 'error' ? errorText() : undefined"
      ></cwr-toggle>

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

        <label class="playground__field">
          <span>Position</span>
          <select (change)="position.set($any($event.target).value)">
            @for (p of positions; track p) {
              <option [value]="p" [selected]="p === position()">{{ p }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Hint text</span>
          <input
            type="text"
            [value]="hintText()"
            (input)="hintText.set($any($event.target).value)"
          />
        </label>

        @if (state() === 'error') {
          <label class="playground__field">
            <span>Error text</span>
            <input
              type="text"
              [value]="errorText()"
              (input)="errorText.set($any($event.target).value)"
            />
          </label>
        }

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
export class TogglePlayground {
  states = TOGGLE_STATES;
  positions = LABEL_POSITIONS;

  label = signal('Enable notifications');
  checked = signal(false);
  state = signal<ToggleState>('idle');
  position = signal<LabelPosition>('end');
  disabled = signal(false);
  hintText = signal('You can change this later in settings');
  errorText = signal('Something went wrong. Please try again.');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.position() !== 'end') attrs.push(`position="${this.position()}"`);
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.state() === 'error' && this.errorText()) {
      attrs.push(`errorText="${this.errorText()}"`);
    }
    return `<cwr-toggle ${attrs.join(' ')}></cwr-toggle>`;
  });
}
