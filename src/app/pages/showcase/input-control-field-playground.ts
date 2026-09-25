import { Component, computed, signal } from '@angular/core';
import {
  InputControlFieldComponent,
  RadioButtonComponent,
  CheckboxComponent,
  InputControlFieldLayout,
  InputControlFieldRole,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const INPUT_CONTROL_FIELD_LAYOUTS: readonly InputControlFieldLayout[] = ['vstack', 'grid'];
const INPUT_CONTROL_FIELD_ROLES: readonly InputControlFieldRole[] = ['radiogroup', 'group'];

@Component({
  selector: 'app-input-control-field-playground',
  standalone: true,
  imports: [InputControlFieldComponent, RadioButtonComponent, CheckboxComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-input-control-field
        playground-preview
        style="width: 100%;"
        [label]="label()"
        [mandatory]="mandatory()"
        [layout]="layout()"
        [role]="role()"
        [hintText]="hintText() || undefined"
        [hasError]="hasError()"
        [errorText]="hasError() ? errorText() : undefined"
      >
        @if (role() === 'radiogroup') {
          <cwr-radio-button
            label="Weekly"
            [checked]="frequency() === 'weekly'"
            (checkedChange)="frequency.set('weekly')"
          ></cwr-radio-button>
          <cwr-radio-button
            label="Fortnightly"
            [checked]="frequency() === 'fortnightly'"
            (checkedChange)="frequency.set('fortnightly')"
          ></cwr-radio-button>
          <cwr-radio-button
            label="Monthly"
            [checked]="frequency() === 'monthly'"
            (checkedChange)="frequency.set('monthly')"
          ></cwr-radio-button>
        } @else {
          <cwr-checkbox
            label="Email"
            [checked]="channels().email"
            (checkedChange)="setChannel('email', $event)"
          ></cwr-checkbox>
          <cwr-checkbox
            label="SMS"
            [checked]="channels().sms"
            (checkedChange)="setChannel('sms', $event)"
          ></cwr-checkbox>
          <cwr-checkbox
            label="Push notification"
            [checked]="channels().push"
            (checkedChange)="setChannel('push', $event)"
          ></cwr-checkbox>
        }
      </cwr-input-control-field>

      <ng-container playground-controls>
        <cwr-form-field label="Label">
          <cwr-text-input
            [value]="label()"
            (valueChange)="label.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Hint text">
          <cwr-text-input
            [value]="hintText()"
            (valueChange)="hintText.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        @if (hasError()) {
          <cwr-form-field label="Error text">
            <cwr-text-input
              [value]="errorText()"
              (valueChange)="errorText.set($event)"
            ></cwr-text-input>
          </cwr-form-field>
        }

        <cwr-form-field label="Role">
          <cwr-picker-input
            [options]="roles | pickerOptions"
            [value]="role()"
            (valueChange)="role.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Layout">
          <cwr-picker-input
            [options]="layouts | pickerOptions"
            [value]="layout()"
            (valueChange)="layout.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Mandatory"
          [checked]="mandatory()"
          (checkedChange)="mandatory.set($event)"
        ></cwr-checkbox>

        <cwr-checkbox
          label="Has error"
          [checked]="hasError()"
          (checkedChange)="hasError.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class InputControlFieldPlayground {
  roles = INPUT_CONTROL_FIELD_ROLES;
  layouts = INPUT_CONTROL_FIELD_LAYOUTS;

  label = signal('Billing frequency');
  mandatory = signal(true);
  layout = signal<InputControlFieldLayout>('vstack');
  role = signal<InputControlFieldRole>('radiogroup');
  hintText = signal('Choose how often you want to be billed');
  hasError = signal(false);
  errorText = signal('Select an option to continue');

  frequency = signal<'weekly' | 'fortnightly' | 'monthly'>('weekly');
  channels = signal({ email: true, sms: false, push: false });

  setChannel(channel: 'email' | 'sms' | 'push', checked: boolean): void {
    this.channels.set({ ...this.channels(), [channel]: checked });
  }

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`, `role="${this.role()}"`, `layout="${this.layout()}"`];
    if (this.mandatory()) attrs.push(`[mandatory]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.hasError()) attrs.push(`[hasError]="true"`);
    if (this.hasError() && this.errorText()) attrs.push(`errorText="${this.errorText()}"`);

    const options =
      this.role() === 'radiogroup'
        ? `  <cwr-radio-button label="Weekly" [checked]="frequency() === 'weekly'" (checkedChange)="frequency.set('weekly')"></cwr-radio-button>
  <cwr-radio-button label="Fortnightly" [checked]="frequency() === 'fortnightly'" (checkedChange)="frequency.set('fortnightly')"></cwr-radio-button>
  <cwr-radio-button label="Monthly" [checked]="frequency() === 'monthly'" (checkedChange)="frequency.set('monthly')"></cwr-radio-button>`
        : `  <cwr-checkbox label="Email" [checked]="channels().email" (checkedChange)="setChannel('email', $event)"></cwr-checkbox>
  <cwr-checkbox label="SMS" [checked]="channels().sms" (checkedChange)="setChannel('sms', $event)"></cwr-checkbox>
  <cwr-checkbox label="Push notification" [checked]="channels().push" (checkedChange)="setChannel('push', $event)"></cwr-checkbox>`;

    return `<cwr-input-control-field ${attrs.join(' ')}>
${options}
</cwr-input-control-field>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
