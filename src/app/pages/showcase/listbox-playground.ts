import { Component, computed, signal } from '@angular/core';
import {
  ListboxComponent,
  ListboxGroup,
  ListboxOptionCheckedChange,
  ListboxOptionData,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

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
  standalone: true,
  imports: [ListboxComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview class="listbox-preview">
        <cwr-listbox
          [groups]="groups"
          [showHeader]="showHeader()"
          [showFooter]="showFooter()"
          [allowVerticalScrolling]="allowVerticalScrolling()"
          [hasFocus]="hasFocus()"
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
        <label class="playground__field">
          <span>Search placeholder</span>
          <input
            type="text"
            [value]="searchPlaceholder()"
            (input)="searchPlaceholder.set($any($event.target).value)"
          />
        </label>

        <label class="playground__field">
          <span>Footer label</span>
          <input
            type="text"
            [value]="footerLabel()"
            (input)="footerLabel.set($any($event.target).value)"
          />
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showHeader()"
            (change)="showHeader.set($any($event.target).checked)"
          />
          Show header
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showFooter()"
            (change)="showFooter.set($any($event.target).checked)"
          />
          Show footer
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="allowVerticalScrolling()"
            (change)="allowVerticalScrolling.set($any($event.target).checked)"
          />
          Allow vertical scrolling
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hasFocus()"
            (change)="hasFocus.set($any($event.target).checked)"
          />
          Has focus (outline)
        </label>
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

      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select,
      .playground__field input[type='text'] {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }

      .playground__checkbox {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        font: var(--text-style-body);
        color: var(--color-text-surface);
      }
    `,
  ],
})
export class ListboxPlayground {
  groups = GROUPS;

  showHeader = signal(true);
  showFooter = signal(true);
  allowVerticalScrolling = signal(false);
  hasFocus = signal(false);
  searchValue = signal('');
  searchPlaceholder = signal('Search countries');
  footerLabel = signal('Add a country');
  lastEvent = signal('none yet');

  onOptionClick(option: ListboxOptionData): void {
    this.lastEvent.set(`optionClick: ${option.label}`);
  }

  onOptionCheckedChange(change: ListboxOptionCheckedChange): void {
    this.lastEvent.set(`optionCheckedChange: ${change.option.label} → ${change.checked}`);
  }

  generatedCode = computed(() => {
    const groupsLiteral = JSON.stringify(this.groups, null, 2);
    const attrs = [`[groups]="groups"`];
    if (!this.showHeader()) attrs.push(`[showHeader]="false"`);
    if (!this.showFooter()) attrs.push(`[showFooter]="false"`);
    if (this.allowVerticalScrolling()) attrs.push(`[allowVerticalScrolling]="true"`);
    if (this.hasFocus()) attrs.push(`[hasFocus]="true"`);
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
}
