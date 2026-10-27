import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ListboxComponent,
  ListboxFocusMode,
  ListboxGroup,
  ListboxOptionCheckedChange,
  ListboxOptionData,
  FormFieldComponent,
  TextInputComponent,
  CheckboxComponent,
  PickerInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// Hardcoded to match the union, as with the other playgrounds.
const LISTBOX_FOCUS_MODES: readonly ListboxFocusMode[] = ['roving', 'activedescendant'];

const GROUPS: ListboxGroup[] = [
  {
    label: 'Oceania',
    options: [
      { id: 'au', label: 'Australia', value: 'au' },
      { id: 'nz', label: 'New Zealand', value: 'nz' },
    ],
  },
  {
    label: 'Asia',
    options: [
      { id: 'sg', label: 'Singapore', value: 'sg', hintText: 'Regional HQ' },
      { id: 'in', label: 'India', value: 'in' },
      { id: 'jp', label: 'Japan', value: 'jp', disabled: true },
    ],
  },
];

@Component({
  selector: 'app-listbox-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ListboxComponent,
    Playground,
    FormFieldComponent,
    TextInputComponent,
    CheckboxComponent,
    PickerInputComponent,
    PickerOptionsPipe,
  ],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview class="listbox-preview">
        <cwr-listbox
          [groups]="groups()"
          [showHeader]="showHeader()"
          [showFooter]="showFooter()"
          [allowVerticalScrolling]="allowVerticalScrolling()"
          [hasFocus]="hasFocus()"
          [multiSelect]="multiSelect()"
          [focusMode]="focusMode()"
          [searchValue]="searchValue()"
          (searchValueChange)="searchValue.set($event)"
          [searchPlaceholder]="searchPlaceholder()"
          [footerLabel]="footerLabel()"
          footerLeadingIcon="icon.ui.add"
          (optionClick)="onOptionClick($event)"
          (optionCheckedChange)="onOptionCheckedChange($event)"
          (footerActionClicked)="lastEvent.set('footerActionClicked')"
        ></cwr-listbox>
        <p class="listbox-preview__log">Last event: {{ lastEvent() }}</p>
      </div>

      <ng-container playground-controls>
        <cwr-form-field
          label="Focus mode"
          hintText="activedescendant keeps focus in the search input; needs the header."
        >
          <cwr-picker-input
            [options]="focusModes | pickerOptions"
            [value]="focusMode()"
            (valueChange)="focusMode.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Search placeholder">
          <cwr-text-input
            [value]="searchPlaceholder()"
            (valueChange)="searchPlaceholder.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Footer label">
          <cwr-text-input
            [value]="footerLabel()"
            (valueChange)="footerLabel.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Show header"
          [checked]="showHeader()"
          (checkedChange)="showHeader.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Show footer"
          [checked]="showFooter()"
          (checkedChange)="showFooter.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Allow vertical scrolling"
          [checked]="allowVerticalScrolling()"
          (checkedChange)="allowVerticalScrolling.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Multi-select"
          [checked]="multiSelect()"
          (checkedChange)="multiSelect.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Has focus (outline)"
          [checked]="hasFocus()"
          (checkedChange)="hasFocus.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .listbox-preview {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm, 0.75rem);
        width: 100%;
        max-width: 20rem;
      }

      .listbox-preview__log {
        margin: 0;
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }



    `,
  ],
})
export class ListboxPlayground {
  // Holds the checked state while multi-select is on; an array, so it stays out of the URL.
  groups = signal<ListboxGroup[]>(GROUPS);
  focusModes = LISTBOX_FOCUS_MODES;

  showHeader = signal(true);
  showFooter = signal(true);
  allowVerticalScrolling = signal(false);
  hasFocus = signal(false);
  multiSelect = signal(false);
  focusMode = signal<ListboxFocusMode>('roving');
  searchValue = signal('');
  searchPlaceholder = signal('Search countries');
  footerLabel = signal('Add a country');
  lastEvent = signal('none yet');

  onOptionClick(option: ListboxOptionData): void {
    this.lastEvent.set(`optionClick: ${option.label}`);
  }

  onOptionCheckedChange(change: ListboxOptionCheckedChange): void {
    this.lastEvent.set(`optionCheckedChange: ${change.option.label} → ${change.checked}`);
    this.groups.update((groups) =>
      groups.map((group) => ({
        ...group,
        options: group.options.map((option) =>
          option.id === change.option.id ? { ...option, checked: change.checked } : option,
        ),
      })),
    );
  }

  generatedCode = computed(() => {
    const groupsLiteral = JSON.stringify(GROUPS, null, 2);
    const attrs = [`[groups]="groups"`];
    if (!this.showHeader()) attrs.push(`[showHeader]="false"`);
    if (!this.showFooter()) attrs.push(`[showFooter]="false"`);
    if (this.allowVerticalScrolling()) attrs.push(`[allowVerticalScrolling]="true"`);
    if (this.hasFocus()) attrs.push(`[hasFocus]="true"`);
    if (this.multiSelect()) attrs.push(`[multiSelect]="true"`);
    if (this.focusMode() !== 'roving') attrs.push(`focusMode="${this.focusMode()}"`);
    attrs.push(`searchPlaceholder="${this.searchPlaceholder()}"`);
    attrs.push(`footerLabel="${this.footerLabel()}"`);
    return `groups = ${groupsLiteral};

<cwr-listbox
  ${attrs.join('\n  ')}
  [searchValue]="searchValue"
  (searchValueChange)="searchValue = $event"
  (optionClick)="onOptionClick($event)"
></cwr-listbox>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
