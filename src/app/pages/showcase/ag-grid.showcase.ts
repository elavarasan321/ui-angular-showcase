import { Component } from '@angular/core';
import { AgGrid } from '@checkworkrights/ui-angular';
import type { ColDef } from 'ag-grid-community';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { AgGridPlayground } from './ag-grid-playground';

interface ApplicantRow {
  name: string;
  status: string;
  documentsVerified: number;
  submitted: string;
}

const ROW_DATA: ApplicantRow[] = [
  { name: 'Amelia Chen', status: 'Verified', documentsVerified: 4, submitted: '2026-01-12' },
  { name: 'Noah Patel', status: 'Pending', documentsVerified: 2, submitted: '2026-02-03' },
  { name: 'Isla Thompson', status: 'Rejected', documentsVerified: 1, submitted: '2026-02-18' },
  { name: 'Liam O’Connor', status: 'Verified', documentsVerified: 3, submitted: '2026-03-01' },
];

const COLUMN_DEFS: ColDef<ApplicantRow>[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'status', headerName: 'Status' },
  { field: 'documentsVerified', headerName: 'Documents verified' },
  { field: 'submitted', headerName: 'Submitted' },
];

@Component({
  selector: 'app-ag-grid-showcase',
  standalone: true,
  imports: [AgGrid, ExampleBlock, ShowcaseHeader, AgGridPlayground, ComponentReference],
  template: `
    <app-showcase-header title="AG Grid" selector="cwr-ag-grid"></app-showcase-header>

    <app-ag-grid-playground></app-ag-grid-playground>
    <p>
      <code>cwr-ag-grid</code> wraps <code>ag-grid-angular</code>/<code>ag-grid-community</code>
      with CWR's design-token-driven theme applied automatically (it tracks light/dark mode). Give
      it an explicit-height wrapper — AG Grid fills 100% of its container — and pass
      <code>columnDefs</code>/<code>rowData</code>. Sorting and filtering are on by default via
      the component's <code>defaultColDef</code>.
    </p>

    <app-example-block title="Basic grid" [code]="basicCode" language="typescript">
      <div style="width: 100%; height: 260px;">
        <cwr-ag-grid [columnDefs]="columnDefs" [rowData]="rowData"></cwr-ag-grid>
      </div>
    </app-example-block>

    <p>
      Master/detail rows and other enterprise-only AG Grid features require a valid licence.
      Call <code>registerAgGridEnterprise()</code>, or add <code>provideAgGridEnterprise()</code>
      to your app's providers, before rendering a grid with <code>[masterDetail]="true"</code>.
    </p>

    <app-component-reference selector="cwr-ag-grid"></app-component-reference>
  `,
})
export class AgGridShowcase {
  columnDefs = COLUMN_DEFS;
  rowData = ROW_DATA;

  basicCode = `columnDefs: ColDef[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'status', headerName: 'Status' },
  { field: 'documentsVerified', headerName: 'Documents verified' },
  { field: 'submitted', headerName: 'Submitted' },
];

rowData = [
  { name: 'Amelia Chen', status: 'Verified', documentsVerified: 4, submitted: '2026-01-12' },
  { name: 'Noah Patel', status: 'Pending', documentsVerified: 2, submitted: '2026-02-03' },
];

<div style="height: 260px;">
  <cwr-ag-grid [columnDefs]="columnDefs" [rowData]="rowData"></cwr-ag-grid>
</div>`;
}
