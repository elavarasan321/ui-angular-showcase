import { Component, computed, signal } from '@angular/core';
import { DrawerComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

@Component({
  selector: 'app-drawer-playground',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview>
        <cwr-button
          variant="solid"
          intent="brand"
          size="sm"
          label="Open drawer"
          (buttonClick)="open.set(true)"
        ></cwr-button>

        @if (open()) {
          <cwr-drawer
            [title]="title()"
            [introText]="introText() || undefined"
            [dismissible]="dismissible()"
            (dismiss)="open.set(false)"
          >
            <p>Drawer body content goes here — often a form or a detail view.</p>
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
                label="Save"
                (buttonClick)="open.set(false)"
              ></cwr-button>
            </span>
          </cwr-drawer>
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

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="dismissible()"
            (change)="dismissible.set($any($event.target).checked)"
          />
          Dismissible
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
export class DrawerPlayground {
  open = signal(false);
  title = signal('Edit applicant details');
  introText = signal('');
  dismissible = signal(true);

  generatedCode = computed(() => {
    const attrs = [`title="${this.title()}"`];
    if (this.introText()) attrs.push(`introText="${this.introText()}"`);
    if (!this.dismissible()) attrs.push(`[dismissible]="false"`);

    return `<cwr-button label="Open drawer" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-drawer ${attrs.join(' ')} (dismiss)="open.set(false)">
    <p>Drawer body content goes here.</p>
    <span overlayFooterTrailing>
      <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel" (buttonClick)="open.set(false)"></cwr-button>
      <cwr-button variant="solid" intent="brand" size="sm" label="Save" (buttonClick)="open.set(false)"></cwr-button>
    </span>
  </cwr-drawer>
}`;
  });
}
