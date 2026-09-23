import { Component, computed, signal } from '@angular/core';
import { ModalComponent, ButtonComponent, ModalSize } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const MODAL_SIZES: readonly ModalSize[] = ['sm', 'md', 'lg', 'xl'];

@Component({
  selector: 'app-modal-playground',
  standalone: true,
  imports: [ModalComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview>
        <cwr-button
          variant="solid"
          intent="brand"
          size="sm"
          label="Open modal"
          (buttonClick)="open.set(true)"
        ></cwr-button>

        @if (open()) {
          <cwr-modal
            [size]="size()"
            [title]="title()"
            introText="This action can't be undone."
            illustration="illustration.document.awaiting-verification"
            (dismiss)="open.set(false)"
          >
            <p>Modal body content goes here — forms, summaries, or any other projected markup.</p>
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
          </cwr-modal>
        }
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Title</span>
          <input type="text" [value]="title()" (input)="title.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Size</span>
          <select (change)="size.set($any($event.target).value)">
            @for (s of sizes; track s) {
              <option [value]="s" [selected]="s === size()">{{ s }}</option>
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
export class ModalPlayground {
  sizes = MODAL_SIZES;

  open = signal(false);
  title = signal('Delete this document?');
  size = signal<ModalSize>('sm');

  generatedCode = computed(() => {
    return `<cwr-button label="Open modal" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-modal
    size="${this.size()}"
    title="${this.title()}"
    introText="This action can't be undone."
    illustration="illustration.document.awaiting-verification"
    (dismiss)="open.set(false)"
  >
    <p>Modal body content goes here.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel" (buttonClick)="open.set(false)"></cwr-button>
      <cwr-button variant="solid" intent="brand" size="sm" label="Confirm" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-modal>
}`;
  });
}
