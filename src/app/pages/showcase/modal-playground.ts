import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ModalComponent,
  ButtonComponent,
  ModalSize,
  OverlayFooterJustifyContent,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const MODAL_SIZES: readonly ModalSize[] = ['sm', 'md', 'lg', 'xl'];
// OverlayFooterJustifyContent is exported as a type only (OVERLAY_FOOTER_JUSTIFY_CONTENT is
// declared but not exported), so the option list is hardcoded here to match the union.
const FOOTER_JUSTIFY: readonly OverlayFooterJustifyContent[] = [
  'space-between',
  'flex-end',
  'center',
  'flex-start',
];

@Component({
  selector: 'app-modal-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
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
            [dismissible]="dismissible()"
            [footerJustify]="footerJustify()"
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
export class ModalPlayground {
  sizes = MODAL_SIZES;
  footerJustifyOptions = FOOTER_JUSTIFY;

  open = signal(false);
  title = signal('Delete this document?');
  size = signal<ModalSize>('sm');
  // Footer Cancel/Confirm buttons always close the preview, so turning this off can't trap you.
  dismissible = signal(true);
  footerJustify = signal<OverlayFooterJustifyContent>('space-between');

  generatedCode = computed(() => {
    const extra: string[] = [];
    if (this.footerJustify() !== 'space-between') {
      extra.push(`\n    footerJustify="${this.footerJustify()}"`);
    }
    if (!this.dismissible()) extra.push(`\n    [dismissible]="false"`);

    return `<cwr-button label="Open modal" (buttonClick)="open.set(true)"></cwr-button>

@if (open()) {
  <cwr-modal
    size="${this.size()}"
    title="${this.title()}"
    introText="This action can't be undone."
    illustration="illustration.document.awaiting-verification"${extra.join('')}
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
