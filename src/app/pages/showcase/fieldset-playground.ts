import { Component, computed, signal } from '@angular/core';
import {
  FieldsetComponent,
  FormFieldComponent,
  TextInputComponent,
  FieldsetGap,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 exports the FieldsetGap type but not a FIELDSET_GAPS
// runtime const, so the option list is hardcoded here to match the union.
const FIELDSET_GAPS: readonly FieldsetGap[] = ['md', 'lg', 'xl'];

@Component({
  selector: 'app-fieldset-playground',
  standalone: true,
  imports: [FieldsetComponent, FormFieldComponent, TextInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
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
        <label class="playground__field">
          <span>Legend</span>
          <input type="text" [value]="legend()" (input)="legend.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Description</span>
          <input
            type="text"
            [value]="description()"
            (input)="description.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Columns</span>
          <input
            type="number"
            min="1"
            max="3"
            [value]="columns()"
            (input)="columns.set(+$any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Gap</span>
          <select (change)="gap.set($any($event.target).value)">
            @for (g of gaps; track g) {
              <option [value]="g" [selected]="g === gap()">{{ g }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Row gap</span>
          <select (change)="rowGap.set($any($event.target).value)">
            @for (g of gaps; track g) {
              <option [value]="g" [selected]="g === rowGap()">{{ g }}</option>
            }
          </select>
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select,
      .playground__field input[type='text'],
      .playground__field input[type='number'] {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }

      .playground__checkbox {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        font: var(--text-style-body);
        color: var(--color-text-surface);
      }
    `,
  ],
})
export class FieldsetPlayground {
  gaps = FIELDSET_GAPS;

  legend = signal('Personal details');
  description = signal("Tell us a bit about yourself");
  columns = signal(2);
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
}
