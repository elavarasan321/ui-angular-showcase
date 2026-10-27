import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  TooltipIconComponent,
  TooltipArrowPosition,
  ICON_COLOR_MAP,
  IconColorKey,
  IconKey,
  IconSize,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
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

// @checkworkrights/ui-angular@1.0.30 declares ICON_SIZES in its types but doesn't actually
// export it from the compiled bundle, so the option list is hardcoded here to match the
// tooltip icon's size union (the same as IconSize).
const SIZES: readonly IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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

const NONE = '__none__';

@Component({
  selector: 'app-tooltip-icon-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipIconComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-tooltip-icon
        playground-preview
        [size]="size()"
        [color]="resolvedColor()"
        [label]="label()"
        [hintText]="hintText()"
        [linkHref]="showLink() ? linkHref() : null"
        [linkLabel]="linkLabel() || defaultLinkLabel"
        [linkTrailingIcon]="resolvedLinkTrailingIcon()"
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

        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Color">
          <cwr-picker-input
            [options]="colorKeys | pickerOptions: { label: '(default)', value: '${NONE}' }"
            [value]="color()"
            (valueChange)="color.set($any($event))"
          ></cwr-picker-input>
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
            [options]="linkTrailingIcons | pickerOptions: { label: '(none)', value: '${NONE}' }"
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
          label="Show link"
          [checked]="showLink()"
          (checkedChange)="showLink.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class TooltipIconPlayground {
  arrowPositions = TOOLTIP_ARROW_POSITIONS;
  sizes = SIZES;
  colorKeys = Object.keys(ICON_COLOR_MAP) as IconColorKey[];
  linkTrailingIcons = LINK_TRAILING_ICONS;
  protected readonly defaultLinkLabel = DEFAULT_LINK_LABEL;

  label = signal('Annual percentage rate');
  hintText = signal('The yearly cost of the loan, including fees, expressed as a percentage.');
  size = signal<IconSize>('sm');
  color = signal<IconColorKey | typeof NONE>(NONE);
  showLink = signal(false);
  linkHref = signal('https://moneysmart.gov.au/');
  linkLabel = signal(DEFAULT_LINK_LABEL);
  linkTrailingIcon = signal<IconKey | typeof NONE>(NONE);
  arrowPosition = signal<TooltipArrowPosition>('bottom');

  resolvedColor = computed<IconColorKey | undefined>(() => {
    const color = this.color();
    return color === NONE ? undefined : color;
  });

  resolvedLinkTrailingIcon = computed<IconKey | null>(() => {
    const icon = this.linkTrailingIcon();
    return icon === NONE ? null : icon;
  });

  generatedCode = computed(() => {
    const attrs = [
      `label="${this.label()}"`,
      `hintText="${this.hintText()}"`,
    ];
    if (this.size() !== 'sm') attrs.push(`size="${this.size()}"`);
    if (this.color() !== NONE) attrs.push(`color="${this.color()}"`);
    if (this.showLink()) {
      attrs.push(`linkHref="${this.linkHref()}"`);
      if (this.linkLabel() && this.linkLabel() !== DEFAULT_LINK_LABEL) {
        attrs.push(`linkLabel="${this.linkLabel()}"`);
      }
      if (this.linkTrailingIcon() !== NONE) {
        attrs.push(`linkTrailingIcon="${this.linkTrailingIcon()}"`);
      }
    }
    attrs.push(`arrowPosition="${this.arrowPosition()}"`);

    return `<cwr-tooltip-icon ${attrs.join(' ')}></cwr-tooltip-icon>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
