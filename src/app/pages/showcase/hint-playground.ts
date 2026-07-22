import { Component, computed, signal } from '@angular/core';
import { HintComponent, ButtonComponent, HintArrowPosition } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 doesn't actually export a HINT_ARROW_POSITIONS-style
// runtime const, so the option list is hardcoded here to match HintArrowPosition.
const ARROW_POSITIONS: readonly HintArrowPosition[] = [
  'bottom',
  'top',
  'left',
  'right',
  'bottom left',
  'bottom right',
  'top left',
  'top right',
  'none',
];

@Component({
  selector: 'app-hint-playground',
  standalone: true,
  imports: [HintComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <span playground-preview style="position: relative; display: inline-block;">
        <cwr-button variant="outline" intent="neutral" label="Hover me"></cwr-button>
        <cwr-hint [hintText]="hintText()" [arrowPosition]="arrowPosition()"></cwr-hint>
      </span>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Hint text</span>
          <input
            type="text"
            [value]="hintText()"
            (input)="hintText.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Arrow position</span>
          <select
            [value]="arrowPosition()"
            (change)="arrowPosition.set($any($event.target).value)"
          >
            @for (p of arrowPositions; track p) {
              <option [value]="p">{{ p }}</option>
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
export class HintPlayground {
  arrowPositions = ARROW_POSITIONS;

  hintText = signal('This explains the field');
  arrowPosition = signal<HintArrowPosition>('bottom');

  generatedCode = computed(() => {
    return `<span style="position: relative; display: inline-block;">
  <cwr-button variant="outline" intent="neutral" label="Hover me"></cwr-button>
  <cwr-hint hintText="${this.hintText()}" arrowPosition="${this.arrowPosition()}"></cwr-hint>
</span>`;
  });
}
