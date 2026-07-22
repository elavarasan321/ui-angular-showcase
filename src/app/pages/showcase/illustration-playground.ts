import { Component, computed, signal } from '@angular/core';
import {
  ILLUSTRATION_MAP,
  IllustrationComponent,
  IllustrationKey,
  IllustrationSize,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares ILLUSTRATION_SIZES in its types but doesn't
// actually export it from the compiled bundle, so the option list is hardcoded here to match
// IllustrationSize.
const SIZES: readonly IllustrationSize[] = ['xs', 'sm', 'md', 'lg'];

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
      ></cwr-illustration>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Illustration</span>
          <select [value]="illustration()" (change)="illustration.set($any($event.target).value)">
            @for (i of illustrationKeys; track i) {
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
  sizes = SIZES;

  illustration = signal<IllustrationKey>('illustration.document.complete');
  size = signal<IllustrationSize>('md');

  generatedCode = computed(
    () => `<cwr-illustration illustration="${this.illustration()}" size="${this.size()}"></cwr-illustration>`,
  );
}
