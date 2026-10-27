import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  DialogComponent,
  ButtonComponent,
  OverlayHeaderDirection,
  OverlayFooterJustifyContent,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const HEADER_DIRECTIONS: readonly OverlayHeaderDirection[] = ['row', 'column'];
// OverlayFooterJustifyContent is exported as a type only (OVERLAY_FOOTER_JUSTIFY_CONTENT is
// declared but not exported), so the option list is hardcoded here to match the union.
const FOOTER_JUSTIFY: readonly OverlayFooterJustifyContent[] = [
  'space-between',
  'flex-end',
  'center',
  'flex-start',
];

@Component({
  selector: 'app-dialog-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
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
            [dismissible]="dismissible()"
            [footerJustify]="footerJustify()"
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

        <cwr-form-field label="Footer justify">
          <cwr-picker-input
            [options]="footerJustifyOptions | pickerOptions"
            [value]="footerJustify()"
            (valueChange)="footerJustify.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Dismissible"
          [checked]="dismissible()"
          (checkedChange)="dismissible.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class DialogPlayground {
  directions = HEADER_DIRECTIONS;
  footerJustifyOptions = FOOTER_JUSTIFY;

  open = signal(false);
  title = signal('Verify your identity');
  introText = signal('We need a couple of documents to confirm who you are.');
  headerDirection = signal<OverlayHeaderDirection>('column');
  // Footer Cancel/Confirm buttons always close the preview, so turning this off can't trap you.
  dismissible = signal(true);
  footerJustify = signal<OverlayFooterJustifyContent>('space-between');

  generatedCode = computed(() => {
    const extra: string[] = [];
    if (!this.dismissible()) extra.push(`\n    [dismissible]="false"`);
    if (this.footerJustify() !== 'space-between') {
      extra.push(`\n    footerJustify="${this.footerJustify()}"`);
    }

    return `<cwr-button label="Open dialog" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-dialog
    title="${this.title()}"
    introText="${this.introText()}"
    illustration="illustration.document.awaiting-verification"
    headerDirection="${this.headerDirection()}"${extra.join('')}
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
