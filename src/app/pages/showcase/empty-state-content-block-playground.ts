import { Component, computed, signal } from '@angular/core';
import {
  EmptyStateContentBlockComponent,
  ButtonComponent,
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

@Component({
  selector: 'app-empty-state-content-block-playground',
  standalone: true,
  imports: [EmptyStateContentBlockComponent, ButtonComponent, Playground, FormFieldComponent, TextInputComponent, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
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
        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Description">
          <cwr-text-input
            [value]="description()"
            (valueChange)="description.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        @if (hasActions()) {
          <cwr-form-field label="Action label">
            <cwr-text-input
              [value]="actionLabel()"
              (valueChange)="actionLabel.set($event)"
            ></cwr-text-input>
          </cwr-form-field>
        }

        <cwr-checkbox
          label="Has actions"
          [checked]="hasActions()"
          (checkedChange)="hasActions.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
