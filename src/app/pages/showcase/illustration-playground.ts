import { Component, computed, signal } from '@angular/core';
import {
  ICON_COLOR_MAP,
  ILLUSTRATION_MAP,
  IllustrationColorKey,
  IllustrationComponent,
  IllustrationKey,
  IllustrationSize,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares ILLUSTRATION_SIZES in its types but doesn't
// actually export it from the compiled bundle, so the option list is hardcoded here to match
// IllustrationSize.
const SIZES: readonly IllustrationSize[] = ['xs', 'sm', 'md', 'lg'];

// IllustrationColorKey is `keyof typeof ICON_COLOR_MAP`, so the icon color map's keys double as
// the valid primary/secondary color overrides.
const NONE_COLOR = '__none__';

@Component({
  selector: 'app-illustration-playground',
  standalone: true,
  imports: [IllustrationComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-illustration
        playground-preview
        [illustration]="illustration()"
        [size]="size()"
        [primaryColor]="resolvedPrimaryColor()"
        [secondaryColor]="resolvedSecondaryColor()"
        [primaryOpacity]="primaryOpacity() || undefined"
        [secondaryOpacity]="secondaryOpacity() || undefined"
      ></cwr-illustration>

      <ng-container playground-controls>
        <cwr-form-field label="Illustration">
          <cwr-picker-input
            [options]="illustrationKeys | pickerOptions"
            [value]="illustration()"
            (valueChange)="illustration.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Primary color">
          <cwr-picker-input
            [options]="colorKeys | pickerOptions: { label: '(default)', value: '${NONE_COLOR}' }"
            [value]="primaryColor()"
            (valueChange)="primaryColor.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Secondary color">
          <cwr-picker-input
            [options]="colorKeys | pickerOptions: { label: '(default)', value: '${NONE_COLOR}' }"
            [value]="secondaryColor()"
            (valueChange)="secondaryColor.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Primary opacity">
          <cwr-text-input
            [value]="primaryOpacity()"
            (valueChange)="primaryOpacity.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Secondary opacity">
          <cwr-text-input
            [value]="secondaryOpacity()"
            (valueChange)="secondaryOpacity.set($event)"
          ></cwr-text-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class IllustrationPlayground {
  illustrationKeys = Object.keys(ILLUSTRATION_MAP) as IllustrationKey[];
  colorKeys = Object.keys(ICON_COLOR_MAP) as IllustrationColorKey[];
  sizes = SIZES;

  illustration = signal<IllustrationKey>('illustration.document.complete');
  size = signal<IllustrationSize>('md');
  primaryColor = signal<IllustrationColorKey | typeof NONE_COLOR>(NONE_COLOR);
  secondaryColor = signal<IllustrationColorKey | typeof NONE_COLOR>(NONE_COLOR);
  primaryOpacity = signal('');
  secondaryOpacity = signal('');

  resolvedPrimaryColor = computed<IllustrationColorKey | undefined>(() => {
    const color = this.primaryColor();
    return color === NONE_COLOR ? undefined : color;
  });

  resolvedSecondaryColor = computed<IllustrationColorKey | undefined>(() => {
    const color = this.secondaryColor();
    return color === NONE_COLOR ? undefined : color;
  });

  generatedCode = computed(() => {
    const attrs = [`illustration="${this.illustration()}"`, `size="${this.size()}"`];
    if (this.primaryColor() !== NONE_COLOR) attrs.push(`primaryColor="${this.primaryColor()}"`);
    if (this.secondaryColor() !== NONE_COLOR) {
      attrs.push(`secondaryColor="${this.secondaryColor()}"`);
    }
    if (this.primaryOpacity()) attrs.push(`primaryOpacity="${this.primaryOpacity()}"`);
    if (this.secondaryOpacity()) attrs.push(`secondaryOpacity="${this.secondaryOpacity()}"`);
    return `<cwr-illustration ${attrs.join(' ')}></cwr-illustration>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
