import { Component, computed, signal } from '@angular/core';
import {
  BadgeComponent,
  BadgeEmphasis,
  BadgeIntent,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 exports BadgeIntent/BadgeEmphasis as types only — the
// BADGE_INTENTS/BADGE_EMPHASES runtime consts declared in its .d.ts aren't actually present in
// the published bundle, so the option lists are hardcoded here to match the unions.
const BADGE_INTENTS: readonly BadgeIntent[] = [
  'neutral',
  'brand',
  'positive',
  'warning',
  'caution',
  'negative',
];
const BADGE_EMPHASES: readonly BadgeEmphasis[] = ['solid', 'subtle', 'inverse'];

@Component({
  selector: 'app-badge-playground',
  standalone: true,
  imports: [BadgeComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-badge
        playground-preview
        [value]="value()"
        [intent]="intent()"
        [emphasis]="emphasis()"
        [hover]="hover()"
      ></cwr-badge>

      <ng-container playground-controls>
        <cwr-form-field label="Value">
          <cwr-text-input
            [value]="'' + value()"
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

        <cwr-form-field label="Emphasis">
          <cwr-picker-input
            [options]="emphases | pickerOptions"
            [value]="emphasis()"
            (valueChange)="emphasis.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Hover"
          [checked]="hover()"
          (checkedChange)="hover.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class BadgePlayground {
  intents = BADGE_INTENTS;
  emphases = BADGE_EMPHASES;

  value = signal<string | number>('New');
  intent = signal<BadgeIntent>('neutral');
  emphasis = signal<BadgeEmphasis>('solid');
  hover = signal(false);

  generatedCode = computed(() => {
    const attrs = [
      `value="${this.value()}"`,
      `intent="${this.intent()}"`,
      `emphasis="${this.emphasis()}"`,
    ];
    if (this.hover()) attrs.push(`[hover]="true"`);
    return `<cwr-badge ${attrs.join(' ')}></cwr-badge>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
