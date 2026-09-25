import { Component, computed, signal } from '@angular/core';
import {
  BORDER_COLOR_MAP,
  BorderColorKey,
  DividerComponent,
  DividerOrientation,
  DividerSize,
  FormFieldComponent,
  PickerInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 exports DividerOrientation/DividerSize as types only —
// the DIVIDER_ORIENTATIONS/DIVIDER_SIZES runtime consts declared in its .d.ts aren't actually
// present in the published bundle, so the option lists are hardcoded here to match the unions.
const DIVIDER_ORIENTATIONS: readonly DividerOrientation[] = ['horizontal', 'vertical'];
const DIVIDER_SIZES: readonly DividerSize[] = ['default', 'thick', 'thickest'];

// BorderColorKey is `keyof typeof BORDER_COLOR_MAP`, and BORDER_COLOR_MAP is actually exported
// from the compiled bundle, so its keys give the full, exhaustive color list.
const COLORS = Object.keys(BORDER_COLOR_MAP) as BorderColorKey[];

@Component({
  selector: 'app-divider-playground',
  standalone: true,
  imports: [DividerComponent, Playground, FormFieldComponent, PickerInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div
        playground-preview
        style="display: flex; align-items: center; justify-content: center; width: 100%;"
      >
        <cwr-divider
          [orientation]="orientation()"
          [size]="size()"
          [rounded]="rounded()"
          [color]="color()"
          [style.height]="orientation() === 'vertical' ? '3rem' : null"
        ></cwr-divider>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Orientation">
          <cwr-picker-input
            [options]="orientations | pickerOptions"
            [value]="orientation()"
            (valueChange)="orientation.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Color">
          <cwr-picker-input
            [options]="colors | pickerOptions"
            [value]="color()"
            (valueChange)="color.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Rounded"
          [checked]="rounded()"
          (checkedChange)="rounded.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class DividerPlayground {
  orientations = DIVIDER_ORIENTATIONS;
  sizes = DIVIDER_SIZES;
  colors = COLORS;

  orientation = signal<DividerOrientation>('horizontal');
  size = signal<DividerSize>('default');
  rounded = signal(true);
  color = signal<BorderColorKey>('color.border.surface');

  generatedCode = computed(() => {
    const attrs = [
      `orientation="${this.orientation()}"`,
      `size="${this.size()}"`,
      `color="${this.color()}"`,
    ];
    if (!this.rounded()) attrs.push(`[rounded]="false"`);
    if (this.orientation() === 'vertical') attrs.push(`style="height: 3rem;"`);
    return `<cwr-divider ${attrs.join(' ')}></cwr-divider>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
