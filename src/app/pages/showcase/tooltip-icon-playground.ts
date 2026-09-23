import { Component, computed, signal } from '@angular/core';
import { TooltipIconComponent, TooltipArrowPosition } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const TOOLTIP_ARROW_POSITIONS: readonly TooltipArrowPosition[] = [
  'top',
  'bottom',
  'left',
  'right',
];

@Component({
  selector: 'app-tooltip-icon-playground',
  standalone: true,
  imports: [TooltipIconComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-tooltip-icon
        playground-preview
        [label]="label()"
        [hintText]="hintText()"
        [arrowPosition]="arrowPosition()"
      ></cwr-tooltip-icon>

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
          <span>Arrow position</span>
          <select (change)="arrowPosition.set($any($event.target).value)">
            @for (p of arrowPositions; track p) {
              <option [value]="p" [selected]="p === arrowPosition()">{{ p }}</option>
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
export class TooltipIconPlayground {
  arrowPositions = TOOLTIP_ARROW_POSITIONS;

  label = signal('Annual percentage rate');
  hintText = signal('The yearly cost of the loan, including fees, expressed as a percentage.');
  arrowPosition = signal<TooltipArrowPosition>('bottom');

  generatedCode = computed(() => {
    const attrs = [
      `label="${this.label()}"`,
      `hintText="${this.hintText()}"`,
      `arrowPosition="${this.arrowPosition()}"`,
    ];

    return `<cwr-tooltip-icon ${attrs.join(' ')}></cwr-tooltip-icon>`;
  });
}
