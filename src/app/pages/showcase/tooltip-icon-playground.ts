import { Component, computed, signal } from '@angular/core';
import {
  TooltipIconComponent,
  TooltipArrowPosition,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const TOOLTIP_ARROW_POSITIONS: readonly TooltipArrowPosition[] = [
  'top',
  'bottom',
  'left',
  'right',
];

@Component({
  selector: 'app-tooltip-icon-playground',
  standalone: true,
  imports: [TooltipIconComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-tooltip-icon
        playground-preview
        [label]="label()"
        [hintText]="hintText()"
        [arrowPosition]="arrowPosition()"
      ></cwr-tooltip-icon>

      <ng-container playground-controls>
        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Hint text">
          <cwr-text-input
            [value]="hintText()"
            (valueChange)="hintText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Arrow position">
          <cwr-picker-input
            [options]="arrowPositions | pickerOptions"
            [value]="arrowPosition()"
            (valueChange)="arrowPosition.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
