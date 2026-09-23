import { Component, computed, signal } from '@angular/core';
import {
  MenuButtonComponent,
  MenuComponent,
  ButtonComponent,
  CwrMenuItem,
  MenuButtonJustify,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

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
  imports: [MenuButtonComponent, MenuComponent, ButtonComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
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
        <label class="playground__field">
          <span>Justify</span>
          <select (change)="justify.set($any($event.target).value)">
            @for (j of justifyOptions; track j) {
              <option [value]="j" [selected]="j === justify()">{{ j }}</option>
            }
          </select>
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }
    `,
  ],
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
}
