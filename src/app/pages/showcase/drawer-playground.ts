import { Component, computed, signal } from '@angular/core';
import {
  DrawerComponent,
  ButtonComponent,
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

@Component({
  selector: 'app-drawer-playground',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent, Playground, FormFieldComponent, TextInputComponent, CheckboxComponent],
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
