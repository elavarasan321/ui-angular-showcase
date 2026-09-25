import { Component, computed, signal } from '@angular/core';
import {
  HintComponent,
  ButtonComponent,
  HintArrowPosition,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

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
];

@Component({
  selector: 'app-hint-playground',
  standalone: true,
  imports: [HintComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <span playground-preview style="position: relative; display: inline-block;">
        <cwr-button variant="outline" intent="neutral" label="Hover me"></cwr-button>
        <cwr-hint [hintText]="hintText()" [arrowPosition]="arrowPosition()"></cwr-hint>
      </span>

      <ng-container playground-controls>
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
