import { Component, computed, inject, signal } from '@angular/core';
import {
  ButtonComponent,
  SnackbarStackService,
  SnackbarVariant,
  SnackbarStackPosition,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const SNACKBAR_VARIANTS: readonly SnackbarVariant[] = ['neutral', 'positive', 'warning', 'negative'];
const SNACKBAR_STACK_POSITIONS: readonly SnackbarStackPosition[] = [
  'bottom-start',
  'bottom-end',
  'bottom-center',
];

@Component({
  selector: 'app-snackbar-playground',
  standalone: true,
  imports: [ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview>
        <cwr-button
          variant="solid"
          intent="brand"
          size="sm"
          label="Show snackbar"
          (buttonClick)="show()"
        ></cwr-button>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Hint text">
          <cwr-text-input
            [value]="hintText()"
            (valueChange)="hintText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Variant">
          <cwr-picker-input
            [options]="variants | pickerOptions"
            [value]="variant()"
            (valueChange)="variant.set($any($event))"
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
export class SnackbarPlayground {
  variants = SNACKBAR_VARIANTS;
  positions = SNACKBAR_STACK_POSITIONS;

  private snackbarStack = inject(SnackbarStackService);

  title = signal('Changes saved');
  hintText = signal('Your updates have been applied.');
  variant = signal<SnackbarVariant>('positive');
  position = signal<SnackbarStackPosition>('bottom-start');

  show(): void {
    this.snackbarStack.open({
      title: this.title(),
      hintText: this.hintText() || undefined,
      variant: this.variant(),
      position: this.position(),
    });
  }

  generatedCode = computed(() => {
    return `private snackbarStack = inject(SnackbarStackService);

showSnackbar(): void {
  this.snackbarStack.open({
    title: '${this.title()}',
    hintText: '${this.hintText()}',
    variant: '${this.variant()}',
    position: '${this.position()}',
  });
}`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
