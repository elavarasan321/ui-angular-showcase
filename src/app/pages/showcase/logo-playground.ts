import { Component, computed, signal } from '@angular/core';
import type { LogoSize } from '@checkworkrights/ui-angular';
import {
  LogoComponent,
  FormFieldComponent,
  PickerInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares SIZES (for Logo/Logomark/Wordmark) in its types but
// doesn't actually export it from the compiled bundle, so the option list is hardcoded here to
// match LogoSize. Runtime defaults (checked against the compiled bundle): size = 'lg',
// showWordmark = true, showLogomark = true.
const SIZES: readonly LogoSize[] = ['xs', 'sm', 'md', 'lg'];

@Component({
  selector: 'app-logo-playground',
  standalone: true,
  imports: [LogoComponent, Playground, FormFieldComponent, PickerInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-logo
        playground-preview
        [size]="size()"
        [showWordmark]="showWordmark()"
        [showLogomark]="showLogomark()"
      ></cwr-logo>

      <ng-container playground-controls>
        <cwr-form-field label="Size">
          <cwr-picker-input
            [options]="sizes | pickerOptions"
            [value]="size()"
            (valueChange)="size.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Show wordmark"
          [checked]="showWordmark()"
          (checkedChange)="showWordmark.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Show logomark"
          [checked]="showLogomark()"
          (checkedChange)="showLogomark.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class LogoPlayground {
  sizes = SIZES;

  size = signal<LogoSize>('lg');
  showWordmark = signal(true);
  showLogomark = signal(true);

  generatedCode = computed(() => {
    const attrs = [`size="${this.size()}"`];
    if (!this.showWordmark()) attrs.push(`[showWordmark]="false"`);
    if (!this.showLogomark()) attrs.push(`[showLogomark]="false"`);
    return `<cwr-logo ${attrs.join(' ')}></cwr-logo>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
