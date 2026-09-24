import { Component, computed, signal } from '@angular/core';
import type { TitleBlockVariant } from '@checkworkrights/ui-angular';
import {
  ButtonComponent,
  IconButtonComponent,
  TitleBlockComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const VARIANTS: readonly TitleBlockVariant[] = ['title', 'section'];

@Component({
  selector: 'app-title-block-playground',
  standalone: true,
  imports: [TitleBlockComponent, ButtonComponent, IconButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview style="width: 100%;">
        <cwr-title-block [variant]="variant()" [title]="title()">
          @if (showLeading()) {
            <cwr-icon-button
              titleBlockLeadingSlot
              icon="icon.ui.direction-left"
              label="Back"
              variant="ghost"
            ></cwr-icon-button>
          }
          @if (showTrailing()) {
            <cwr-button
              titleBlockTrailingSlot
              variant="outline"
              intent="neutral"
              size="sm"
              label="Edit"
            ></cwr-button>
          }
          @if (showEnd()) {
            <p
              titleBlockEndSlot
              style="font: var(--text-style-body); color: var(--color-text-surface-secondary); margin: 0;"
            >
              Contractor · Onboarded 12 Mar 2025
            </p>
          }
        </cwr-title-block>
      </div>

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
          <span>Title</span>
          <input
            type="text"
            [value]="title()"
            (input)="title.set($any($event.target).value)"
          />
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showLeading()"
            (change)="showLeading.set($any($event.target).checked)"
          />
          Leading slot
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showTrailing()"
            (change)="showTrailing.set($any($event.target).checked)"
          />
          Trailing slot
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showEnd()"
            (change)="showEnd.set($any($event.target).checked)"
          />
          End slot
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
export class TitleBlockPlayground {
  variants = VARIANTS;

  variant = signal<TitleBlockVariant>('title');
  title = signal('Jordan Smith');
  showLeading = signal(true);
  showTrailing = signal(true);
  showEnd = signal(true);

  generatedCode = computed(() => {
    const lines = [`<cwr-title-block variant="${this.variant()}" title="${this.title()}">`];
    if (this.showLeading()) {
      lines.push(
        `  <cwr-icon-button titleBlockLeadingSlot icon="icon.ui.direction-left" label="Back" variant="ghost"></cwr-icon-button>`,
      );
    }
    if (this.showTrailing()) {
      lines.push(
        `  <cwr-button titleBlockTrailingSlot variant="outline" intent="neutral" size="sm" label="Edit"></cwr-button>`,
      );
    }
    if (this.showEnd()) {
      lines.push(`  <p titleBlockEndSlot>Contractor · Onboarded 12 Mar 2025</p>`);
    }
    lines.push('</cwr-title-block>');
    return lines.join('\n');
  });
}
