import { Component, computed, signal } from '@angular/core';
import { TabBarComponent, TabBarItem, CheckboxComponent } from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

const BASE_TABS: TabBarItem[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'documents', label: 'Documents' },
  { value: 'history', label: 'History' },
];

@Component({
  selector: 'app-tab-bar-playground',
  standalone: true,
  imports: [TabBarComponent, Playground, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-tab-bar
        playground-preview
        style="width: 100%;"
        [items]="items()"
        [checkedValue]="checkedValue()"
        (checkedValueChange)="checkedValue.set($event)"
      ></cwr-tab-bar>

      <ng-container playground-controls>
        <cwr-checkbox
          label="Leading icons"
          [checked]="showIcons()"
          (checkedChange)="showIcons.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Badge on Documents"
          [checked]="showBadge()"
          (checkedChange)="showBadge.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Disable History tab"
          [checked]="disableHistory()"
          (checkedChange)="disableHistory.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
