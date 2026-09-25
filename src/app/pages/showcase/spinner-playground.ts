import { Component, computed, signal } from '@angular/core';
import type { spinnerSize } from '@checkworkrights/ui-angular';
import {
  SpinnerComponent,
  FormFieldComponent,
  PickerInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares SPINNER_SIZES in its types but doesn't actually
// export it from the compiled bundle, so the option list is hardcoded here to match spinnerSize.
const SIZES: readonly spinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

@Component({
  selector: 'app-spinner-playground',
  standalone: true,
  imports: [SpinnerComponent, Playground, FormFieldComponent, PickerInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-spinner playground-preview [size]="size()" style="position: relative;"></cwr-spinner>

      <ng-container playground-controls>
        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class SpinnerPlayground {
  sizes = SIZES;

  size = signal<spinnerSize>('md');

  generatedCode = computed(() => {
    return `<cwr-spinner size="${this.size()}" style="position: relative;"></cwr-spinner>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
