import { Component, computed, signal } from '@angular/core';
import {
  FormComponent,
  FormFieldComponent,
  TextInputComponent,
  ButtonComponent,
  FORM_GAPS,
  FormGap,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

@Component({
  selector: 'app-form-playground',
  standalone: true,
  imports: [FormComponent, FormFieldComponent, TextInputComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-form
        playground-preview
        style="width: 100%; max-width: 24rem;"
        [submitting]="submitting()"
        [gap]="gap()"
        [hasError]="hasError()"
        [errorTitle]="hasError() ? errorTitle() : undefined"
        [errorHint]="hasError() ? errorHint() : undefined"
      >
        <cwr-form-field label="Email" labelFor="form-playground-email">
          <cwr-text-input id="form-playground-email" placeholder="name@example.com"></cwr-text-input>
        </cwr-form-field>
        <cwr-button
          variant="solid"
          intent="brand"
          label="Submit"
          [loading]="submitting()"
          [disabled]="submitting()"
        ></cwr-button>
      </cwr-form>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Gap</span>
          <select (change)="gap.set($any($event.target).value)">
            @for (g of gaps; track g) {
              <option [value]="g" [selected]="g === gap()">{{ g }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="submitting()"
            (change)="submitting.set($any($event.target).checked)"
          />
          Submitting
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hasError()"
            (change)="hasError.set($any($event.target).checked)"
          />
          Has error
        </label>

        @if (hasError()) {
          <label class="playground__field">
            <span>Error title</span>
            <input
              type="text"
              [value]="errorTitle()"
              (input)="errorTitle.set($any($event.target).value)"
            />
          </label>

          <label class="playground__field">
            <span>Error hint</span>
            <input
              type="text"
              [value]="errorHint()"
              (input)="errorHint.set($any($event.target).value)"
            />
          </label>
        }
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
export class FormPlayground {
  gaps = FORM_GAPS;

  submitting = signal(false);
  gap = signal<FormGap>('lg');
  hasError = signal(false);
  errorTitle = signal("We couldn't submit your form");
  errorHint = signal('Please check the highlighted fields and try again.');

  generatedCode = computed(() => {
    const attrs = [`gap="${this.gap()}"`];
    if (this.submitting()) attrs.push(`[submitting]="true"`);
    if (this.hasError()) {
      attrs.push(`[hasError]="true"`);
      if (this.errorTitle()) attrs.push(`errorTitle="${this.errorTitle()}"`);
      if (this.errorHint()) attrs.push(`errorHint="${this.errorHint()}"`);
    }

    const buttonAttrs = this.submitting() ? ' [loading]="true" [disabled]="true"' : '';

    return `<cwr-form ${attrs.join(' ')}>
  <cwr-form-field label="Email" labelFor="email">
    <cwr-text-input id="email" placeholder="name@example.com"></cwr-text-input>
  </cwr-form-field>
  <cwr-button variant="solid" intent="brand" label="Submit"${buttonAttrs}></cwr-button>
</cwr-form>`;
  });
}
