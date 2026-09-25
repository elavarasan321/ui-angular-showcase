import { Component, computed, signal } from '@angular/core';
import {
  CalloutComponent,
  ButtonComponent,
  CalloutVariant,
  CalloutDirection,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 exports CalloutVariant/CalloutDirection as types only —
// the CALLOUT_VARIANTS/CALLOUT_DIRECTIONS runtime consts declared in its .d.ts aren't actually
// present in the published bundle, so the option lists are hardcoded here to match the unions.
const CALLOUT_VARIANTS: readonly CalloutVariant[] = ['neutral', 'positive', 'warning', 'negative'];
const CALLOUT_DIRECTIONS: readonly CalloutDirection[] = ['row', 'column'];

@Component({
  selector: 'app-callout-playground',
  standalone: true,
  imports: [CalloutComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-callout
        playground-preview
        style="width: 100%;"
        [variant]="variant()"
        [direction]="direction()"
        [title]="title()"
        [hintText]="hintText() || undefined"
        [leadingIcon]="leadingIcon()"
        [hasActions]="hasActions()"
      >
        @if (hasActions()) {
          <cwr-button variant="outline" intent="neutral" size="sm" label="Dismiss"></cwr-button>
        }
      </cwr-callout>

      <ng-container playground-controls>
        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Hint text">
          <cwr-text-input
            [value]="hintText()"
            (valueChange)="hintText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Variant">
          <cwr-picker-input
            [options]="variants | pickerOptions"
            [value]="variant()"
            (valueChange)="variant.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Direction">
          <cwr-picker-input
            [options]="directions | pickerOptions"
            [value]="direction()"
            (valueChange)="direction.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Leading icon"
          [checked]="leadingIcon()"
          (checkedChange)="leadingIcon.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Has actions"
          [checked]="hasActions()"
          (checkedChange)="hasActions.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class CalloutPlayground {
  variants = CALLOUT_VARIANTS;
  directions = CALLOUT_DIRECTIONS;

  title = signal('Verification pending');
  hintText = signal('This can take up to two business days.');
  variant = signal<CalloutVariant>('neutral');
  direction = signal<CalloutDirection>('row');
  leadingIcon = signal(true);
  hasActions = signal(false);

  generatedCode = computed(() => {
    const attrs = [`title="${this.title()}"`, `variant="${this.variant()}"`, `direction="${this.direction()}"`];
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (!this.leadingIcon()) attrs.push(`[leadingIcon]="false"`);
    if (this.hasActions()) attrs.push(`[hasActions]="true"`);

    if (this.hasActions()) {
      return `<cwr-callout ${attrs.join(' ')}>
  <cwr-button variant="outline" intent="neutral" size="sm" label="Dismiss"></cwr-button>
</cwr-callout>`;
    }

    return `<cwr-callout ${attrs.join(' ')}></cwr-callout>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
