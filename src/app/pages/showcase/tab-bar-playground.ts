import { Component, computed, signal } from '@angular/core';
import { TabBarComponent, TabBarItem } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const BASE_TABS: TabBarItem[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'documents', label: 'Documents' },
  { value: 'history', label: 'History' },
];

@Component({
  selector: 'app-tab-bar-playground',
  standalone: true,
  imports: [TabBarComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-tab-bar
        playground-preview
        style="width: 100%;"
        [items]="items()"
        [checkedValue]="checkedValue()"
        (checkedValueChange)="checkedValue.set($event)"
      ></cwr-tab-bar>

      <ng-container playground-controls>
        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showIcons()"
            (change)="showIcons.set($any($event.target).checked)"
          />
          Leading icons
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="showBadge()"
            (change)="showBadge.set($any($event.target).checked)"
          />
          Badge on Documents
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="disableHistory()"
            (change)="disableHistory.set($any($event.target).checked)"
          />
          Disable History tab
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
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
export class TabBarPlayground {
  checkedValue = signal('overview');
  showIcons = signal(true);
  showBadge = signal(true);
  disableHistory = signal(false);

  items = computed<TabBarItem[]>(() =>
    BASE_TABS.map((tab) => ({
      ...tab,
      icon: this.showIcons()
        ? tab.value === 'overview'
          ? 'icon.ui.info'
          : tab.value === 'documents'
            ? 'icon.ui.upload'
            : 'icon.ui.search'
        : undefined,
      badge: this.showBadge() && tab.value === 'documents' ? 3 : undefined,
      disabled: this.disableHistory() && tab.value === 'history',
    })),
  );

  generatedCode = computed(() => {
    return `<cwr-tab-bar
  [items]="tabs"
  [checkedValue]="activeTab()"
  (checkedValueChange)="activeTab.set($event)"
></cwr-tab-bar>`;
  });
}
