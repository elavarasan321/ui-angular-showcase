import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
  EmptyStateContentBlockComponent,
  FormFieldComponent,
  ListTableColumnComponent,
  ListTableComponent,
  ListTableRowKey,
  ListTableSelectionMode,
  ListTableSortChangeEvent,
  ListTableSortDirection,
  ListTableState,
  PickerInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';
import { DEMO_EMPLOYEES, DemoEmployee, sortEmployees } from './list-table-demo-data';

// Hardcoded to match the unions, as with the other playgrounds.
const LIST_TABLE_STATES: readonly ListTableState[] = ['ready', 'loading', 'empty', 'error'];
const LIST_TABLE_SELECTION_MODES: readonly ListTableSelectionMode[] = ['none', 'multiple'];

@Component({
  selector: 'app-list-table-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ListTableComponent,
    ListTableColumnComponent,
    BadgeComponent,
    ButtonComponent,
    EmptyStateContentBlockComponent,
    Playground,
    FormFieldComponent,
    PickerInputComponent,
    CheckboxComponent,
    PickerOptionsPipe,
  ],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview class="list-table-playground__frame">
        <cwr-list-table
          #table
          aria-label="Employees"
          loadingLabel="Loading employees"
          [rows]="rows()"
          [rowKey]="employeeId"
          [rowLabel]="employeeName"
          [isRowSelectable]="activeOnly() ? isActive : undefined"
          [state]="state()"
          [selectionMode]="selectionMode()"
          [(selection)]="selection"
          [striped]="striped()"
          [sortColumn]="sortColumn()"
          [sortDirection]="sortDirection()"
          [hasPagination]="hasPagination()"
          [page]="page()"
          [pageSize]="pageSize()"
          [totalRecordCount]="employees.length"
          (sortChange)="onSortChange($event)"
          (pageChange)="page.set($event)"
          (pageSizeChange)="onPageSizeChange($event)"
        >
          @if (selectionMode() === 'multiple') {
            <cwr-button
              listTableControlBarTrailing
              label="Clear selection"
              variant="outline"
              size="sm"
              [disabled]="selection().length === 0"
              (buttonClick)="table.clearSelection()"
            ></cwr-button>
          }

          @if (state() === 'empty') {
            <cwr-empty-state-content-block
              listTableStateContent
              illustration="illustration.ui.placeholder"
              title="No employees match your search"
              description="Try a different keyword or clear the filters."
              [hasActions]="false"
            ></cwr-empty-state-content-block>
          } @else if (state() === 'error') {
            <cwr-empty-state-content-block
              listTableStateContent
              illustration="illustration.status.danger"
              title="Couldn't load employees"
              description="Try refreshing the page."
              [hasActions]="false"
            ></cwr-empty-state-content-block>
          }

          <cwr-list-table-column
            name="name"
            header="Employee"
            primary
            sortable
            minWidth="10rem"
            [pinned]="pinned()"
          >
            <ng-template #cell let-employee>{{ employee.name }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="role" header="Role" sortable>
            <ng-template #cell let-employee>{{ employee.role }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="department" header="Department" sortable>
            <ng-template #cell let-employee>{{ employee.department }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="status" header="Status">
            <ng-template #cell let-employee>
              <cwr-badge
                [value]="employee.status"
                [intent]="employee.status === 'Active' ? 'positive' : 'neutral'"
              ></cwr-badge>
            </ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column
            name="startDate"
            header="Start date"
            sortable
            align="end"
            firstSortDirection="desc"
          >
            <ng-template #cell let-employee>{{ employee.startDate }}</ng-template>
          </cwr-list-table-column>
        </cwr-list-table>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="State">
          <cwr-picker-input
            [options]="states | pickerOptions"
            [value]="state()"
            (valueChange)="state.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Selection mode">
          <cwr-picker-input
            [options]="selectionModes | pickerOptions"
            [value]="selectionMode()"
            (valueChange)="selectionMode.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Only active rows selectable"
          [checked]="activeOnly()"
          [disabled]="selectionMode() === 'none'"
          (checkedChange)="activeOnly.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Striped"
          [checked]="striped()"
          (checkedChange)="striped.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Pin first column"
          [checked]="pinned()"
          (checkedChange)="pinned.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Pagination"
          [checked]="hasPagination()"
          (checkedChange)="onPaginationChange($event)"
        ></cwr-checkbox>

        @if (selectionMode() === 'multiple') {
          <p class="list-table-playground__note">
            Selected: <code>{{ selectedSummary() }}</code>
          </p>
        }
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .list-table-playground__frame {
        align-self: stretch;
        width: 100%;
        height: 32rem;
      }

      .list-table-playground__note {
        margin: 0;
        font: var(--text-style-caption);
      }
    `,
  ],
})
export class ListTablePlayground {
  states = LIST_TABLE_STATES;
  selectionModes = LIST_TABLE_SELECTION_MODES;
  employees = DEMO_EMPLOYEES;

  // cwr-list-table types its row callbacks as taking `unknown`.
  employeeId = (row: unknown) => (row as DemoEmployee).id;
  employeeName = (row: unknown) => (row as DemoEmployee).name;
  isActive = (row: unknown) => (row as DemoEmployee).status === 'Active';

  state = signal<ListTableState>('ready');
  selectionMode = signal<ListTableSelectionMode>('multiple');
  activeOnly = signal(false);
  striped = signal(false);
  pinned = signal(false);
  hasPagination = signal(true);

  // Table state driven by the table's own events; kept out of the URL below.
  sortColumn = signal<string | null>('name');
  sortDirection = signal<ListTableSortDirection>('asc');
  page = signal(1);
  pageSize = signal(10);
  selection = signal<ListTableRowKey[]>([]);

  /** The current page, sorted the way a server would return it. */
  rows = computed(() => {
    const sorted = sortEmployees(this.employees, this.sortColumn(), this.sortDirection());
    if (!this.hasPagination()) return sorted;
    const start = (this.page() - 1) * this.pageSize();
    return sorted.slice(start, start + this.pageSize());
  });

  selectedSummary = computed(() =>
    this.selection().length ? `[${this.selection().join(', ')}]` : 'none',
  );

  onSortChange(event: ListTableSortChangeEvent): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this.page.set(1);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.page.set(1);
  }

  onPaginationChange(enabled: boolean): void {
    this.hasPagination.set(enabled);
    this.page.set(1);
  }

  generatedCode = computed(() => {
    const attrs = [
      'aria-label="Employees"',
      '[rows]="rows"',
      '[rowKey]="employeeId"',
      '[rowLabel]="employeeName"',
    ];
    if (this.state() !== 'ready') attrs.push(`state="${this.state()}"`);
    if (this.selectionMode() !== 'none') {
      attrs.push(`selectionMode="${this.selectionMode()}"`, '[(selection)]="selection"');
      if (this.activeOnly()) attrs.push('[isRowSelectable]="isActive"');
    }
    if (this.striped()) attrs.push('striped');
    attrs.push('[sortColumn]="sortColumn"', '[sortDirection]="sortDirection"');
    if (this.hasPagination()) {
      attrs.push('[page]="page"', '[pageSize]="pageSize"', '[totalRecordCount]="total"');
    } else {
      attrs.push('[hasPagination]="false"');
    }
    attrs.push('(sortChange)="onSortChange($event)"');
    if (this.hasPagination()) {
      attrs.push('(pageChange)="onPageChange($event)"', '(pageSizeChange)="onPageSizeChange($event)"');
    }
    const pinned = this.pinned() ? ' pinned' : '';
    return `<cwr-list-table
  ${attrs.join('\n  ')}
>
  <cwr-list-table-column name="name" header="Employee" primary sortable${pinned}>
    <ng-template #cell let-employee>{{ employee.name }}</ng-template>
  </cwr-list-table-column>
  <cwr-list-table-column name="role" header="Role" sortable>
    <ng-template #cell let-employee>{{ employee.role }}</ng-template>
  </cwr-list-table-column>
  <cwr-list-table-column name="status" header="Status">
    <ng-template #cell let-employee>
      <cwr-badge [value]="employee.status" intent="positive"></cwr-badge>
    </ng-template>
  </cwr-list-table-column>
</cwr-list-table>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this, [
    'sortColumn',
    'sortDirection',
    'page',
    'pageSize',
  ]);
}
