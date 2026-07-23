import { Component } from '@angular/core';
import { ToggleComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { TogglePlayground } from './toggle-playground';

@Component({
  selector: 'app-toggle-showcase',
  standalone: true,
  imports: [ToggleComponent, ExampleBlock, ShowcaseHeader, TogglePlayground],
  template: `
    <app-showcase-header title="Toggle" selector="cwr-toggle"></app-showcase-header>

    <app-toggle-playground></app-toggle-playground>

    <app-example-block title="Label position" [code]="positionCode">
      <cwr-toggle label="Label at start" position="start"></cwr-toggle>
      <cwr-toggle label="Label at end" position="end"></cwr-toggle>
    </app-example-block>

    <app-example-block title="States" [code]="statesCode">
      <cwr-toggle label="Idle" state="idle"></cwr-toggle>
      <cwr-toggle
        label="Error"
        state="error"
        errorText="Something went wrong. Please try again."
      ></cwr-toggle>
      <cwr-toggle label="Loading" state="loading"></cwr-toggle>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-toggle label="Disabled unchecked" [disabled]="true"></cwr-toggle>
      <cwr-toggle label="Disabled checked" [checked]="true" [disabled]="true"></cwr-toggle>
    </app-example-block>
  `,
})
export class ToggleShowcase {
  positionCode = `<cwr-toggle label="Label at start" position="start"></cwr-toggle>
<cwr-toggle label="Label at end" position="end"></cwr-toggle>`;

  statesCode = `<cwr-toggle label="Idle" state="idle"></cwr-toggle>
<cwr-toggle label="Error" state="error" errorText="Something went wrong. Please try again."></cwr-toggle>
<cwr-toggle label="Loading" state="loading"></cwr-toggle>`;

  disabledCode = `<cwr-toggle label="Disabled unchecked" [disabled]="true"></cwr-toggle>
<cwr-toggle label="Disabled checked" [checked]="true" [disabled]="true"></cwr-toggle>`;
}
