import { Component, computed, signal } from '@angular/core';
import {
  DialogComponent,
  ButtonComponent,
  OverlayHeaderDirection,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const HEADER_DIRECTIONS: readonly OverlayHeaderDirection[] = ['row', 'column'];

@Component({
  selector: 'app-dialog-playground',
  standalone: true,
  imports: [DialogComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
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
        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Intro text">
          <cwr-text-input
            [value]="introText()"
            (valueChange)="introText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Header direction">
          <cwr-picker-input
            [options]="directions | pickerOptions"
            [value]="headerDirection()"
            (valueChange)="headerDirection.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
