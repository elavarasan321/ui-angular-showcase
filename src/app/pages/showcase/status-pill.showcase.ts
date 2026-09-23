import { Component } from '@angular/core';
import { StatusPillComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { StatusPillPlayground } from './status-pill-playground';

@Component({
  selector: 'app-status-pill-showcase',
  standalone: true,
  imports: [StatusPillComponent, ExampleBlock, ShowcaseHeader, StatusPillPlayground],
  template: `
    <app-showcase-header title="Status Pill" selector="cwr-status-pill"></app-showcase-header>

    <app-status-pill-playground></app-status-pill-playground>
    <p>
      <code>cwr-status-pill</code> is a compact, non-interactive badge for a single fact — a
      status, a count, a label/value pair — rendered inline with text or in a table cell.
    </p>

    <app-example-block title="Intents" [code]="intentsCode">
      <cwr-status-pill intent="neutral" value="Draft"></cwr-status-pill>
      <cwr-status-pill intent="positive" value="Active"></cwr-status-pill>
      <cwr-status-pill intent="warning" value="Pending"></cwr-status-pill>
      <cwr-status-pill intent="caution" value="Review"></cwr-status-pill>
      <cwr-status-pill intent="negative" value="Rejected"></cwr-status-pill>
    </app-example-block>

    <app-example-block title="Solid variant" [code]="solidCode">
      <cwr-status-pill variant="solid" intent="positive" value="Approved"></cwr-status-pill>
      <cwr-status-pill variant="solid" intent="negative" value="Failed"></cwr-status-pill>
    </app-example-block>

    <app-example-block title="Label / value pair" [code]="labelCode">
      <cwr-status-pill intent="neutral" label="Priority" value="High"></cwr-status-pill>
    </app-example-block>

    <app-example-block title="With icons" [code]="iconCode">
      <cwr-status-pill
        intent="positive"
        value="Verified"
        leadingIcon="icon.status.success"
      ></cwr-status-pill>
      <cwr-status-pill
        intent="neutral"
        size="xs"
        value="Details"
        trailingIcon="icon.ui.external-link"
      ></cwr-status-pill>
    </app-example-block>

    <app-example-block title="Sizes" [code]="sizesCode">
      <cwr-status-pill size="sm" intent="neutral" value="Small"></cwr-status-pill>
      <cwr-status-pill size="xs" intent="neutral" value="Extra small"></cwr-status-pill>
    </app-example-block>
  `,
})
export class StatusPillShowcase {
  intentsCode = `<cwr-status-pill intent="neutral" value="Draft"></cwr-status-pill>
<cwr-status-pill intent="positive" value="Active"></cwr-status-pill>
<cwr-status-pill intent="warning" value="Pending"></cwr-status-pill>
<cwr-status-pill intent="caution" value="Review"></cwr-status-pill>
<cwr-status-pill intent="negative" value="Rejected"></cwr-status-pill>`;

  solidCode = `<cwr-status-pill variant="solid" intent="positive" value="Approved"></cwr-status-pill>
<cwr-status-pill variant="solid" intent="negative" value="Failed"></cwr-status-pill>`;

  labelCode = `<cwr-status-pill intent="neutral" label="Priority" value="High"></cwr-status-pill>`;

  iconCode = `<cwr-status-pill intent="positive" value="Verified" leadingIcon="icon.status.success"></cwr-status-pill>
<cwr-status-pill intent="neutral" size="xs" value="Details" trailingIcon="icon.ui.external-link"></cwr-status-pill>`;

  sizesCode = `<cwr-status-pill size="sm" intent="neutral" value="Small"></cwr-status-pill>
<cwr-status-pill size="xs" intent="neutral" value="Extra small"></cwr-status-pill>`;
}
