import { Component, computed, signal } from '@angular/core';
import { AgGrid, FormFieldComponent, PickerInputComponent } from '@checkworkrights/ui-angular';
import type { ColDef } from 'ag-grid-community';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

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
  imports: [AgGrid, Playground, FormFieldComponent, PickerInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()" language="typescript">
      <div playground-preview style="width: 100%; height: 260px;">
        <cwr-ag-grid [columnDefs]="columnDefs" [rowData]="visibleRows()"></cwr-ag-grid>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Rows">
          <cwr-picker-input
            [options]="rowCountOptions | pickerOptions"
            [value]="'' + rowCount()"
            (valueChange)="rowCount.set(+$event)"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
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

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
