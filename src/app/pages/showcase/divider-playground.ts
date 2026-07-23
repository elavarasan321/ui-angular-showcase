import { Component, computed, signal } from '@angular/core';
import {
  BORDER_COLOR_MAP,
  BorderColorKey,
  DividerComponent,
  DividerOrientation,
  DividerSize,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 exports DividerOrientation/DividerSize as types only —
// the DIVIDER_ORIENTATIONS/DIVIDER_SIZES runtime consts declared in its .d.ts aren't actually
// present in the published bundle, so the option lists are hardcoded here to match the unions.
const DIVIDER_ORIENTATIONS: readonly DividerOrientation[] = ['horizontal', 'vertical'];
const DIVIDER_SIZES: readonly DividerSize[] = ['default', 'thick', 'thickest'];

// BorderColorKey is `keyof typeof BORDER_COLOR_MAP`, and BORDER_COLOR_MAP is actually exported
// from the compiled bundle, so its keys give the full, exhaustive color list.
const COLORS = Object.keys(BORDER_COLOR_MAP) as BorderColorKey[];

@Component({
  selector: 'app-divider-playground',
  standalone: true,
  imports: [DividerComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div
        playground-preview
        style="display: flex; align-items: center; justify-content: center; width: 100%;"
      >
        <cwr-divider
          [orientation]="orientation()"
          [size]="size()"
          [rounded]="rounded()"
          [color]="color()"
          [style.height]="orientation() === 'vertical' ? '3rem' : null"
        ></cwr-divider>
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Orientation</span>
          <select (change)="orientation.set($any($event.target).value)">
            @for (o of orientations; track o) {
              <option [value]="o" [selected]="o === orientation()">{{ o }}</option>
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
          <span>Color</span>
          <select (change)="color.set($any($event.target).value)">
            @for (c of colors; track c) {
              <option [value]="c" [selected]="c === color()">{{ c }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="rounded()"
            (change)="rounded.set($any($event.target).checked)"
          />
          Rounded
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
export class DividerPlayground {
  orientations = DIVIDER_ORIENTATIONS;
  sizes = DIVIDER_SIZES;
  colors = COLORS;

  orientation = signal<DividerOrientation>('horizontal');
  size = signal<DividerSize>('default');
  rounded = signal(true);
  color = signal<BorderColorKey>('color.border.surface');

  generatedCode = computed(() => {
    const attrs = [
      `orientation="${this.orientation()}"`,
      `size="${this.size()}"`,
      `color="${this.color()}"`,
    ];
    if (!this.rounded()) attrs.push(`[rounded]="false"`);
    if (this.orientation() === 'vertical') attrs.push(`style="height: 3rem;"`);
    return `<cwr-divider ${attrs.join(' ')}></cwr-divider>`;
  });
}
