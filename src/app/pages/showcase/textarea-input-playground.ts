import { Component, computed, signal } from '@angular/core';
import { TextareaInputComponent, TextareaInputState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// TextareaInputState (InputState) is exported as a plain string literal union, not a readonly
// array const, so the option list is hardcoded here to match the union.
const STATES: readonly TextareaInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-textarea-input-playground',
  standalone: true,
  imports: [TextareaInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-textarea-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [placeholder]="placeholder()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [canResize]="canResize()"
        [maxlength]="maxlength()"
        [state]="state()"
      ></cwr-textarea-input>

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

        <label class="playground__field">
          <span>Max length</span>
          <input
            type="number"
            min="0"
            [value]="maxlength() ?? ''"
            (input)="maxlength.set($any($event.target).value === '' ? null : +$any($event.target).value)"
          />
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="canResize()"
            (change)="canResize.set($any($event.target).checked)"
          />
          Can resize
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
export class TextareaInputPlayground {
  states = STATES;

  value = signal<string | null>('');
  placeholder = signal('Type here…');
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  canResize = signal(false);
  maxlength = signal<number | null>(null);
  state = signal<TextareaInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.canResize()) attrs.push(`[canResize]="true"`);
    if (this.maxlength() !== null) attrs.push(`[maxlength]="${this.maxlength()}"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-textarea-input ${attrs.join(' ')}></cwr-textarea-input>`;
  });
}
