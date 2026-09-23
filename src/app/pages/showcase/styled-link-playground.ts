import { Component, computed, signal } from '@angular/core';
import { StyledLinkComponent, StyledLinkVariant } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const STYLED_LINK_VARIANTS: readonly StyledLinkVariant[] = ['default', 'neutral'];

@Component({
  selector: 'app-styled-link-playground',
  standalone: true,
  imports: [StyledLinkComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-styled-link
        playground-preview
        [variant]="variant()"
        [disabled]="disabled()"
        href="https://checkworkrights.com"
        [target]="target()"
        [trailingIcon]="trailingIcon()"
      >
        {{ label() }}
      </cwr-styled-link>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Variant</span>
          <select (change)="variant.set($any($event.target).value)">
            @for (v of variants; track v) {
              <option [value]="v" [selected]="v === variant()">{{ v }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showExternalIcon()"
            (change)="showExternalIcon.set($any($event.target).checked)"
          />
          External link icon
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
export class StyledLinkPlayground {
  variants = STYLED_LINK_VARIANTS;

  label = signal('View documentation');
  variant = signal<StyledLinkVariant>('default');
  showExternalIcon = signal(true);
  disabled = signal(false);

  target = computed(() => (this.showExternalIcon() ? '_blank' : undefined));
  trailingIcon = computed(() => (this.showExternalIcon() ? 'icon.ui.external-link' : null));

  generatedCode = computed(() => {
    const attrs = [`variant="${this.variant()}"`, `href="https://checkworkrights.com"`];
    if (this.showExternalIcon()) attrs.push(`target="_blank"`);
    else attrs.push(`[trailingIcon]="null"`);
    if (this.disabled()) attrs.push(`[disabled]="true"`);

    return `<cwr-styled-link ${attrs.join(' ')}>${this.label()}</cwr-styled-link>`;
  });
}
