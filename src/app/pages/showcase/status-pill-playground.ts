import { Component, computed, signal } from '@angular/core';
import { StatusPillComponent, StatusPillIntent, StatusPillVariant, StatusPillSize } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const STATUS_PILL_INTENTS: readonly StatusPillIntent[] = [
  'neutral',
  'positive',
  'warning',
  'caution',
  'negative',
];
const STATUS_PILL_VARIANTS: readonly StatusPillVariant[] = ['outline', 'solid'];
const STATUS_PILL_SIZES: readonly StatusPillSize[] = ['sm', 'xs'];

@Component({
  selector: 'app-status-pill-playground',
  standalone: true,
  imports: [StatusPillComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-status-pill
        playground-preview
        [intent]="intent()"
        [variant]="variant()"
        [size]="size()"
        [label]="label() || undefined"
        [value]="value()"
      ></cwr-status-pill>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Value</span>
          <input type="text" [value]="value()" (input)="value.set($any($event.target).value)" />
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
          <span>Variant</span>
          <select (change)="variant.set($any($event.target).value)">
            @for (v of variants; track v) {
              <option [value]="v" [selected]="v === variant()">{{ v }}</option>
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
    `,
  ],
})
export class StatusPillPlayground {
  intents = STATUS_PILL_INTENTS;
  variants = STATUS_PILL_VARIANTS;
  sizes = STATUS_PILL_SIZES;

  label = signal('Status');
  value = signal('Active');
  intent = signal<StatusPillIntent>('positive');
  variant = signal<StatusPillVariant>('outline');
  size = signal<StatusPillSize>('sm');

  generatedCode = computed(() => {
    const attrs = [
      `intent="${this.intent()}"`,
      `variant="${this.variant()}"`,
      `size="${this.size()}"`,
    ];
    if (this.label()) attrs.push(`label="${this.label()}"`);
    attrs.push(`value="${this.value()}"`);

    return `<cwr-status-pill ${attrs.join(' ')}></cwr-status-pill>`;
  });
}
