import { Component, computed, signal } from '@angular/core';
import {
  FieldsetComponent,
  FormFieldComponent,
  TextInputComponent,
  FieldsetGap,
  PickerInputComponent,
  NumericInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 exports the FieldsetGap type but not a FIELDSET_GAPS
// runtime const, so the option list is hardcoded here to match the union.
const FIELDSET_GAPS: readonly FieldsetGap[] = ['md', 'lg', 'xl'];

@Component({
  selector: 'app-fieldset-playground',
  standalone: true,
  imports: [FieldsetComponent, FormFieldComponent, TextInputComponent, Playground, PickerInputComponent, PickerOptionsPipe, NumericInputComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-fieldset
        playground-preview
        style="width: 100%;"
        [legend]="legend()"
        [description]="description()"
        [columns]="columns()"
        [gap]="gap()"
        [rowGap]="rowGap()"
      >
        <cwr-form-field label="First name" labelFor="fieldset-playground-first-name">
          <cwr-text-input
            id="fieldset-playground-first-name"
            placeholder="Enter first name"
          ></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Last name" labelFor="fieldset-playground-last-name">
          <cwr-text-input
            id="fieldset-playground-last-name"
            placeholder="Enter last name"
          ></cwr-text-input>
        </cwr-form-field>
        <cwr-form-field label="Email" labelFor="fieldset-playground-email">
          <cwr-text-input
            id="fieldset-playground-email"
            placeholder="name@example.com"
          ></cwr-text-input>
        </cwr-form-field>
      </cwr-fieldset>

      <ng-container playground-controls>
        <cwr-form-field label="Legend">
          <cwr-text-input
            [value]="legend()"
            (valueChange)="legend.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Description">
          <cwr-text-input
            [value]="description()"
            (valueChange)="description.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Columns">
          <cwr-numeric-input
            [value]="columns()"
            (valueChange)="columns.set(clampColumns($event))"
          ></cwr-numeric-input>
        </cwr-form-field>

        <cwr-form-field label="Gap">
          <cwr-picker-input
            [options]="gaps | pickerOptions"
            [value]="gap()"
            (valueChange)="gap.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Row gap">
          <cwr-picker-input
            [options]="gaps | pickerOptions"
            [value]="rowGap()"
            (valueChange)="rowGap.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class FieldsetPlayground {
  gaps = FIELDSET_GAPS;

  legend = signal('Personal details');
  description = signal("Tell us a bit about yourself");
  columns = signal(2);
  clampColumns = (n: number | null) => Math.min(3, Math.max(1, n ?? 1));
  gap = signal<FieldsetGap>('lg');
  rowGap = signal<FieldsetGap>('lg');

  generatedCode = computed(() => {
    const attrs = [`legend="${this.legend()}"`];
    if (this.description()) attrs.push(`description="${this.description()}"`);
    attrs.push(`[columns]="${this.columns()}"`);
    attrs.push(`gap="${this.gap()}"`);
    attrs.push(`rowGap="${this.rowGap()}"`);

    return `<cwr-fieldset ${attrs.join(' ')}>
  <cwr-form-field label="First name" labelFor="first-name">
    <cwr-text-input id="first-name" placeholder="Enter first name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Last name" labelFor="last-name">
    <cwr-text-input id="last-name" placeholder="Enter last name"></cwr-text-input>
  </cwr-form-field>
  <cwr-form-field label="Email" labelFor="email">
    <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
  </cwr-form-field>
</cwr-fieldset>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
