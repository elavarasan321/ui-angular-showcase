import { Component, computed, signal } from '@angular/core';
import {
  InlineButtonComponent,
  InlineButtonVariant,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares INLINE_BUTTON_VARIANTS in its types but doesn't
// actually export it from the compiled bundle, so the option list is hardcoded here to match
// InlineButtonVariant.
const VARIANTS: readonly InlineButtonVariant[] = [
  'brand',
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];

// Fixed representative icon keys used when the leading/trailing icon toggles are on.
const LEADING_ICON = 'icon.ui.download';
const TRAILING_ICON = 'icon.ui.external-link';

@Component({
  selector: 'app-inline-button-playground',
  standalone: true,
  imports: [InlineButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-inline-button
        playground-preview
        [variant]="variant()"
        [leadingIcon]="leadingIcon() ? LEADING_ICON : undefined"
        [trailingIcon]="trailingIcon() ? TRAILING_ICON : undefined"
        [loading]="loading()"
        [disabled]="disabled()"
        >{{ label() }}</cwr-inline-button
      >

      <ng-container playground-controls>
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

        <cwr-checkbox
          label="Leading icon"
          [checked]="leadingIcon()"
          (checkedChange)="leadingIcon.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Trailing icon"
          [checked]="trailingIcon()"
          (checkedChange)="trailingIcon.set($event)"
        ></cwr-checkbox>

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
export class InlineButtonPlayground {
  variants = VARIANTS;
  readonly LEADING_ICON = LEADING_ICON;
  readonly TRAILING_ICON = TRAILING_ICON;

  label = signal('Click me');
  variant = signal<InlineButtonVariant>('brand');
  leadingIcon = signal(false);
  trailingIcon = signal(false);
  loading = signal(false);
  disabled = signal(false);

  generatedCode = computed(() => {
    const attrs = [`variant="${this.variant()}"`];
    if (this.leadingIcon()) attrs.push(`[leadingIcon]="'${LEADING_ICON}'"`);
    if (this.trailingIcon()) attrs.push(`[trailingIcon]="'${TRAILING_ICON}'"`);
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-inline-button ${attrs.join(' ')}>${this.label()}</cwr-inline-button>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
