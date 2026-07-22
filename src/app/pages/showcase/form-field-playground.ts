import { Component, computed, signal } from '@angular/core';
import { FormFieldComponent, TextInputComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const INPUT_ID = 'playground-demo-input';

@Component({
  selector: 'app-form-field-playground',
  standalone: true,
  imports: [FormFieldComponent, TextInputComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-form-field
        playground-preview
        [label]="label()"
        [labelFor]="inputId"
        [mandatory]="mandatory()"
        [hasError]="hasError()"
        [hintText]="hintText() || undefined"
        [errorText]="hasError() ? errorText() : undefined"
      >
        <cwr-text-input [id]="inputId" placeholder="Enter value"></cwr-text-input>
      </cwr-form-field>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Hint text</span>
          <input
            type="text"
            [value]="hintText()"
            (input)="hintText.set($any($event.target).value)"
          />
        </label>

        @if (hasError()) {
          <label class="playground__field">
            <span>Error text</span>
            <input
              type="text"
              [value]="errorText()"
              (input)="errorText.set($any($event.target).value)"
            />
          </label>
        }

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="mandatory()"
            (change)="mandatory.set($any($event.target).checked)"
          />
          Mandatory
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hasError()"
            (change)="hasError.set($any($event.target).checked)"
          />
          Has error
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
      .playground__field input[type='text'] {
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
export class FormFieldPlayground {
  inputId = INPUT_ID;

  label = signal('Employee name');
  mandatory = signal(false);
  hasError = signal(false);
  hintText = signal('Enter your full legal name');
  errorText = signal('This field is required');

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`, `labelFor="${this.inputId}"`];
    if (this.mandatory()) attrs.push(`[mandatory]="true"`);
    if (this.hasError()) attrs.push(`[hasError]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.hasError() && this.errorText()) attrs.push(`errorText="${this.errorText()}"`);

    return `<cwr-form-field ${attrs.join(' ')}>
  <cwr-text-input id="${this.inputId}" placeholder="Enter value"></cwr-text-input>
</cwr-form-field>`;
  });
}
