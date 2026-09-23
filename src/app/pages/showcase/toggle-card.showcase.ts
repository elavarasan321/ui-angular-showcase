import { Component, signal } from '@angular/core';
import { ToggleCardComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ToggleCardPlayground } from './toggle-card-playground';

@Component({
  selector: 'app-toggle-card-showcase',
  standalone: true,
  imports: [ToggleCardComponent, ExampleBlock, ShowcaseHeader, ToggleCardPlayground],
  template: `
    <app-showcase-header title="Toggle Card" selector="cwr-toggle-card"></app-showcase-header>

    <app-toggle-card-playground></app-toggle-card-playground>
    <p>
      <code>cwr-toggle-card</code> wraps a <code>cwr-toggle</code> in a bordered, clickable card
      surface, so the whole row — not just the switch — responds to a click.
    </p>

    <app-example-block title="Checked & unchecked" [code]="checkedCode">
      <cwr-toggle-card
        label="Email notifications"
        [checked]="emailNotifications()"
        (checkedChange)="emailNotifications.set($event)"
      ></cwr-toggle-card>
      <cwr-toggle-card
        label="SMS notifications"
        [checked]="smsNotifications()"
        (checkedChange)="smsNotifications.set($event)"
      ></cwr-toggle-card>
    </app-example-block>

    <app-example-block title="With hint text" [code]="hintCode">
      <cwr-toggle-card
        label="Auto-renew subscription"
        hintText="Renews automatically at the end of each billing cycle"
        [checked]="true"
      ></cwr-toggle-card>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-toggle-card
        label="Accept marketing emails"
        state="error"
        errorText="Choose an option to continue"
      ></cwr-toggle-card>
    </app-example-block>

    <app-example-block title="Loading & disabled" [code]="loadingDisabledCode">
      <cwr-toggle-card label="Saving preference…" state="loading" [checked]="true"></cwr-toggle-card>
      <cwr-toggle-card label="Disabled option" [disabled]="true"></cwr-toggle-card>
    </app-example-block>

    <app-example-block title="Label position" [code]="positionCode">
      <cwr-toggle-card label="Label before switch" position="start" [checked]="true"></cwr-toggle-card>
    </app-example-block>
  `,
})
export class ToggleCardShowcase {
  emailNotifications = signal(true);
  smsNotifications = signal(false);

  checkedCode = `<cwr-toggle-card label="Email notifications" [checked]="emailNotifications()" (checkedChange)="emailNotifications.set($event)"></cwr-toggle-card>
<cwr-toggle-card label="SMS notifications" [checked]="smsNotifications()" (checkedChange)="smsNotifications.set($event)"></cwr-toggle-card>`;

  hintCode = `<cwr-toggle-card
  label="Auto-renew subscription"
  hintText="Renews automatically at the end of each billing cycle"
  [checked]="true"
></cwr-toggle-card>`;

  errorCode = `<cwr-toggle-card
  label="Accept marketing emails"
  state="error"
  errorText="Choose an option to continue"
></cwr-toggle-card>`;

  loadingDisabledCode = `<cwr-toggle-card label="Saving preference…" state="loading" [checked]="true"></cwr-toggle-card>
<cwr-toggle-card label="Disabled option" [disabled]="true"></cwr-toggle-card>`;

  positionCode = `<cwr-toggle-card label="Label before switch" position="start" [checked]="true"></cwr-toggle-card>`;
}
