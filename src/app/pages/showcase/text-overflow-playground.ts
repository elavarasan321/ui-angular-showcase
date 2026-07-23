import { Component, computed, signal } from '@angular/core';
import {
  TextOverflowComponent,
  TextOverflowPosition,
  TextOverflowTruncation,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 declares TextOverflowTruncation/TextOverflowPosition as plain
// string literal unions (not exported readonly array consts), so the option lists are hardcoded
// here to match those unions.
const TRUNCATIONS: readonly TextOverflowTruncation[] = ['trailing', 'middle'];
const POSITIONS: readonly TextOverflowPosition[] = ['top', 'bottom'];

@Component({
  selector: 'app-text-overflow-playground',
  standalone: true,
  imports: [TextOverflowComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview style="width: 220px; display: inline-block;">
        <cwr-text-overflow
          [text]="text()"
          [truncation]="truncation()"
          [position]="position()"
        ></cwr-text-overflow>
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Text</span>
          <input type="text" [value]="text()" (input)="text.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Truncation</span>
          <select (change)="truncation.set($any($event.target).value)">
            @for (t of truncations; track t) {
              <option [value]="t" [selected]="t === truncation()">{{ t }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Position</span>
          <select (change)="position.set($any($event.target).value)">
            @for (p of positions; track p) {
              <option [value]="p" [selected]="p === position()">{{ p }}</option>
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
export class TextOverflowPlayground {
  truncations = TRUNCATIONS;
  positions = POSITIONS;

  text = signal('A very long piece of text that will not fit in the available space');
  truncation = signal<TextOverflowTruncation>('trailing');
  position = signal<TextOverflowPosition>('top');

  generatedCode = computed(() => {
    return `<div style="width: 220px; display: inline-block;">
  <cwr-text-overflow text="${this.text()}" truncation="${this.truncation()}" position="${this.position()}"></cwr-text-overflow>
</div>`;
  });
}
