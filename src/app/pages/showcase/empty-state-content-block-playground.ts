import { Component, computed, signal } from '@angular/core';
import { EmptyStateContentBlockComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

@Component({
  selector: 'app-empty-state-content-block-playground',
  standalone: true,
  imports: [EmptyStateContentBlockComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-empty-state-content-block
        playground-preview
        style="width: 100%;"
        illustration="illustration.document.awaiting-verification"
        [title]="title()"
        [description]="description() || undefined"
        [hasActions]="hasActions()"
      >
        @if (hasActions()) {
          <cwr-button variant="solid" intent="brand" size="sm" [label]="actionLabel()"></cwr-button>
        }
      </cwr-empty-state-content-block>

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

        @if (hasActions()) {
          <label class="playground__field">
            <span>Action label</span>
            <input
              type="text"
              [value]="actionLabel()"
              (input)="actionLabel.set($any($event.target).value)"
            />
          </label>
        }

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hasActions()"
            (change)="hasActions.set($any($event.target).checked)"
          />
          Has actions
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
export class EmptyStateContentBlockPlayground {
  title = signal('No documents yet');
  description = signal('Upload a document to get started with verification.');
  hasActions = signal(true);
  actionLabel = signal('Upload document');

  generatedCode = computed(() => {
    const attrs = [
      `illustration="illustration.document.awaiting-verification"`,
      `title="${this.title()}"`,
    ];
    if (this.description()) attrs.push(`description="${this.description()}"`);
    if (this.hasActions()) attrs.push(`[hasActions]="true"`);

    if (this.hasActions()) {
      return `<cwr-empty-state-content-block ${attrs.join(' ')}>
  <cwr-button variant="solid" intent="brand" size="sm" label="${this.actionLabel()}"></cwr-button>
</cwr-empty-state-content-block>`;
    }

    return `<cwr-empty-state-content-block ${attrs.join(' ')}></cwr-empty-state-content-block>`;
  });
}
