import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  TooltipComponent,
  IconButtonComponent,
  HintArrowPosition,
  IconKey,
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

// TOOLTIP_DEFAULT_LINK_LABEL is declared in the library's .d.ts but isn't exported from the
// published bundle, so its value is mirrored here.
const DEFAULT_LINK_LABEL = 'Find out more';

// ICON_MAP has 150+ keys; a small curated subset of sensible link icons keeps the picker readable.
const LINK_TRAILING_ICONS: readonly IconKey[] = [
  'icon.ui.external-link',
  'icon.ui.arrow-right',
  'icon.ui.direction-right',
  'icon.ui.circle-right',
  'icon.ui.link',
];

const NONE_ICON = '__none__';

@Component({
  selector: 'app-tooltip-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipComponent, IconButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <span playground-preview style="position: relative; display: inline-flex;">
        <cwr-icon-button icon="icon.ui.info" label="Visa status" [hasHint]="false"></cwr-icon-button>
        <cwr-tooltip
          [label]="label()"
          [hintText]="showHintText() ? hintText() : ''"
          [linkHref]="showLink() ? linkHref() : null"
          [linkLabel]="linkLabel() || defaultLinkLabel"
          [linkTrailingIcon]="resolvedLinkTrailingIcon()"
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

        <cwr-form-field label="Link label">
          <cwr-text-input
            [value]="linkLabel()"
            (valueChange)="linkLabel.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Link trailing icon">
          <cwr-picker-input
            [options]="linkTrailingIcons | pickerOptions: { label: '(none)', value: '${NONE_ICON}' }"
            [value]="linkTrailingIcon()"
            (valueChange)="linkTrailingIcon.set($any($event))"
          ></cwr-picker-input>
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
  linkTrailingIcons = LINK_TRAILING_ICONS;
  protected readonly defaultLinkLabel = DEFAULT_LINK_LABEL;

  label = signal('Visa status');
  hintText = signal('Explains what this check verifies');
  showHintText = signal(false);
  showLink = signal(false);
  linkHref = signal('https://immi.homeaffairs.gov.au/');
  linkLabel = signal(DEFAULT_LINK_LABEL);
  linkTrailingIcon = signal<IconKey | typeof NONE_ICON>(NONE_ICON);
  arrowPosition = signal<HintArrowPosition>('bottom');

  resolvedLinkTrailingIcon = computed<IconKey | null>(() => {
    const icon = this.linkTrailingIcon();
    return icon === NONE_ICON ? null : icon;
  });

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`];
    if (this.showHintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.showLink()) {
      attrs.push(`linkHref="${this.linkHref()}"`);
      if (this.linkLabel() && this.linkLabel() !== DEFAULT_LINK_LABEL) {
        attrs.push(`linkLabel="${this.linkLabel()}"`);
      }
      if (this.linkTrailingIcon() !== NONE_ICON) {
        attrs.push(`linkTrailingIcon="${this.linkTrailingIcon()}"`);
      }
    }
    attrs.push(`arrowPosition="${this.arrowPosition()}"`);
    return `<span style="position: relative; display: inline-flex;">
  <cwr-icon-button icon="icon.ui.info" label="${this.label()}" [hasHint]="false"></cwr-icon-button>
  <cwr-tooltip ${attrs.join(' ')}></cwr-tooltip>
</span>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
