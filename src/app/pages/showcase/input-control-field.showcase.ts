import { Component, signal } from '@angular/core';
import {
  InputControlFieldComponent,
  RadioButtonComponent,
  RadioButtonCardComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { InputControlFieldPlayground } from './input-control-field-playground';

@Component({
  selector: 'app-input-control-field-showcase',
  standalone: true,
  imports: [InputControlFieldComponent,
    RadioButtonComponent,
    RadioButtonCardComponent,
    CheckboxComponent,
    ExampleBlock,
    ShowcaseHeader,
    InputControlFieldPlayground, ComponentReference],
  template: `
    <app-showcase-header
      title="Input Control Field"
      selector="cwr-input-control-field"
    ></app-showcase-header>

    <app-input-control-field-playground></app-input-control-field-playground>
    <p>
      <code>cwr-input-control-field</code> groups a set of options — <code>cwr-radio-button</code>,
      <code>cwr-radio-button-card</code>, or <code>cwr-checkbox</code> — behind one shared label,
      hint, and error state. It renders the group's <code>role</code> so screen readers announce it
      correctly, and projected options detect the group so they surface errors only through the
      group's own hint text.
    </p>

    <app-example-block title="Radio group" [code]="radioGroupCode">
      <cwr-input-control-field
        label="Billing frequency"
        [mandatory]="true"
        role="radiogroup"
        hintText="Choose how often you want to be billed"
        style="width: 100%;"
      >
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
      </cwr-input-control-field>
    </app-example-block>

    <app-example-block title="Checkbox group" [code]="checkboxGroupCode">
      <cwr-input-control-field
        label="Notification channels"
        role="group"
        hintText="Select every channel you'd like to hear from us on"
        style="width: 100%;"
      >
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
      </cwr-input-control-field>
    </app-example-block>

    <app-example-block title="Grid layout" [code]="gridLayoutCode">
      <cwr-input-control-field
        label="Plan"
        role="radiogroup"
        layout="grid"
        style="width: 100%;"
      >
        <cwr-radio-button-card
          label="Basic"
          [checked]="plan() === 'basic'"
          (checkedChange)="plan.set('basic')"
        ></cwr-radio-button-card>
        <cwr-radio-button-card
          label="Pro"
          [checked]="plan() === 'pro'"
          (checkedChange)="plan.set('pro')"
        ></cwr-radio-button-card>
        <cwr-radio-button-card
          label="Enterprise"
          [checked]="plan() === 'enterprise'"
          (checkedChange)="plan.set('enterprise')"
        ></cwr-radio-button-card>
      </cwr-input-control-field>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-input-control-field
        label="Billing frequency"
        [mandatory]="true"
        role="radiogroup"
        [hasError]="true"
        errorText="Select a billing frequency to continue"
        style="width: 100%;"
      >
        <cwr-radio-button label="Weekly"></cwr-radio-button>
        <cwr-radio-button label="Fortnightly"></cwr-radio-button>
        <cwr-radio-button label="Monthly"></cwr-radio-button>
      </cwr-input-control-field>
    </app-example-block>

    <app-component-reference selector="cwr-input-control-field"></app-component-reference>
  `,
})
export class InputControlFieldShowcase {
  frequency = signal<'weekly' | 'fortnightly' | 'monthly'>('weekly');
  channels = signal({ email: true, sms: false, push: false });
  plan = signal<'basic' | 'pro' | 'enterprise'>('pro');

  setChannel(channel: 'email' | 'sms' | 'push', checked: boolean): void {
    this.channels.set({ ...this.channels(), [channel]: checked });
  }

  radioGroupCode = `<cwr-input-control-field
  label="Billing frequency"
  [mandatory]="true"
  role="radiogroup"
  hintText="Choose how often you want to be billed"
>
  <cwr-radio-button label="Weekly" [checked]="frequency() === 'weekly'" (checkedChange)="frequency.set('weekly')"></cwr-radio-button>
  <cwr-radio-button label="Fortnightly" [checked]="frequency() === 'fortnightly'" (checkedChange)="frequency.set('fortnightly')"></cwr-radio-button>
  <cwr-radio-button label="Monthly" [checked]="frequency() === 'monthly'" (checkedChange)="frequency.set('monthly')"></cwr-radio-button>
</cwr-input-control-field>`;

  checkboxGroupCode = `<cwr-input-control-field
  label="Notification channels"
  role="group"
  hintText="Select every channel you'd like to hear from us on"
>
  <cwr-checkbox label="Email" [checked]="channels().email" (checkedChange)="setChannel('email', $event)"></cwr-checkbox>
  <cwr-checkbox label="SMS" [checked]="channels().sms" (checkedChange)="setChannel('sms', $event)"></cwr-checkbox>
  <cwr-checkbox label="Push notification" [checked]="channels().push" (checkedChange)="setChannel('push', $event)"></cwr-checkbox>
</cwr-input-control-field>`;

  gridLayoutCode = `<cwr-input-control-field label="Plan" role="radiogroup" layout="grid">
  <cwr-radio-button-card label="Basic" [checked]="plan() === 'basic'" (checkedChange)="plan.set('basic')"></cwr-radio-button-card>
  <cwr-radio-button-card label="Pro" [checked]="plan() === 'pro'" (checkedChange)="plan.set('pro')"></cwr-radio-button-card>
  <cwr-radio-button-card label="Enterprise" [checked]="plan() === 'enterprise'" (checkedChange)="plan.set('enterprise')"></cwr-radio-button-card>
</cwr-input-control-field>`;

  errorCode = `<cwr-input-control-field
  label="Billing frequency"
  [mandatory]="true"
  role="radiogroup"
  [hasError]="true"
  errorText="Select a billing frequency to continue"
>
  <cwr-radio-button label="Weekly"></cwr-radio-button>
  <cwr-radio-button label="Fortnightly"></cwr-radio-button>
  <cwr-radio-button label="Monthly"></cwr-radio-button>
</cwr-input-control-field>`;
}
