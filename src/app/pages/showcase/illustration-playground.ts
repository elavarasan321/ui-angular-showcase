import { Component, computed, signal } from '@angular/core';
import {
  ICON_COLOR_MAP,
  ILLUSTRATION_MAP,
  IllustrationColorKey,
  IllustrationComponent,
  IllustrationKey,
  IllustrationSize,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares ILLUSTRATION_SIZES in its types but doesn't
// actually export it from the compiled bundle, so the option list is hardcoded here to match
// IllustrationSize.
const SIZES: readonly IllustrationSize[] = ['xs', 'sm', 'md', 'lg'];

// IllustrationColorKey is `keyof typeof ICON_COLOR_MAP`, so the icon color map's keys double as
// the valid primary/secondary color overrides.
const NONE_COLOR = '__none__';

@Component({
  selector: 'app-illustration-playground',
  standalone: true,
  imports: [IllustrationComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-illustration
        playground-preview
        [illustration]="illustration()"
        [size]="size()"
        [primaryColor]="resolvedPrimaryColor()"
        [secondaryColor]="resolvedSecondaryColor()"
        [primaryOpacity]="primaryOpacity() || undefined"
        [secondaryOpacity]="secondaryOpacity() || undefined"
      ></cwr-illustration>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Illustration</span>
          <select (change)="illustration.set($any($event.target).value)">
            @for (i of illustrationKeys; track i) {
              <option [value]="i" [selected]="i === illustration()">{{ i }}</option>
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
          <span>Primary color</span>
          <select
            (change)="primaryColor.set($any($event.target).value)"
          >
            <option value="${NONE_COLOR}" [selected]="primaryColor() === '${NONE_COLOR}'">(default)</option>
            @for (c of colorKeys; track c) {
              <option [value]="c" [selected]="c === primaryColor()">{{ c }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Secondary color</span>
          <select
            (change)="secondaryColor.set($any($event.target).value)"
          >
            <option value="${NONE_COLOR}" [selected]="secondaryColor() === '${NONE_COLOR}'">(default)</option>
            @for (c of colorKeys; track c) {
              <option [value]="c" [selected]="c === secondaryColor()">{{ c }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Primary opacity</span>
          <input
            type="text"
            [value]="primaryOpacity()"
            (input)="primaryOpacity.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Secondary opacity</span>
          <input
            type="text"
            [value]="secondaryOpacity()"
            (input)="secondaryOpacity.set($any($event.target).value)"
          />
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
export class IllustrationPlayground {
  illustrationKeys = Object.keys(ILLUSTRATION_MAP) as IllustrationKey[];
  colorKeys = Object.keys(ICON_COLOR_MAP) as IllustrationColorKey[];
  sizes = SIZES;

  illustration = signal<IllustrationKey>('illustration.document.complete');
  size = signal<IllustrationSize>('md');
  primaryColor = signal<IllustrationColorKey | typeof NONE_COLOR>(NONE_COLOR);
  secondaryColor = signal<IllustrationColorKey | typeof NONE_COLOR>(NONE_COLOR);
  primaryOpacity = signal('');
  secondaryOpacity = signal('');

  resolvedPrimaryColor = computed<IllustrationColorKey | undefined>(() => {
    const color = this.primaryColor();
    return color === NONE_COLOR ? undefined : color;
  });

  resolvedSecondaryColor = computed<IllustrationColorKey | undefined>(() => {
    const color = this.secondaryColor();
    return color === NONE_COLOR ? undefined : color;
  });

  generatedCode = computed(() => {
    const attrs = [`illustration="${this.illustration()}"`, `size="${this.size()}"`];
    if (this.primaryColor() !== NONE_COLOR) attrs.push(`primaryColor="${this.primaryColor()}"`);
    if (this.secondaryColor() !== NONE_COLOR) {
      attrs.push(`secondaryColor="${this.secondaryColor()}"`);
    }
    if (this.primaryOpacity()) attrs.push(`primaryOpacity="${this.primaryOpacity()}"`);
    if (this.secondaryOpacity()) attrs.push(`secondaryOpacity="${this.secondaryOpacity()}"`);
    return `<cwr-illustration ${attrs.join(' ')}></cwr-illustration>`;
  });
}
