import { Component, computed, signal } from '@angular/core';
import {
  StatusPillComponent,
  StatusPillIntent,
  StatusPillVariant,
  StatusPillSize,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const STATUS_PILL_INTENTS: readonly StatusPillIntent[] = [
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];
const STATUS_PILL_VARIANTS: readonly StatusPillVariant[] = ['outline', 'solid'];
const STATUS_PILL_SIZES: readonly StatusPillSize[] = ['sm', 'xs'];

@Component({
  selector: 'app-status-pill-playground',
  standalone: true,
  imports: [StatusPillComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-status-pill
        playground-preview
        [intent]="intent()"
        [variant]="variant()"
        [size]="size()"
        [label]="label() || undefined"
        [value]="value()"
      ></cwr-status-pill>

      <ng-container playground-controls>
        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Value">
          <cwr-text-input
            [value]="value()"
            (valueChange)="value.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Intent">
          <cwr-picker-input
            [options]="intents | pickerOptions"
            [value]="intent()"
            (valueChange)="intent.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Variant">
          <cwr-picker-input
            [options]="variants | pickerOptions"
            [value]="variant()"
            (valueChange)="variant.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class StatusPillPlayground {
  intents = STATUS_PILL_INTENTS;
  variants = STATUS_PILL_VARIANTS;
  sizes = STATUS_PILL_SIZES;

  label = signal('Status');
  value = signal('Active');
  intent = signal<StatusPillIntent>('positive');
  variant = signal<StatusPillVariant>('outline');
  size = signal<StatusPillSize>('sm');

  generatedCode = computed(() => {
    const attrs = [
      `intent="${this.intent()}"`,
      `variant="${this.variant()}"`,
      `size="${this.size()}"`,
    ];
    if (this.label()) attrs.push(`label="${this.label()}"`);
    attrs.push(`value="${this.value()}"`);

    return `<cwr-status-pill ${attrs.join(' ')}></cwr-status-pill>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
