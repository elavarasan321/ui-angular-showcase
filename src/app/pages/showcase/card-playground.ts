import { Component, computed, signal } from '@angular/core';
import { CardComponent, ButtonComponent, CardSurface, CardEdge, CardLayout } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const CARD_SURFACES: readonly CardSurface[] = ['surface', 'raised-surface', 'lowered-surface'];
const CARD_EDGES: readonly CardEdge[] = ['inset', 'bleed'];
const CARD_LAYOUTS: readonly CardLayout[] = ['auto', 'inline', 'stacked'];

@Component({
  selector: 'app-card-playground',
  standalone: true,
  imports: [CardComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-card
        playground-preview
        style="width: 100%;"
        [title]="title()"
        [description]="description()"
        [surface]="surface()"
        [edge]="edge()"
        [layout]="layout()"
        [fill]="fill()"
      >
        <span cardHeaderTrailing>
          <cwr-button variant="outline" intent="neutral" size="sm" label="Action"></cwr-button>
        </span>
        This is the card's projected body content.
      </cwr-card>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Title</span>
          <input type="text" [value]="title()" (input)="title.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Description</span>
          <input
            type="text"
            [value]="description()"
            (input)="description.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Surface</span>
          <select (change)="surface.set($any($event.target).value)">
            @for (s of surfaces; track s) {
              <option [value]="s" [selected]="s === surface()">{{ s }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Edge</span>
          <select (change)="edge.set($any($event.target).value)">
            @for (e of edges; track e) {
              <option [value]="e" [selected]="e === edge()">{{ e }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Header layout</span>
          <select (change)="layout.set($any($event.target).value)">
            @for (l of layouts; track l) {
              <option [value]="l" [selected]="l === layout()">{{ l }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input type="checkbox" [checked]="fill()" (change)="fill.set($any($event.target).checked)" />
          Fill height
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
export class CardPlayground {
  surfaces = CARD_SURFACES;
  edges = CARD_EDGES;
  layouts = CARD_LAYOUTS;

  title = signal('Verification summary');
  description = signal('Everything we checked for this applicant');
  surface = signal<CardSurface>('surface');
  edge = signal<CardEdge>('inset');
  layout = signal<CardLayout>('auto');
  fill = signal(false);

  generatedCode = computed(() => {
    const attrs = [
      `title="${this.title()}"`,
      `surface="${this.surface()}"`,
      `edge="${this.edge()}"`,
      `layout="${this.layout()}"`,
    ];
    if (this.description()) attrs.push(`description="${this.description()}"`);
    if (this.fill()) attrs.push(`[fill]="true"`);

    return `<cwr-card ${attrs.join(' ')}>
  <span cardHeaderTrailing>
    <cwr-button variant="outline" intent="neutral" size="sm" label="Action"></cwr-button>
  </span>
  This is the card's projected body content.
</cwr-card>`;
  });
}
