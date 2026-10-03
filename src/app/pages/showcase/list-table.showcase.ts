import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BadgeComponent,
  ListTableColumnComponent,
  ListTableComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { ListTablePlayground } from './list-table-playground';
import { DEMO_EMPLOYEES, DemoEmployee } from './list-table-demo-data';

@Component({
  selector: 'app-list-table-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ListTableComponent,
    ListTableColumnComponent,
    BadgeComponent,
    ExampleBlock,
    ShowcaseHeader,
    ListTablePlayground,
    ComponentReference,
  ],
  template: `
    <app-showcase-header
      title="List Table"
      selector="cwr-list-table · cwr-list-table-column"
    ></app-showcase-header>

    <app-list-table-playground></app-list-table-playground>
    <p>
      Compose <code>cwr-list-table</code> with one <code>cwr-list-table-column</code> per column,
      each rendering its cells through an <code>&lt;ng-template #cell&gt;</code>. The table is
      controlled: it emits <code>sortChange</code>, <code>pageChange</code> and
      <code>pageSizeChange</code>, and you pass back the rows for the current page — or set
      <code>clientSideSort</code> to let it sort the rows it was given.
    </p>

    <app-example-block title="Client-side sorting, no pagination" [code]="basicCode">
      <div class="list-table-showcase__frame">
        <cwr-list-table
          aria-label="Employees"
          [rows]="rows"
          [rowKey]="employeeId"
          [hasPagination]="false"
          clientSideSort
          sortColumn="name"
          sortDirection="asc"
        >
          <cwr-list-table-column name="name" header="Employee" primary sortable>
            <ng-template #cell let-employee>{{ employee.name }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="role" header="Role">
            <ng-template #cell let-employee>{{ employee.role }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="department" header="Department">
            <ng-template #cell let-employee>{{ employee.department }}</ng-template>
          </cwr-list-table-column>
        </cwr-list-table>
      </div>
    </app-example-block>

    <app-example-block title="Striped with custom cells" [code]="stripedCode">
      <div class="list-table-showcase__frame">
        <cwr-list-table
          aria-label="Employees"
          striped
          [rows]="rows"
          [rowKey]="employeeId"
          [hasPagination]="false"
        >
          <cwr-list-table-column name="name" header="Employee" primary>
            <ng-template #cell let-employee>{{ employee.name }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="status" header="Status">
            <ng-template #cell let-employee>
              <cwr-badge
                [value]="employee.status"
                [intent]="employee.status === 'Active' ? 'positive' : 'neutral'"
              ></cwr-badge>
            </ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="startDate" header="Start date" align="end">
            <ng-template #cell let-employee>{{ employee.startDate }}</ng-template>
          </cwr-list-table-column>
        </cwr-list-table>
      </div>
    </app-example-block>

    <app-example-block title="Loading" [code]="loadingCode">
      <div class="list-table-showcase__frame">
        <cwr-list-table
          aria-label="Employees"
          state="loading"
          loadingLabel="Loading employees"
          [rows]="[]"
          [hasPagination]="false"
        >
          <cwr-list-table-column name="name" header="Employee" primary>
            <ng-template #cell let-employee>{{ employee.name }}</ng-template>
          </cwr-list-table-column>
          <cwr-list-table-column name="role" header="Role">
            <ng-template #cell let-employee>{{ employee.role }}</ng-template>
          </cwr-list-table-column>
        </cwr-list-table>
      </div>
    </app-example-block>

    <app-component-reference
      selector="cwr-list-table · cwr-list-table-column"
    ></app-component-reference>
  `,
  styles: [
    `
      .list-table-showcase__frame {
        width: 100%;
        height: 24rem;
      }
    `,
  ],
})
export class ListTableShowcase {
  rows = DEMO_EMPLOYEES.slice(0, 6);
  // cwr-list-table types its row callbacks as taking `unknown`.
  employeeId = (row: unknown) => (row as DemoEmployee).id;

  basicCode = `<cwr-list-table
  aria-label="Employees"
  [rows]="employees"
  [rowKey]="employeeId"
  [hasPagination]="false"
  clientSideSort
  sortColumn="name"
  sortDirection="asc"
>
  <cwr-list-table-column name="name" header="Employee" primary sortable>
    <ng-template #cell let-employee>{{ employee.name }}</ng-template>
  </cwr-list-table-column>
  <cwr-list-table-column name="role" header="Role">
    <ng-template #cell let-employee>{{ employee.role }}</ng-template>
  </cwr-list-table-column>
</cwr-list-table>`;

  stripedCode = `<cwr-list-table aria-label="Employees" striped [rows]="employees" [hasPagination]="false">
  <cwr-list-table-column name="name" header="Employee" primary>
    <ng-template #cell let-employee>{{ employee.name }}</ng-template>
  </cwr-list-table-column>
  <cwr-list-table-column name="status" header="Status">
    <ng-template #cell let-employee>
      <cwr-badge [value]="employee.status" [intent]="employee.status === 'Active' ? 'positive' : 'neutral'"></cwr-badge>
    </ng-template>
  </cwr-list-table-column>
  <cwr-list-table-column name="startDate" header="Start date" align="end">
    <ng-template #cell let-employee>{{ employee.startDate }}</ng-template>
  </cwr-list-table-column>
</cwr-list-table>`;

  loadingCode = `<cwr-list-table
  aria-label="Employees"
  state="loading"
  loadingLabel="Loading employees"
  [rows]="[]"
  [hasPagination]="false"
>
  ...
</cwr-list-table>`;
}
