import { Component, computed, signal } from '@angular/core';
import {
  MenuButtonComponent,
  MenuComponent,
  ButtonComponent,
  CwrMenuItem,
  MenuButtonJustify,
  FormFieldComponent,
  PickerInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const MENU_BUTTON_JUSTIFY: readonly MenuButtonJustify[] = ['right', 'left'];

const MENU_ITEMS: CwrMenuItem[] = [
  { id: 'export', label: 'Export', leadingIcon: 'icon.ui.download' },
  { id: 'print', label: 'Print', leadingIcon: 'icon.ui.upload' },
  { id: 'divider-1', isDivider: true },
  { id: 'archive', label: 'Archive', leadingIcon: 'icon.ui.delete', isDestructive: true },
];

@Component({
  selector: 'app-menu-button-playground',
  standalone: true,
  imports: [MenuButtonComponent, MenuComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview style="padding-bottom: 9rem;">
        <cwr-menu-button [justify]="justify()">
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
        @if (lastSelected()) {
          <p style="margin-top: 1rem; font: var(--text-style-caption);">
            Last selected: <code>{{ lastSelected() }}</code>
          </p>
        }
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Justify">
          <cwr-picker-input
            [options]="justifyOptions | pickerOptions"
            [value]="justify()"
            (valueChange)="justify.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class MenuButtonPlayground {
  justifyOptions = MENU_BUTTON_JUSTIFY;
  items = MENU_ITEMS;

  justify = signal<MenuButtonJustify>('right');
  lastSelected = signal('');

  generatedCode = computed(() => {
    return `<cwr-menu-button justify="${this.justify()}">
  <cwr-button slot="button" variant="solid" intent="brand" label="Actions"></cwr-button>
  <cwr-menu slot="slot" #slotFocus aria-haspopup="menu" [items]="items" (itemSelected)="onSelect($event)" />
</cwr-menu-button>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
