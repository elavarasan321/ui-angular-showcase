import { Component, computed, signal } from '@angular/core';
import {
  TooltipComponent,
  IconButtonComponent,
  HintArrowPosition,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

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
];

@Component({
  selector: 'app-tooltip-playground',
  standalone: true,
  imports: [TooltipComponent, IconButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <span playground-preview style="position: relative; display: inline-flex;">
        <cwr-icon-button icon="icon.ui.info" label="Visa status" [hasHint]="false"></cwr-icon-button>
        <cwr-tooltip
          [label]="label()"
          [hintText]="showHintText() ? hintText() : ''"
          [linkHref]="showLink() ? linkHref() : null"
          [arrowPosition]="arrowPosition()"
        ></cwr-tooltip>
      </span>

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

        <cwr-form-field label="Link href">
          <cwr-text-input
            [value]="linkHref()"
            (valueChange)="linkHref.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Arrow position">
          <cwr-picker-input
            [options]="arrowPositions | pickerOptions"
            [value]="arrowPosition()"
            (valueChange)="arrowPosition.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Show hint text"
          [checked]="showHintText()"
          (checkedChange)="showHintText.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Show link"
          [checked]="showLink()"
          (checkedChange)="showLink.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
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
    if (this.showHintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.showLink()) attrs.push(`linkHref="${this.linkHref()}"`);
    attrs.push(`arrowPosition="${this.arrowPosition()}"`);
    return `<span style="position: relative; display: inline-flex;">
  <cwr-icon-button icon="icon.ui.info" label="${this.label()}" [hasHint]="false"></cwr-icon-button>
  <cwr-tooltip ${attrs.join(' ')}></cwr-tooltip>
</span>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
