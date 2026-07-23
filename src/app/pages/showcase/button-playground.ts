import { Component, computed, signal } from '@angular/core';
import { ButtonComponent, ButtonIntent, ButtonSize, ButtonVariant } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares BUTTON_VARIANTS/BUTTON_INTENTS/BUTTON_SIZES in its
// types but doesn't actually export them from the compiled bundle, so the option lists are
// hardcoded here to match ButtonVariant/ButtonIntent/ButtonSize.
const VARIANTS: readonly ButtonVariant[] = ['solid', 'outline', 'ghost'];
const INTENTS: readonly ButtonIntent[] = [
  'brand',
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];
const SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md'];

@Component({
  selector: 'app-button-playground',
  standalone: true,
  imports: [ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-button
        playground-preview
        [variant]="variant()"
        [intent]="intent()"
        [size]="size()"
        [label]="label()"
        [loading]="loading()"
        [disabled]="disabled()"
        [leadingIcon]="leadingIcon() ? 'icon.ui.add' : undefined"
        [trailingIcon]="trailingIcon() ? 'icon.ui.arrow-right' : undefined"
      ></cwr-button>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Variant</span>
          <select (change)="variant.set($any($event.target).value)">
            @for (v of variants; track v) {
              <option [value]="v" [selected]="v === variant()">{{ v }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Intent</span>
          <select (change)="intent.set($any($event.target).value)">
            @for (i of intents; track i) {
              <option [value]="i" [selected]="i === intent()">{{ i }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Size</span>
          <select (change)="size.set($any($event.target).value)">
            @for (s of sizes; track s) {
              <option [value]="s" [selected]="s === size()">{{ s }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
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
export class ButtonPlayground {
  variants = VARIANTS;
  intents = INTENTS;
  sizes = SIZES;

  variant = signal<ButtonVariant>('solid');
  intent = signal<ButtonIntent>('brand');
  size = signal<ButtonSize>('md');
  label = signal('Save employee');
  leadingIcon = signal(false);
  trailingIcon = signal(false);
  loading = signal(false);
  disabled = signal(false);

  generatedCode = computed(() => {
    const attrs = [
      `variant="${this.variant()}"`,
      `intent="${this.intent()}"`,
      `size="${this.size()}"`,
      `label="${this.label()}"`,
    ];
    if (this.leadingIcon()) attrs.push(`[leadingIcon]="'icon.ui.add'"`);
    if (this.trailingIcon()) attrs.push(`[trailingIcon]="'icon.ui.arrow-right'"`);
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-button ${attrs.join(' ')}></cwr-button>`;
  });
}
