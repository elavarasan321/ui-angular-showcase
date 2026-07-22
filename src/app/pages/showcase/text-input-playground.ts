import { Component, computed, signal } from '@angular/core';
import { TextInputComponent, TextInputState } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 doesn't export a TextInputType type at all (only
// InputState, re-exported as TextInputState); its own `type` input is typed inline as this
// literal union, so it's reproduced locally here.
type TextInputType = 'text' | 'password' | 'search' | 'tel' | 'url';

// TextInputState (InputState) is exported as a plain string literal union, not a readonly array
// const, so the option lists are hardcoded here to match the unions.
const TYPES: readonly TextInputType[] = ['text', 'password', 'search', 'tel', 'url'];
const STATES: readonly TextInputState[] = ['idle', 'error'];

@Component({
  selector: 'app-text-input-playground',
  standalone: true,
  imports: [TextInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-text-input
        playground-preview
        [value]="value()"
        (valueChange)="value.set($event)"
        [type]="type()"
        [placeholder]="placeholder()"
        [required]="required()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [state]="state()"
      ></cwr-text-input>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Type</span>
          <select [value]="type()" (change)="type.set($any($event.target).value)">
            @for (t of types; track t) {
              <option [value]="t">{{ t }}</option>
            }
          </select>
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
          <select [value]="state()" (change)="state.set($any($event.target).value)">
            @for (s of states; track s) {
              <option [value]="s">{{ s }}</option>
            }
          </select>
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
export class TextInputPlayground {
  types = TYPES;
  states = STATES;

  value = signal('');
  type = signal<TextInputType>('text');
  placeholder = signal('Enter your name');
  required = signal(false);
  disabled = signal(false);
  readOnly = signal(false);
  state = signal<TextInputState>('idle');

  generatedCode = computed(() => {
    const attrs = [`type="${this.type()}"`, `placeholder="${this.placeholder()}"`];
    if (this.state() !== 'idle') attrs.push(`state="${this.state()}"`);
    if (this.required()) attrs.push(`[required]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    if (this.readOnly()) attrs.push(`[readOnly]="true"`);
    return `<cwr-text-input ${attrs.join(' ')}></cwr-text-input>`;
  });
}
