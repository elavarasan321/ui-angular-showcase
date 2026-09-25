import { Component, computed, signal } from '@angular/core';
import {
  ICON_COLOR_MAP,
  ICON_MAP,
  IconColorKey,
  IconComponent,
  IconKey,
  IconSize,
  FormFieldComponent,
  PickerInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares ICON_SIZES in its types but doesn't actually
// export it from the compiled bundle, so the option list is hardcoded here to match IconSize.
const SIZES: readonly IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const NONE_COLOR = '__none__';

@Component({
  selector: 'app-icon-playground',
  standalone: true,
  imports: [IconComponent, Playground, FormFieldComponent, PickerInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-icon
        playground-preview
        [icon]="icon()"
        [size]="size()"
        [color]="resolvedColor()"
      ></cwr-icon>

      <ng-container playground-controls>
        <cwr-form-field label="Icon">
          <cwr-picker-input
            [options]="iconKeys | pickerOptions"
            [value]="icon()"
            (valueChange)="icon.set($any($event))"
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
            [options]="colorKeys | pickerOptions: { label: '(default)', value: '${NONE_COLOR}' }"
            [value]="color()"
            (valueChange)="color.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class IconPlayground {
  iconKeys = Object.keys(ICON_MAP) as IconKey[];
  colorKeys = Object.keys(ICON_COLOR_MAP) as IconColorKey[];
  sizes = SIZES;

  icon = signal<IconKey>('icon.ui.placeholder');
  size = signal<IconSize>('md');
  color = signal<IconColorKey | typeof NONE_COLOR>(NONE_COLOR);

  resolvedColor = computed<IconColorKey | undefined>(() => {
    const color = this.color();
    return color === NONE_COLOR ? undefined : color;
  });

  generatedCode = computed(() => {
    const attrs = [`icon="${this.icon()}"`, `size="${this.size()}"`];
    if (this.color() !== NONE_COLOR) attrs.push(`color="${this.color()}"`);
    return `<cwr-icon ${attrs.join(' ')}></cwr-icon>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
