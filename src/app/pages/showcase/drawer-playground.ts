import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  DrawerComponent,
  ButtonComponent,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
  IllustrationKey,
  OverlayFooterJustifyContent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// OverlayFooterJustifyContent is exported as a type only (OVERLAY_FOOTER_JUSTIFY_CONTENT is
// declared but not exported), so the option list is hardcoded here to match the union.
const FOOTER_JUSTIFY: readonly OverlayFooterJustifyContent[] = [
  'space-between',
  'flex-end',
  'center',
  'flex-start',
];

// A small sample of IllustrationKey values — the full set lives on the Illustration page.
const ILLUSTRATIONS: readonly IllustrationKey[] = [
  'illustration.document.awaiting-verification',
  'illustration.document.complete',
  'illustration.employee.configure',
  'illustration.feature.checkintelligence-configure',
  'illustration.ui.no-results',
];

@Component({
  selector: 'app-drawer-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DrawerComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
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
            [illustration]="illustration() || undefined"
            [footerJustify]="footerJustify()"
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

        <cwr-form-field label="Illustration">
          <cwr-picker-input
            [options]="illustrations | pickerOptions: { label: '(none)', value: '' }"
            [value]="illustration()"
            (valueChange)="illustration.set($any($event))"
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
export class DrawerPlayground {
  illustrations = ILLUSTRATIONS;
  footerJustifyOptions = FOOTER_JUSTIFY;

  open = signal(false);
  title = signal('Edit applicant details');
  introText = signal('');
  // '' is the "(none)" sentinel so the control stays a primitive that syncs to the URL.
  illustration = signal<IllustrationKey | ''>('');
  footerJustify = signal<OverlayFooterJustifyContent>('space-between');
  dismissible = signal(true);

  generatedCode = computed(() => {
    const attrs = [`title="${this.title()}"`];
    if (this.introText()) attrs.push(`introText="${this.introText()}"`);
    if (this.illustration()) attrs.push(`illustration="${this.illustration()}"`);
    if (this.footerJustify() !== 'space-between') {
      attrs.push(`footerJustify="${this.footerJustify()}"`);
    }
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
