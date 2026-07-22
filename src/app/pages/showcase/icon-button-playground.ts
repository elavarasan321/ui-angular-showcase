import { Component, computed, signal } from '@angular/core';
import {
  IconButtonComponent,
  IconButtonIntent,
  IconButtonSize,
  IconButtonVariant,
  IconKey,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares ICON_BUTTON_VARIANTS/ICON_BUTTON_INTENTS/
// ICON_BUTTON_SIZES in its types but doesn't actually export them from the compiled bundle, so
// the option lists are hardcoded here to match IconButtonVariant/IconButtonIntent/IconButtonSize.
const VARIANTS: readonly IconButtonVariant[] = ['solid', 'outline', 'ghost'];
const INTENTS: readonly IconButtonIntent[] = [
  'brand',
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];
const SIZES: readonly IconButtonSize[] = ['xs', 'sm', 'md'];

// ICON_MAP has 150+ keys; a small curated subset keeps the icon picker readable.
const ICONS: readonly IconKey[] = [
  'icon.ui.add',
  'icon.ui.edit',
  'icon.ui.delete',
  'icon.ui.check',
  'icon.ui.close',
];

const DEFAULT_VARIANT: IconButtonVariant = 'solid';
const DEFAULT_INTENT: IconButtonIntent = 'brand';
const DEFAULT_SIZE: IconButtonSize = 'md';

@Component({
  selector: 'app-icon-button-playground',
  standalone: true,
  imports: [IconButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-icon-button
        playground-preview
        [icon]="icon()"
        [label]="label()"
        [variant]="variant()"
        [intent]="intent()"
        [size]="size()"
        [disabled]="disabled()"
        [loading]="loading()"
        [hasHint]="hasHint()"
      ></cwr-icon-button>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Icon</span>
          <select [value]="icon()" (change)="icon.set($any($event.target).value)">
            @for (i of icons; track i) {
              <option [value]="i">{{ i }}</option>
            }
          </select>
        </label>

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

        <label class="playground__field">
          <span>Intent</span>
          <select [value]="intent()" (change)="intent.set($any($event.target).value)">
            @for (i of intents; track i) {
              <option [value]="i">{{ i }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Size</span>
          <select [value]="size()" (change)="size.set($any($event.target).value)">
            @for (s of sizes; track s) {
              <option [value]="s">{{ s }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hasHint()"
            (change)="hasHint.set($any($event.target).checked)"
          />
          Has hint
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
export class IconButtonPlayground {
  icons = ICONS;
  variants = VARIANTS;
  intents = INTENTS;
  sizes = SIZES;

  icon = signal<IconKey>('icon.ui.edit');
  label = signal('Edit');
  variant = signal<IconButtonVariant>(DEFAULT_VARIANT);
  intent = signal<IconButtonIntent>(DEFAULT_INTENT);
  size = signal<IconButtonSize>(DEFAULT_SIZE);
  disabled = signal(false);
  loading = signal(false);
  hasHint = signal(false);

  generatedCode = computed(() => {
    const attrs = [`icon="${this.icon()}"`, `label="${this.label()}"`];
    if (this.variant() !== DEFAULT_VARIANT) attrs.push(`variant="${this.variant()}"`);
    if (this.intent() !== DEFAULT_INTENT) attrs.push(`intent="${this.intent()}"`);
    if (this.size() !== DEFAULT_SIZE) attrs.push(`size="${this.size()}"`);
    if (this.hasHint()) attrs.push(`[hasHint]="true"`);
    if (this.loading()) attrs.push(`[loading]="true"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);
    return `<cwr-icon-button ${attrs.join(' ')}></cwr-icon-button>`;
  });
}
