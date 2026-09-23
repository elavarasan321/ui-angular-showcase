import { Component, computed, signal } from '@angular/core';
import { AgGrid } from '@checkworkrights/ui-angular';
import type { ColDef } from 'ag-grid-community';
import { Playground } from './playground';

interface ApplicantRow {
  name: string;
  status: string;
  documentsVerified: number;
  submitted: string;
}

const ALL_ROWS: ApplicantRow[] = [
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
  selector: 'app-ag-grid-playground',
  standalone: true,
  imports: [AgGrid, Playground],
  template: `
    <app-playground [code]="generatedCode()" language="typescript">
      <div playground-preview style="width: 100%; height: 260px;">
        <cwr-ag-grid [columnDefs]="columnDefs" [rowData]="visibleRows()"></cwr-ag-grid>
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Rows</span>
          <select (change)="rowCount.set(+$any($event.target).value)">
            @for (n of rowCountOptions; track n) {
              <option [value]="n" [selected]="n === rowCount()">{{ n }}</option>
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
export class AgGridPlayground {
  columnDefs = COLUMN_DEFS;
  rowCountOptions = [1, 2, 3, 4];

  rowCount = signal(4);

  visibleRows = computed(() => ALL_ROWS.slice(0, this.rowCount()));

  generatedCode = computed(() => {
    return `columnDefs: ColDef[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'status', headerName: 'Status' },
  { field: 'documentsVerified', headerName: 'Documents verified' },
  { field: 'submitted', headerName: 'Submitted' },
];

rowData = [ /* ${this.rowCount()} row(s) */ ];

<div style="height: 260px;">
  <cwr-ag-grid [columnDefs]="columnDefs" [rowData]="rowData"></cwr-ag-grid>
</div>`;
  });
}
