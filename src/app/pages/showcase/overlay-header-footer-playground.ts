import { Component, computed, signal } from '@angular/core';
import {
  OverlayHeaderComponent,
  OverlayFooterComponent,
  ButtonComponent,
  OverlayHeaderDirection,
  OverlayFooterJustifyContent,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const OVERLAY_HEADER_DIRECTIONS: readonly OverlayHeaderDirection[] = ['row', 'column'];
const OVERLAY_FOOTER_JUSTIFY: readonly OverlayFooterJustifyContent[] = [
  'space-between',
  'flex-start',
  'flex-end',
  'center',
];

@Component({
  selector: 'app-overlay-header-footer-playground',
  standalone: true,
  imports: [OverlayHeaderComponent, OverlayFooterComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div
        playground-preview
        style="width: 100%; border: 1px solid var(--color-border-neutral-subtle, #e2e2e2); border-radius: var(--border-radius-md, 8px); overflow: hidden;"
      >
        <cwr-overlay-header
          [title]="title()"
          [introText]="introText()"
          illustration="illustration.document.awaiting-verification"
          [direction]="direction()"
        ></cwr-overlay-header>
        <cwr-overlay-footer [justifyContent]="justifyContent()">
          <span overlayFooterLeading>
            <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel"></cwr-button>
          </span>
          <span overlayFooterTrailing>
            <cwr-button variant="solid" intent="brand" size="sm" label="Confirm"></cwr-button>
          </span>
        </cwr-overlay-footer>
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
            [value]="direction()"
            (valueChange)="direction.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Footer justify">
          <cwr-picker-input
            [options]="justifyOptions | pickerOptions"
            [value]="justifyContent()"
            (valueChange)="justifyContent.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class OverlayHeaderFooterPlayground {
  directions = OVERLAY_HEADER_DIRECTIONS;
  justifyOptions = OVERLAY_FOOTER_JUSTIFY;

  title = signal('Verify your identity');
  introText = signal("We need a couple of documents to confirm who you are.");
  direction = signal<OverlayHeaderDirection>('row');
  justifyContent = signal<OverlayFooterJustifyContent>('space-between');

  generatedCode = computed(() => {
    return `<cwr-overlay-header
  title="${this.title()}"
  introText="${this.introText()}"
  illustration="illustration.document.awaiting-verification"
  direction="${this.direction()}"
></cwr-overlay-header>
<cwr-overlay-footer justifyContent="${this.justifyContent()}">
  <span overlayFooterLeading>
    <cwr-button variant="ghost" intent="neutral" size="sm" label="Cancel"></cwr-button>
  </span>
  <span overlayFooterTrailing>
    <cwr-button variant="solid" intent="brand" size="sm" label="Confirm"></cwr-button>
  </span>
</cwr-overlay-footer>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
