import { Component, computed, signal } from '@angular/core';
import { BadgeComponent, BadgeEmphasis, BadgeIntent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

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
  imports: [BadgeComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-badge
        playground-preview
        [value]="value()"
        [intent]="intent()"
        [emphasis]="emphasis()"
        [hover]="hover()"
      ></cwr-badge>

      <ng-container playground-controls>
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
          <span>Emphasis</span>
          <select (change)="emphasis.set($any($event.target).value)">
            @for (e of emphases; track e) {
              <option [value]="e" [selected]="e === emphasis()">{{ e }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hover()"
            (change)="hover.set($any($event.target).checked)"
          />
          Hover
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
}
