import { Component, computed, signal } from '@angular/core';
import type { TitleBlockVariant } from '@checkworkrights/ui-angular';
import {
  ButtonComponent,
  IconButtonComponent,
  TitleBlockComponent,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const VARIANTS: readonly TitleBlockVariant[] = ['title', 'section'];

@Component({
  selector: 'app-title-block-playground',
  standalone: true,
  imports: [TitleBlockComponent, ButtonComponent, IconButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview style="width: 100%;">
        <cwr-title-block [variant]="variant()" [title]="title()">
          @if (showLeading()) {
            <cwr-icon-button
              titleBlockLeadingSlot
              icon="icon.ui.direction-left"
              label="Back"
              variant="ghost"
            ></cwr-icon-button>
          }
          @if (showTrailing()) {
            <cwr-button
              titleBlockTrailingSlot
              variant="outline"
              intent="neutral"
              size="sm"
              label="Edit"
            ></cwr-button>
          }
          @if (showEnd()) {
            <p
              titleBlockEndSlot
              style="font: var(--text-style-body); color: var(--color-text-surface-secondary); margin: 0;"
            >
              Contractor · Onboarded 12 Mar 2025
            </p>
          }
        </cwr-title-block>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Variant">
          <cwr-picker-input
            [options]="variants | pickerOptions"
            [value]="variant()"
            (valueChange)="variant.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Leading slot"
          [checked]="showLeading()"
          (checkedChange)="showLeading.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Trailing slot"
          [checked]="showTrailing()"
          (checkedChange)="showTrailing.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="End slot"
          [checked]="showEnd()"
          (checkedChange)="showEnd.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class TitleBlockPlayground {
  variants = VARIANTS;

  variant = signal<TitleBlockVariant>('title');
  title = signal('Jordan Smith');
  showLeading = signal(true);
  showTrailing = signal(true);
  showEnd = signal(true);

  generatedCode = computed(() => {
    const lines = [`<cwr-title-block variant="${this.variant()}" title="${this.title()}">`];
    if (this.showLeading()) {
      lines.push(
        `  <cwr-icon-button titleBlockLeadingSlot icon="icon.ui.direction-left" label="Back" variant="ghost"></cwr-icon-button>`,
      );
    }
    if (this.showTrailing()) {
      lines.push(
        `  <cwr-button titleBlockTrailingSlot variant="outline" intent="neutral" size="sm" label="Edit"></cwr-button>`,
      );
    }
    if (this.showEnd()) {
      lines.push(`  <p titleBlockEndSlot>Contractor · Onboarded 12 Mar 2025</p>`);
    }
    lines.push('</cwr-title-block>');
    return lines.join('\n');
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
