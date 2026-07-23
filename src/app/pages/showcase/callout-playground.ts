import { Component, computed, signal } from '@angular/core';
import {
  CalloutComponent,
  ButtonComponent,
  CalloutVariant,
  CalloutDirection,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 exports CalloutVariant/CalloutDirection as types only —
// the CALLOUT_VARIANTS/CALLOUT_DIRECTIONS runtime consts declared in its .d.ts aren't actually
// present in the published bundle, so the option lists are hardcoded here to match the unions.
const CALLOUT_VARIANTS: readonly CalloutVariant[] = ['neutral', 'positive', 'warning', 'negative'];
const CALLOUT_DIRECTIONS: readonly CalloutDirection[] = ['row', 'column'];

@Component({
  selector: 'app-callout-playground',
  standalone: true,
  imports: [CalloutComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-callout
        playground-preview
        style="width: 100%;"
        [variant]="variant()"
        [direction]="direction()"
        [title]="title()"
        [hintText]="hintText() || undefined"
        [leadingIcon]="leadingIcon()"
        [hasActions]="hasActions()"
      >
        @if (hasActions()) {
          <cwr-button variant="outline" intent="neutral" size="sm" label="Dismiss"></cwr-button>
        }
      </cwr-callout>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Title</span>
          <input type="text" [value]="title()" (input)="title.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Hint text</span>
          <input
            type="text"
            [value]="hintText()"
            (input)="hintText.set($any($event.target).value)"
          />
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
          <span>Direction</span>
          <select (change)="direction.set($any($event.target).value)">
            @for (d of directions; track d) {
              <option [value]="d" [selected]="d === direction()">{{ d }}</option>
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
            [checked]="hasActions()"
            (change)="hasActions.set($any($event.target).checked)"
          />
          Has actions
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
export class CalloutPlayground {
  variants = CALLOUT_VARIANTS;
  directions = CALLOUT_DIRECTIONS;

  title = signal('Verification pending');
  hintText = signal('This can take up to two business days.');
  variant = signal<CalloutVariant>('neutral');
  direction = signal<CalloutDirection>('row');
  leadingIcon = signal(true);
  hasActions = signal(false);

  generatedCode = computed(() => {
    const attrs = [`title="${this.title()}"`, `variant="${this.variant()}"`, `direction="${this.direction()}"`];
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (!this.leadingIcon()) attrs.push(`[leadingIcon]="false"`);
    if (this.hasActions()) attrs.push(`[hasActions]="true"`);

    if (this.hasActions()) {
      return `<cwr-callout ${attrs.join(' ')}>
  <cwr-button variant="outline" intent="neutral" size="sm" label="Dismiss"></cwr-button>
</cwr-callout>`;
    }

    return `<cwr-callout ${attrs.join(' ')}></cwr-callout>`;
  });
}
