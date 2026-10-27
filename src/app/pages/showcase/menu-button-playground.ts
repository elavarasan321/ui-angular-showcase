import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  MenuButtonComponent,
  MenuComponent,
  ButtonComponent,
  CheckboxComponent,
  CwrMenuItem,
  MenuButtonJustify,
  MenuButtonPlacement,
  FormFieldComponent,
  PickerInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const MENU_BUTTON_JUSTIFY: readonly MenuButtonJustify[] = ['right', 'left'];
const MENU_BUTTON_PLACEMENTS: readonly MenuButtonPlacement[] = ['below', 'above'];

const MENU_ITEMS: CwrMenuItem[] = [
  { id: 'export', label: 'Export', leadingIcon: 'icon.ui.download' },
  { id: 'print', label: 'Print', leadingIcon: 'icon.ui.upload' },
  { id: 'divider-1', isDivider: true },
  { id: 'archive', label: 'Archive', leadingIcon: 'icon.ui.delete', isDestructive: true },
];

@Component({
  selector: 'app-menu-button-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenuButtonComponent,
    MenuComponent,
    ButtonComponent,
    CheckboxComponent,
    Playground,
    FormFieldComponent,
    PickerInputComponent,
    PickerOptionsPipe,
  ],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview style="padding-block: 9rem;">
        <cwr-menu-button
          [justify]="justify()"
          [justifyFixed]="justifyFixed()"
          [placement]="placement()"
          [placementFixed]="placementFixed()"
          [closeOnActivate]="closeOnActivate()"
          (openChange)="isMenuOpen.set($event)"
        >
          <cwr-button
            slot="button"
            variant="solid"
            intent="brand"
            label="Actions"
          ></cwr-button>
          <cwr-menu
            slot="slot"
            #slotFocus
            aria-haspopup="menu"
            [items]="items"
            (itemSelected)="lastSelected.set($event)"
          />
        </cwr-menu-button>
        <p style="margin-top: 1rem; font: var(--text-style-caption);">
          openChange: <code>{{ isMenuOpen() }}</code>
          @if (lastSelected()) {
            · Last selected: <code>{{ lastSelected() }}</code>
          }
        </p>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Justify">
          <cwr-picker-input
            [options]="justifyOptions | pickerOptions"
            [value]="justify()"
            (valueChange)="justify.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Placement">
          <cwr-picker-input
            [options]="placementOptions | pickerOptions"
            [value]="placement()"
            (valueChange)="placement.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Justify fixed"
          [checked]="justifyFixed()"
          (checkedChange)="justifyFixed.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Placement fixed"
          [checked]="placementFixed()"
          (checkedChange)="placementFixed.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Close on Enter / Space"
          [checked]="closeOnActivate()"
          (checkedChange)="closeOnActivate.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class MenuButtonPlayground {
  justifyOptions = MENU_BUTTON_JUSTIFY;
  placementOptions = MENU_BUTTON_PLACEMENTS;
  items = MENU_ITEMS;

  justify = signal<MenuButtonJustify>('right');
  justifyFixed = signal(false);
  placement = signal<MenuButtonPlacement>('below');
  placementFixed = signal(false);
  closeOnActivate = signal(true);
  lastSelected = signal('');
  // Runtime state, not a setting: kept out of the URL below.
  isMenuOpen = signal(false);

  generatedCode = computed(() => {
    const attrs = [`justify="${this.justify()}"`];
    if (this.justifyFixed()) attrs.push(`[justifyFixed]="true"`);
    if (this.placement() !== 'below') attrs.push(`placement="${this.placement()}"`);
    if (this.placementFixed()) attrs.push(`[placementFixed]="true"`);
    if (!this.closeOnActivate()) attrs.push(`[closeOnActivate]="false"`);
    attrs.push(`(openChange)="onOpenChange($event)"`);
    return `<cwr-menu-button ${attrs.join(' ')}>
  <cwr-button slot="button" variant="solid" intent="brand" label="Actions"></cwr-button>
  <cwr-menu slot="slot" #slotFocus aria-haspopup="menu" [items]="items" (itemSelected)="onSelect($event)" />
</cwr-menu-button>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this, ['isMenuOpen']);
}
