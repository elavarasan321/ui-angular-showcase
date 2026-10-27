import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  StatusPillComponent,
  StatusPillIntent,
  StatusPillVariant,
  StatusPillSize,
  IconKey,
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
const STATUS_PILL_SIZES: readonly StatusPillSize[] = ['md', 'sm', 'xs'];

// ICON_MAP has 150+ keys; a small curated subset of status-friendly icons keeps the picker readable.
const STATUS_PILL_ICONS: readonly IconKey[] = [
  'icon.status.success',
  'icon.status.warning',
  'icon.status.danger',
  'icon.status.fail',
  'icon.status.pending',
  'icon.ui.info',
  'icon.ui.clock',
  'icon.ui.arrow-right',
];

const NONE_ICON = '__none__';
const DEFAULT_SEPARATOR = ':';

@Component({
  selector: 'app-status-pill-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        [separator]="separator()"
        [leadingIcon]="resolvedLeadingIcon()"
        [trailingIcon]="resolvedTrailingIcon()"
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

        <cwr-form-field label="Separator">
          <cwr-text-input
            [value]="separator()"
            (valueChange)="separator.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Leading icon">
          <cwr-picker-input
            [options]="icons | pickerOptions: { label: '(none)', value: '${NONE_ICON}' }"
            [value]="leadingIcon()"
            (valueChange)="leadingIcon.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Trailing icon">
          <cwr-picker-input
            [options]="icons | pickerOptions: { label: '(none)', value: '${NONE_ICON}' }"
            [value]="trailingIcon()"
            (valueChange)="trailingIcon.set($any($event))"
          ></cwr-picker-input>
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
  icons = STATUS_PILL_ICONS;

  label = signal('Status');
  value = signal('Active');
  separator = signal(DEFAULT_SEPARATOR);
  leadingIcon = signal<IconKey | typeof NONE_ICON>(NONE_ICON);
  trailingIcon = signal<IconKey | typeof NONE_ICON>(NONE_ICON);
  intent = signal<StatusPillIntent>('positive');
  variant = signal<StatusPillVariant>('outline');
  size = signal<StatusPillSize>('md');

  resolvedLeadingIcon = computed<IconKey | undefined>(() => {
    const icon = this.leadingIcon();
    return icon === NONE_ICON ? undefined : icon;
  });

  resolvedTrailingIcon = computed<IconKey | undefined>(() => {
    const icon = this.trailingIcon();
    return icon === NONE_ICON ? undefined : icon;
  });

  generatedCode = computed(() => {
    const attrs = [
      `intent="${this.intent()}"`,
      `variant="${this.variant()}"`,
      `size="${this.size()}"`,
    ];
    if (this.label()) attrs.push(`label="${this.label()}"`);
    attrs.push(`value="${this.value()}"`);
    if (this.separator() !== DEFAULT_SEPARATOR) attrs.push(`separator="${this.separator()}"`);
    if (this.leadingIcon() !== NONE_ICON) attrs.push(`leadingIcon="${this.leadingIcon()}"`);
    if (this.trailingIcon() !== NONE_ICON) attrs.push(`trailingIcon="${this.trailingIcon()}"`);

    return `<cwr-status-pill ${attrs.join(' ')}></cwr-status-pill>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
