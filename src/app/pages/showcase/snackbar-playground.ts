import { Component, computed, inject, signal } from '@angular/core';
import {
  ButtonComponent,
  SnackbarStackService,
  SnackbarVariant,
  SnackbarStackPosition,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const SNACKBAR_VARIANTS: readonly SnackbarVariant[] = ['neutral', 'positive', 'warning', 'negative'];
const SNACKBAR_STACK_POSITIONS: readonly SnackbarStackPosition[] = [
  'bottom-start',
  'bottom-end',
  'bottom-center',
];

@Component({
  selector: 'app-snackbar-playground',
  standalone: true,
  imports: [ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview>
        <cwr-button
          variant="solid"
          intent="brand"
          size="sm"
          label="Show snackbar"
          (buttonClick)="show()"
        ></cwr-button>
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Title</span>
          <input type="text" [value]="title()" (input)="title.set($any($event.target).value)" />
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
          <span>Variant</span>
          <select (change)="variant.set($any($event.target).value)">
            @for (v of variants; track v) {
              <option [value]="v" [selected]="v === variant()">{{ v }}</option>
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
    `,
  ],
})
export class SnackbarPlayground {
  variants = SNACKBAR_VARIANTS;
  positions = SNACKBAR_STACK_POSITIONS;

  private snackbarStack = inject(SnackbarStackService);

  title = signal('Changes saved');
  hintText = signal('Your updates have been applied.');
  variant = signal<SnackbarVariant>('positive');
  position = signal<SnackbarStackPosition>('bottom-start');

  show(): void {
    this.snackbarStack.open({
      title: this.title(),
      hintText: this.hintText() || undefined,
      variant: this.variant(),
      position: this.position(),
    });
  }

  generatedCode = computed(() => {
    return `private snackbarStack = inject(SnackbarStackService);

showSnackbar(): void {
  this.snackbarStack.open({
    title: '${this.title()}',
    hintText: '${this.hintText()}',
    variant: '${this.variant()}',
    position: '${this.position()}',
  });
}`;
  });
}
