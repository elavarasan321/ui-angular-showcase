import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ButtonComponent,
  CheckboxComponent,
  FormFieldComponent,
  ListboxComponent,
  ListboxGroup,
  PickerInputComponent,
  PopupAlign,
  PopupComponent,
  PopupPlacement,
  PopupWidth,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// Hardcoded to match the unions, as with the other playgrounds — the published bundle doesn't
// reliably ship the POPUP_*_VALUES runtime consts declared in its .d.ts.
const POPUP_WIDTHS: readonly PopupWidth[] = ['content', 'trigger'];
const POPUP_ALIGNS: readonly PopupAlign[] = ['start', 'end'];
const POPUP_PLACEMENTS: readonly PopupPlacement[] = ['below', 'above'];
const DEFAULT_OFFSET = 'var(--space-2xs)';

const COUNTRIES = ['Australia', 'New Zealand', 'United Kingdom', 'United States', 'Canada'];

const LISTBOX_GROUPS: ListboxGroup[] = [
  { options: COUNTRIES.map((label) => ({ id: label, label, value: label })) },
];

@Component({
  selector: 'app-popup-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PopupComponent,
    ButtonComponent,
    ListboxComponent,
    Playground,
    FormFieldComponent,
    PickerInputComponent,
    TextInputComponent,
    CheckboxComponent,
    PickerOptionsPipe,
  ],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview class="popup-playground__stage">
        <div class="popup-playground__anchor">
          <cwr-button
            variant="outline"
            intent="neutral"
            [label]="open() ? 'Close popup' : 'Open popup'"
            (buttonClick)="open.set(!open())"
          ></cwr-button>
          @if (open()) {
            <cwr-popup
              [width]="width()"
              [align]="align()"
              [alignFixed]="alignFixed()"
              [placement]="placement()"
              [placementFixed]="placementFixed()"
              [offset]="offset()"
            >
              <cwr-listbox [groups]="groups" [showHeader]="false" [showFooter]="false"></cwr-listbox>
            </cwr-popup>
          }
        </div>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Width">
          <cwr-picker-input
            [options]="widths | pickerOptions"
            [value]="width()"
            (valueChange)="width.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Placement">
          <cwr-picker-input
            [options]="placements | pickerOptions"
            [value]="placement()"
            (valueChange)="placement.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Align">
          <cwr-picker-input
            [options]="aligns | pickerOptions"
            [value]="align()"
            (valueChange)="align.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Offset">
          <cwr-text-input
            [value]="offset()"
            (valueChange)="offset.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Placement fixed"
          [checked]="placementFixed()"
          (checkedChange)="placementFixed.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Align fixed"
          [checked]="alignFixed()"
          (checkedChange)="alignFixed.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .popup-playground__stage {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-block: 15rem;
      }

      /* cwr-popup positions against its parent, so the anchor must be a positioning context. */
      .popup-playground__anchor {
        position: relative;
        width: 16rem;
      }

      .popup-playground__anchor cwr-button {
        display: block;
      }
    `,
  ],
})
export class PopupPlayground {
  widths = POPUP_WIDTHS;
  aligns = POPUP_ALIGNS;
  placements = POPUP_PLACEMENTS;
  groups = LISTBOX_GROUPS;

  width = signal<PopupWidth>('content');
  placement = signal<PopupPlacement>('below');
  align = signal<PopupAlign>('start');
  offset = signal(DEFAULT_OFFSET);
  placementFixed = signal(false);
  alignFixed = signal(false);
  open = signal(true);

  generatedCode = computed(() => {
    const attrs: string[] = [];
    if (this.width() !== 'content') attrs.push(`width="${this.width()}"`);
    if (this.placement() !== 'below') attrs.push(`placement="${this.placement()}"`);
    if (this.align() !== 'start') attrs.push(`align="${this.align()}"`);
    if (this.offset() !== DEFAULT_OFFSET) attrs.push(`offset="${this.offset()}"`);
    if (this.placementFixed()) attrs.push(`[placementFixed]="true"`);
    if (this.alignFixed()) attrs.push(`[alignFixed]="true"`);
    const popupAttrs = attrs.length ? ` ${attrs.join(' ')}` : '';
    return `<!-- The anchor must be the popup's positioning context. -->
<div style="position: relative">
  <cwr-button variant="outline" intent="neutral" label="Open popup" (buttonClick)="open = !open"></cwr-button>
  @if (open) {
    <cwr-popup${popupAttrs}>
      <cwr-listbox [groups]="groups" [showHeader]="false" [showFooter]="false"></cwr-listbox>
    </cwr-popup>
  }
</div>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
