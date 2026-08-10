import { Component, computed, signal } from '@angular/core';
import {
  SegmentControlComponent,
  SegmentControlItem,
  SegmentControlVariant,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

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
  imports: [SegmentControlComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-segment-control
        playground-preview
        [items]="items"
        [variant]="variant()"
        [checkedValue]="checkedValue()"
        (checkedValueChange)="checkedValue.set($event)"
      ></cwr-segment-control>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Variant</span>
          <select (change)="variant.set($any($event.target).value)">
            @for (v of variants; track v) {
              <option [value]="v" [selected]="v === variant()">{{ v }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Checked value</span>
          <select (change)="checkedValue.set($any($event.target).value)">
            @for (item of items; track item.value) {
              <option [value]="item.value" [selected]="item.value === checkedValue()">
                {{ item.label }}
              </option>
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
export class SegmentControlPlayground {
  variants = VARIANTS;
  items = ITEMS;

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
}
