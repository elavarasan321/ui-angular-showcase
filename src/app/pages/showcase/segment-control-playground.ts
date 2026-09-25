import { Component, computed, signal } from '@angular/core';
import {
  SegmentControlComponent,
  SegmentControlItem,
  SegmentControlVariant,
  FormFieldComponent,
  PickerInputComponent,
  PickerInputOption,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.31 doesn't export a SEGMENT_CONTROL_VARIANTS-style runtime
// const under a name distinct from the type, so the option list is reproduced here to match
// SegmentControlVariant.
const VARIANTS: readonly SegmentControlVariant[] = ['icon-and-text', 'text-only', 'icon-only'];

const ITEMS: SegmentControlItem[] = [
  { value: 'list', label: 'List', icon: 'icon.ui.list-view', ariaLabel: 'List view' },
  { value: 'grid', label: 'Grid', icon: 'icon.ui.card-view', ariaLabel: 'Grid view' },
  { value: 'table', label: 'Table', icon: 'icon.ui.table-layout', ariaLabel: 'Table view' },
];

@Component({
  selector: 'app-segment-control-playground',
  standalone: true,
  imports: [SegmentControlComponent, Playground, FormFieldComponent, PickerInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-segment-control
        playground-preview
        [items]="items"
        [variant]="variant()"
        [checkedValue]="checkedValue()"
        (checkedValueChange)="checkedValue.set($event)"
      ></cwr-segment-control>

      <ng-container playground-controls>
        <cwr-form-field label="Variant">
          <cwr-picker-input
            [options]="variants | pickerOptions"
            [value]="variant()"
            (valueChange)="variant.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Checked value">
          <cwr-picker-input
            [options]="itemOptions"
            [value]="checkedValue()"
            (valueChange)="checkedValue.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class SegmentControlPlayground {
  variants = VARIANTS;
  items = ITEMS;
  itemOptions: PickerInputOption[] = ITEMS.map(({ label, value, icon }) => ({
    label: label ?? value,
    value,
    leadingIcon: icon,
  }));

  variant = signal<SegmentControlVariant>('icon-and-text');
  checkedValue = signal('list');

  generatedCode = computed(() => {
    const itemsLiteral = JSON.stringify(this.items, null, 2);
    const attrs = [`[items]="items"`, `[checkedValue]="checkedValue"`];
    if (this.variant() !== 'icon-and-text') attrs.push(`variant="${this.variant()}"`);
    return `items = ${itemsLiteral};

checkedValue = '${this.checkedValue()}';

<cwr-segment-control
  ${attrs.join('\n  ')}
  (checkedValueChange)="checkedValue = $event"
></cwr-segment-control>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
