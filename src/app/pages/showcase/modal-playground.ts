import { Component, computed, signal } from '@angular/core';
import {
  ModalComponent,
  ButtonComponent,
  ModalSize,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const MODAL_SIZES: readonly ModalSize[] = ['sm', 'md', 'lg', 'xl'];

@Component({
  selector: 'app-modal-playground',
  standalone: true,
  imports: [ModalComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
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
        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
