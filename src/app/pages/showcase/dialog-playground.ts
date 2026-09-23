import { Component, computed, signal } from '@angular/core';
import {
  DialogComponent,
  ButtonComponent,
  OverlayHeaderDirection,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const HEADER_DIRECTIONS: readonly OverlayHeaderDirection[] = ['row', 'column'];

@Component({
  selector: 'app-dialog-playground',
  standalone: true,
  imports: [DialogComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview>
        <cwr-button
          variant="solid"
          intent="brand"
          size="sm"
          label="Open dialog"
          (buttonClick)="open.set(true)"
        ></cwr-button>

        @if (open()) {
          <cwr-dialog
            [title]="title()"
            [introText]="introText()"
            illustration="illustration.document.awaiting-verification"
            [headerDirection]="headerDirection()"
            (dismiss)="open.set(false)"
          >
            <p>Dialog body content goes here.</p>
            <span overlayFooterTrailing>
              <cwr-button
                variant="ghost"
                intent="neutral"
                size="sm"
                label="Cancel"
                (buttonClick)="open.set(false)"
              ></cwr-button>
              <cwr-button
                variant="solid"
                intent="brand"
                size="sm"
                label="Confirm"
                (buttonClick)="open.set(false)"
              ></cwr-button>
            </span>
          </cwr-dialog>
        }
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
          <select (change)="headerDirection.set($any($event.target).value)">
            @for (d of directions; track d) {
              <option [value]="d" [selected]="d === headerDirection()">{{ d }}</option>
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
export class DialogPlayground {
  directions = HEADER_DIRECTIONS;

  open = signal(false);
  title = signal('Verify your identity');
  introText = signal('We need a couple of documents to confirm who you are.');
  headerDirection = signal<OverlayHeaderDirection>('column');

  generatedCode = computed(() => {
    return `<cwr-button label="Open dialog" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-dialog
    title="${this.title()}"
    introText="${this.introText()}"
    illustration="illustration.document.awaiting-verification"
    headerDirection="${this.headerDirection()}"
    (dismiss)="open.set(false)"
  >
    <p>Dialog body content goes here.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel" (buttonClick)="open.set(false)"></cwr-button>
      <cwr-button variant="solid" intent="brand" size="sm" label="Confirm" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-dialog>
}`;
  });
}
