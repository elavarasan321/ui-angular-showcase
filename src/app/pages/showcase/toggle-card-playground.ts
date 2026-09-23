import { Component, computed, signal } from '@angular/core';
import {
  ToggleCardComponent,
  ToggleCardState,
  ToggleCardLabelPosition,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const TOGGLE_CARD_STATES: readonly ToggleCardState[] = ['idle', 'error', 'loading'];
const TOGGLE_CARD_LABEL_POSITIONS: readonly ToggleCardLabelPosition[] = ['start', 'end'];

@Component({
  selector: 'app-toggle-card-playground',
  standalone: true,
  imports: [ToggleCardComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-toggle-card
        playground-preview
        style="width: 100%;"
        [label]="label()"
        [checked]="checked()"
        [hintText]="hintText() || undefined"
        [errorText]="state() === 'error' ? errorText() : undefined"
        [state]="state()"
        [disabled]="disabled()"
        [position]="position()"
        (checkedChange)="checked.set($event)"
      ></cwr-toggle-card>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Hint text</span>
          <input
            type="text"
            [value]="hintText()"
            (input)="hintText.set($any($event.target).value)"
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

        <label class="playground__field">
          <span>Label position</span>
          <select (change)="position.set($any($event.target).value)">
            @for (p of positions; track p) {
              <option [value]="p" [selected]="p === position()">{{ p }}</option>
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
export class ToggleCardPlayground {
  states = TOGGLE_CARD_STATES;
  positions = TOGGLE_CARD_LABEL_POSITIONS;

  label = signal('Email notifications');
  checked = signal(true);
  hintText = signal('Get an email whenever a document is verified');
  errorText = signal('Choose an option to continue');
  state = signal<ToggleCardState>('idle');
  disabled = signal(false);
  position = signal<ToggleCardLabelPosition>('end');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`, `state="${this.state()}"`, `position="${this.position()}"`];
    if (this.checked()) attrs.push(`[checked]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.state() === 'error' && this.errorText()) attrs.push(`errorText="${this.errorText()}"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-toggle-card ${attrs.join(' ')}></cwr-toggle-card>`;
  });
}
