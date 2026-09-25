import { Component, computed, signal } from '@angular/core';
import {
  IconButtonComponent,
  IconButtonIntent,
  IconButtonSize,
  IconButtonTooltipPosition,
  IconButtonVariant,
  IconKey,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares ICON_BUTTON_VARIANTS/ICON_BUTTON_INTENTS/
// ICON_BUTTON_SIZES in its types but doesn't actually export them from the compiled bundle, so
// the option lists are hardcoded here to match IconButtonVariant/IconButtonIntent/IconButtonSize.
const VARIANTS: readonly IconButtonVariant[] = ['solid', 'outline', 'ghost'];
const INTENTS: readonly IconButtonIntent[] = [
  'brand',
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];
const SIZES: readonly IconButtonSize[] = ['xs', 'sm', 'md'];

// @checkworkrights/ui-angular@1.0.30 declares ICON_BUTTON_TOOLTIP_POSITIONS in its types but
// doesn't actually export it from the compiled bundle, so the option list is hardcoded here to
// match IconButtonTooltipPosition.
const TOOLTIP_POSITIONS: readonly IconButtonTooltipPosition[] = ['top', 'bottom', 'left', 'right'];

// ICON_MAP has 150+ keys; a small curated subset keeps the icon picker readable.
const ICONS: readonly IconKey[] = [
  'icon.ui.add',
  'icon.ui.edit',
  'icon.ui.delete',
  'icon.ui.check',
  'icon.ui.close',
];

const DEFAULT_VARIANT: IconButtonVariant = 'solid';
const DEFAULT_INTENT: IconButtonIntent = 'brand';
const DEFAULT_SIZE: IconButtonSize = 'md';
const DEFAULT_TOOLTIP_POSITION: IconButtonTooltipPosition = 'bottom';

@Component({
  selector: 'app-icon-button-playground',
  standalone: true,
  imports: [IconButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-icon-button
        playground-preview
        [icon]="icon()"
        [label]="label()"
        [variant]="variant()"
        [intent]="intent()"
        [size]="size()"
        [disabled]="disabled()"
        [loading]="loading()"
        [hasHint]="hasHint()"
        [tooltipPosition]="tooltipPosition()"
      ></cwr-icon-button>

      <ng-container playground-controls>
        <cwr-form-field label="Icon">
          <cwr-picker-input
            [options]="icons | pickerOptions"
            [value]="icon()"
            (valueChange)="icon.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Variant">
          <cwr-picker-input
            [options]="variants | pickerOptions"
            [value]="variant()"
            (valueChange)="variant.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Intent">
          <cwr-picker-input
            [options]="intents | pickerOptions"
            [value]="intent()"
            (valueChange)="intent.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Has hint"
          [checked]="hasHint()"
          (checkedChange)="hasHint.set($event)"
        ></cwr-checkbox>

        <cwr-form-field label="Tooltip position">
          <cwr-picker-input
            [options]="tooltipPositions | pickerOptions"
            [value]="tooltipPosition()"
            (valueChange)="tooltipPosition.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Loading"
          [checked]="loading()"
          (checkedChange)="loading.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class IconButtonPlayground {
  icons = ICONS;
  variants = VARIANTS;
  intents = INTENTS;
  sizes = SIZES;
  tooltipPositions = TOOLTIP_POSITIONS;

  icon = signal<IconKey>('icon.ui.edit');
  label = signal('Edit');
  variant = signal<IconButtonVariant>(DEFAULT_VARIANT);
  intent = signal<IconButtonIntent>(DEFAULT_INTENT);
  size = signal<IconButtonSize>(DEFAULT_SIZE);
  disabled = signal(false);
  loading = signal(false);
  hasHint = signal(false);
  tooltipPosition = signal<IconButtonTooltipPosition>(DEFAULT_TOOLTIP_POSITION);

  generatedCode = computed(() => {
    const attrs = [`icon="${this.icon()}"`, `label="${this.label()}"`];
    if (this.variant() !== DEFAULT_VARIANT) attrs.push(`variant="${this.variant()}"`);
    if (this.intent() !== DEFAULT_INTENT) attrs.push(`intent="${this.intent()}"`);
    if (this.size() !== DEFAULT_SIZE) attrs.push(`size="${this.size()}"`);
    if (this.hasHint()) attrs.push(`[hasHint]="true"`);
    if (this.tooltipPosition() !== DEFAULT_TOOLTIP_POSITION) {
      attrs.push(`tooltipPosition="${this.tooltipPosition()}"`);
    }
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-icon-button ${attrs.join(' ')}></cwr-icon-button>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
