import { Component, computed, signal } from '@angular/core';
import { InlineButtonComponent, InlineButtonVariant } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares INLINE_BUTTON_VARIANTS in its types but doesn't
// actually export it from the compiled bundle, so the option list is hardcoded here to match
// InlineButtonVariant.
const VARIANTS: readonly InlineButtonVariant[] = [
  'brand',
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];

// Fixed representative icon keys used when the leading/trailing icon toggles are on.
const LEADING_ICON = 'icon.ui.download';
const TRAILING_ICON = 'icon.ui.external-link';

@Component({
  selector: 'app-inline-button-playground',
  standalone: true,
  imports: [InlineButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-inline-button
        playground-preview
        [variant]="variant()"
        [leadingIcon]="leadingIcon() ? LEADING_ICON : undefined"
        [trailingIcon]="trailingIcon() ? TRAILING_ICON : undefined"
        [loading]="loading()"
        [disabled]="disabled()"
        >{{ label() }}</cwr-inline-button
      >

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Variant</span>
          <select [value]="variant()" (change)="variant.set($any($event.target).value)">
            @for (v of variants; track v) {
              <option [value]="v">{{ v }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="leadingIcon()"
            (change)="leadingIcon.set($any($event.target).checked)"
          />
          Leading icon
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="trailingIcon()"
            (change)="trailingIcon.set($any($event.target).checked)"
          />
          Trailing icon
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="loading()"
            (change)="loading.set($any($event.target).checked)"
          />
          Loading
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="disabled()"
            (change)="disabled.set($any($event.target).checked)"
          />
          Disabled
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
export class InlineButtonPlayground {
  variants = VARIANTS;
  readonly LEADING_ICON = LEADING_ICON;
  readonly TRAILING_ICON = TRAILING_ICON;

  label = signal('Click me');
  variant = signal<InlineButtonVariant>('brand');
  leadingIcon = signal(false);
  trailingIcon = signal(false);
  loading = signal(false);
  disabled = signal(false);

  generatedCode = computed(() => {
    const attrs = [`variant="${this.variant()}"`];
    if (this.leadingIcon()) attrs.push(`[leadingIcon]="'${LEADING_ICON}'"`);
    if (this.trailingIcon()) attrs.push(`[trailingIcon]="'${TRAILING_ICON}'"`);
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-inline-button ${attrs.join(' ')}>${this.label()}</cwr-inline-button>`;
  });
}
