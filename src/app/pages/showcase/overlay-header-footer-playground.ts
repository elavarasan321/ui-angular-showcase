import { Component, computed, signal } from '@angular/core';
import {
  OverlayHeaderComponent,
  OverlayFooterComponent,
  ButtonComponent,
  OverlayHeaderDirection,
  OverlayFooterJustifyContent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const OVERLAY_HEADER_DIRECTIONS: readonly OverlayHeaderDirection[] = ['row', 'column'];
const OVERLAY_FOOTER_JUSTIFY: readonly OverlayFooterJustifyContent[] = [
  'space-between',
  'flex-start',
  'flex-end',
  'center',
];

@Component({
  selector: 'app-overlay-header-footer-playground',
  standalone: true,
  imports: [OverlayHeaderComponent, OverlayFooterComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div
        playground-preview
        style="width: 100%; border: 1px solid var(--color-border-neutral-subtle, #e2e2e2); border-radius: var(--border-radius-md, 8px); overflow: hidden;"
      >
        <cwr-overlay-header
          [title]="title()"
          [introText]="introText()"
          illustration="illustration.document.awaiting-verification"
          [direction]="direction()"
        ></cwr-overlay-header>
        <cwr-overlay-footer [justifyContent]="justifyContent()">
          <span overlayFooterLeading>
            <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel"></cwr-button>
          </span>
          <span overlayFooterTrailing>
            <cwr-button variant="solid" intent="brand" size="sm" label="Confirm"></cwr-button>
          </span>
        </cwr-overlay-footer>
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Title</span>
          <input type="text" [value]="title()" (input)="title.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Intro text</span>
          <input
            type="text"
            [value]="introText()"
            (input)="introText.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Header direction</span>
          <select (change)="direction.set($any($event.target).value)">
            @for (d of directions; track d) {
              <option [value]="d" [selected]="d === direction()">{{ d }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Footer justify</span>
          <select (change)="justifyContent.set($any($event.target).value)">
            @for (j of justifyOptions; track j) {
              <option [value]="j" [selected]="j === justifyContent()">{{ j }}</option>
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
    `,
  ],
})
export class OverlayHeaderFooterPlayground {
  directions = OVERLAY_HEADER_DIRECTIONS;
  justifyOptions = OVERLAY_FOOTER_JUSTIFY;

  title = signal('Verify your identity');
  introText = signal("We need a couple of documents to confirm who you are.");
  direction = signal<OverlayHeaderDirection>('row');
  justifyContent = signal<OverlayFooterJustifyContent>('space-between');

  generatedCode = computed(() => {
    return `<cwr-overlay-header
  title="${this.title()}"
  introText="${this.introText()}"
  illustration="illustration.document.awaiting-verification"
  direction="${this.direction()}"
></cwr-overlay-header>
<cwr-overlay-footer justifyContent="${this.justifyContent()}">
  <span overlayFooterLeading>
    <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel"></cwr-button>
  </span>
  <span overlayFooterTrailing>
    <cwr-button variant="solid" intent="brand" size="sm" label="Confirm"></cwr-button>
  </span>
</cwr-overlay-footer>`;
  });
}
