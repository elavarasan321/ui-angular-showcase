import { Component, computed, signal } from '@angular/core';
import {
  ButtonComponent,
  ButtonIntent,
  ButtonSize,
  ButtonVariant,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares BUTTON_VARIANTS/BUTTON_INTENTS/BUTTON_SIZES in its
// types but doesn't actually export them from the compiled bundle, so the option lists are
// hardcoded here to match ButtonVariant/ButtonIntent/ButtonSize.
const VARIANTS: readonly ButtonVariant[] = ['solid', 'outline', 'ghost'];
const INTENTS: readonly ButtonIntent[] = [
  'brand',
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];
const SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md'];

@Component({
  selector: 'app-button-playground',
  standalone: true,
  imports: [ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-button
        playground-preview
        [variant]="variant()"
        [intent]="intent()"
        [size]="size()"
        [label]="label()"
        [loading]="loading()"
        [disabled]="disabled()"
        [leadingIcon]="leadingIcon() ? 'icon.ui.add' : undefined"
        [trailingIcon]="trailingIcon() ? 'icon.ui.arrow-right' : undefined"
      ></cwr-button>

      <ng-container playground-controls>
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

        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
          ></cwr-text-input>
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
export class ButtonPlayground {
  variants = VARIANTS;
  intents = INTENTS;
  sizes = SIZES;

  variant = signal<ButtonVariant>('solid');
  intent = signal<ButtonIntent>('brand');
  size = signal<ButtonSize>('md');
  label = signal('Save employee');
  leadingIcon = signal(false);
  trailingIcon = signal(false);
  loading = signal(false);
  disabled = signal(false);

  generatedCode = computed(() => {
    const attrs = [
      `variant="${this.variant()}"`,
      `intent="${this.intent()}"`,
      `size="${this.size()}"`,
      `label="${this.label()}"`,
    ];
    if (this.leadingIcon()) attrs.push(`[leadingIcon]="'icon.ui.add'"`);
    if (this.trailingIcon()) attrs.push(`[trailingIcon]="'icon.ui.arrow-right'"`);
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-button ${attrs.join(' ')}></cwr-button>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
