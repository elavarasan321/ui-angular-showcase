import { Component, computed, signal } from '@angular/core';
import {
  StyledLinkComponent,
  StyledLinkVariant,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const STYLED_LINK_VARIANTS: readonly StyledLinkVariant[] = ['default', 'neutral'];

@Component({
  selector: 'app-styled-link-playground',
  standalone: true,
  imports: [StyledLinkComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-styled-link
        playground-preview
        [variant]="variant()"
        [disabled]="disabled()"
        href="https://checkworkrights.com"
        [target]="target()"
        [trailingIcon]="trailingIcon()"
      >
        {{ label() }}
      </cwr-styled-link>

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
          label="External link icon"
          [checked]="showExternalIcon()"
          (checkedChange)="showExternalIcon.set($event)"
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
export class StyledLinkPlayground {
  variants = STYLED_LINK_VARIANTS;

  label = signal('View documentation');
  variant = signal<StyledLinkVariant>('default');
  showExternalIcon = signal(true);
  disabled = signal(false);

  target = computed(() => (this.showExternalIcon() ? '_blank' : undefined));
  trailingIcon = computed(() => (this.showExternalIcon() ? 'icon.ui.external-link' : null));

  generatedCode = computed(() => {
    const attrs = [`variant="${this.variant()}"`, `href="https://checkworkrights.com"`];
    if (this.showExternalIcon()) attrs.push(`target="_blank"`);
    else attrs.push(`[trailingIcon]="null"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-styled-link ${attrs.join(' ')}>${this.label()}</cwr-styled-link>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
