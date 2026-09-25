import { Component, computed, signal } from '@angular/core';
import {
  TextOverflowComponent,
  TextOverflowPosition,
  TextOverflowTruncation,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular@1.0.30 declares TextOverflowTruncation/TextOverflowPosition as plain
// string literal unions (not exported readonly array consts), so the option lists are hardcoded
// here to match those unions.
const TRUNCATIONS: readonly TextOverflowTruncation[] = ['trailing', 'middle'];
const POSITIONS: readonly TextOverflowPosition[] = ['top', 'bottom'];

@Component({
  selector: 'app-text-overflow-playground',
  standalone: true,
  imports: [TextOverflowComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview style="width: 220px; display: inline-block;">
        <cwr-text-overflow
          [text]="text()"
          [truncation]="truncation()"
          [position]="position()"
        ></cwr-text-overflow>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Text">
          <cwr-text-input
            [value]="text()"
            (valueChange)="text.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Truncation">
          <cwr-picker-input
            [options]="truncations | pickerOptions"
            [value]="truncation()"
            (valueChange)="truncation.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Position">
          <cwr-picker-input
            [options]="positions | pickerOptions"
            [value]="position()"
            (valueChange)="position.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `
})
export class TextOverflowPlayground {
  truncations = TRUNCATIONS;
  positions = POSITIONS;

  text = signal('A very long piece of text that will not fit in the available space');
  truncation = signal<TextOverflowTruncation>('trailing');
  position = signal<TextOverflowPosition>('top');

  generatedCode = computed(() => {
    return `<div style="width: 220px; display: inline-block;">
  <cwr-text-overflow text="${this.text()}" truncation="${this.truncation()}" position="${this.position()}"></cwr-text-overflow>
</div>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
