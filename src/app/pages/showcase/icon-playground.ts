import { Component, computed, signal } from '@angular/core';
import {
  ICON_COLOR_MAP,
  ICON_MAP,
  IconColorKey,
  IconComponent,
  IconKey,
  IconSize,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares ICON_SIZES in its types but doesn't actually
// export it from the compiled bundle, so the option list is hardcoded here to match IconSize.
const SIZES: readonly IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const NONE_COLOR = '__none__';

@Component({
  selector: 'app-icon-playground',
  standalone: true,
  imports: [IconComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-icon
        playground-preview
        [icon]="icon()"
        [size]="size()"
        [color]="resolvedColor()"
      ></cwr-icon>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Icon</span>
          <select (change)="icon.set($any($event.target).value)">
            @for (i of iconKeys; track i) {
              <option [value]="i" [selected]="i === icon()">{{ i }}</option>
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
            <option value="${NONE_COLOR}" [selected]="color() === '${NONE_COLOR}'">(default)</option>
            @for (c of colorKeys; track c) {
              <option [value]="c" [selected]="c === color()">{{ c }}</option>
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
export class IconPlayground {
  iconKeys = Object.keys(ICON_MAP) as IconKey[];
  colorKeys = Object.keys(ICON_COLOR_MAP) as IconColorKey[];
  sizes = SIZES;

  icon = signal<IconKey>('icon.ui.placeholder');
  size = signal<IconSize>('md');
  color = signal<IconColorKey | typeof NONE_COLOR>(NONE_COLOR);

  resolvedColor = computed<IconColorKey | undefined>(() => {
    const color = this.color();
    return color === NONE_COLOR ? undefined : color;
  });

  generatedCode = computed(() => {
    const attrs = [`icon="${this.icon()}"`, `size="${this.size()}"`];
    if (this.color() !== NONE_COLOR) attrs.push(`color="${this.color()}"`);
    return `<cwr-icon ${attrs.join(' ')}></cwr-icon>`;
  });
}
