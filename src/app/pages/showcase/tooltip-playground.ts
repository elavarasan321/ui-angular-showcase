import { Component, computed, signal } from '@angular/core';
import {
  TooltipComponent,
  IconButtonComponent,
  HintArrowPosition,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 doesn't actually export a runtime const for the arrow
// position union, so the option list is hardcoded here to match HintArrowPosition
// (TooltipArrowPosition is just an alias of it).
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
  selector: 'app-tooltip-playground',
  standalone: true,
  imports: [TooltipComponent, IconButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <span playground-preview style="position: relative; display: inline-flex;">
        <cwr-icon-button icon="icon.ui.info" label="Visa status" [hasHint]="false"></cwr-icon-button>
        <cwr-tooltip
          [label]="label()"
          [hintText]="hintText()"
          [showHintText]="showHintText()"
          [showLink]="showLink()"
          [linkHref]="linkHref()"
          [arrowPosition]="arrowPosition()"
        ></cwr-tooltip>
      </span>

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
          <span>Link href</span>
          <input
            type="text"
            [value]="linkHref()"
            (input)="linkHref.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Arrow position</span>
          <select
            (change)="arrowPosition.set($any($event.target).value)"
          >
            @for (p of arrowPositions; track p) {
              <option [value]="p" [selected]="p === arrowPosition()">{{ p }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showHintText()"
            (change)="showHintText.set($any($event.target).checked)"
          />
          Show hint text
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showLink()"
            (change)="showLink.set($any($event.target).checked)"
          />
          Show link
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
export class TooltipPlayground {
  arrowPositions = ARROW_POSITIONS;

  label = signal('Visa status');
  hintText = signal('Explains what this check verifies');
  showHintText = signal(false);
  showLink = signal(false);
  linkHref = signal('https://immi.homeaffairs.gov.au/');
  arrowPosition = signal<HintArrowPosition>('bottom');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.showHintText()) attrs.push(`[hintText]="'${this.hintText()}'"`);
    if (this.showLink()) {
      attrs.push(`[showLink]="true"`);
      attrs.push(`linkHref="${this.linkHref()}"`);
    }
    attrs.push(`arrowPosition="${this.arrowPosition()}"`);
    return `<span style="position: relative; display: inline-flex;">
  <cwr-icon-button icon="icon.ui.info" label="${this.label()}" [hasHint]="false"></cwr-icon-button>
  <cwr-tooltip ${attrs.join(' ')}></cwr-tooltip>
</span>`;
  });
}
