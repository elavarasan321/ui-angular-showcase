import { Component, computed, signal } from '@angular/core';
import { DateInputComponent, DateInputState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// DateInputState (InputState) is exported as a plain string literal union, not a readonly array
// const, so the option list is hardcoded here to match the union.
const STATES: readonly DateInputState[] = ['idle', 'error'];
const SEPARATORS: readonly string[] = ['/', '-', '.'];

@Component({
  selector: 'app-date-input-playground',
  standalone: true,
  imports: [DateInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-date-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [separator]="separator()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-date-input>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Separator</span>
          <select (change)="separator.set($any($event.target).value)">
            @for (s of separators; track s) {
              <option [value]="s" [selected]="s === separator()">{{ s }}</option>
            }
          </select>
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
export class DateInputPlayground {
  states = STATES;
  separators = SEPARATORS;

  value = signal<string | null>(null);
  separator = signal('/');
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<DateInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`separator="${this.separator()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-date-input ${attrs.join(' ')}></cwr-date-input>`;
  });
}
