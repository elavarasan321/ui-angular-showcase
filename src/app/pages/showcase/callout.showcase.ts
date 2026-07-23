import { Component } from '@angular/core';
import { CalloutComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { CalloutPlayground } from './callout-playground';

@Component({
  selector: 'app-callout-showcase',
  standalone: true,
  imports: [CalloutComponent, ButtonComponent, ExampleBlock, ShowcaseHeader, CalloutPlayground],
  template: `
    <app-showcase-header title="Callout" selector="cwr-callout"></app-showcase-header>

    <app-callout-playground></app-callout-playground>
    <p>
      <code>cwr-callout</code> surfaces a title, optional hint text, and an automatically chosen
      icon per variant. Project up to a few <code>cwr-button</code> elements as actions when
      <code>hasActions</code> is set.
    </p>

    <app-example-block title="Variants" [code]="variantsCode">
      <cwr-callout variant="neutral" title="Verification pending" style="width: 100%;"></cwr-callout>
      <cwr-callout variant="positive" title="Verification complete" style="width: 100%;"></cwr-callout>
      <cwr-callout variant="warning" title="Action required" style="width: 100%;"></cwr-callout>
      <cwr-callout variant="negative" title="Verification failed" style="width: 100%;"></cwr-callout>
    </app-example-block>

    <app-example-block title="Row vs column direction" [code]="directionCode">
      <cwr-callout
        variant="neutral"
        direction="row"
        title="Row direction"
        hintText="Icon and text sit side by side"
        style="width: 100%;"
      ></cwr-callout>
      <cwr-callout
        variant="neutral"
        direction="column"
        title="Column direction"
        hintText="Icon sits above the text"
        style="width: 100%;"
      ></cwr-callout>
    </app-example-block>

    <app-example-block title="With hint text" [code]="hintCode">
      <cwr-callout
        variant="warning"
        title="Documents expiring soon"
        hintText="Renew these documents before they expire to avoid a lapse in coverage."
        style="width: 100%;"
      ></cwr-callout>
    </app-example-block>

    <app-example-block title="With actions" [code]="actionsCode">
      <cwr-callout
        variant="negative"
        title="Verification failed"
        hintText="We couldn't verify this document. Try uploading it again."
        [hasActions]="true"
        style="width: 100%;"
      >
        <cwr-button variant="outline" intent="neutral" size="sm" label="Dismiss"></cwr-button>
        <cwr-button variant="solid" intent="negative" size="sm" label="Retry"></cwr-button>
      </cwr-callout>
    </app-example-block>
  `,
})
export class CalloutShowcase {
  variantsCode = `<cwr-callout variant="neutral" title="Verification pending"></cwr-callout>
<cwr-callout variant="positive" title="Verification complete"></cwr-callout>
<cwr-callout variant="warning" title="Action required"></cwr-callout>
<cwr-callout variant="negative" title="Verification failed"></cwr-callout>`;

  directionCode = `<cwr-callout variant="neutral" direction="row" title="Row direction" hintText="Icon and text sit side by side"></cwr-callout>
<cwr-callout variant="neutral" direction="column" title="Column direction" hintText="Icon sits above the text"></cwr-callout>`;

  hintCode = `<cwr-callout
  variant="warning"
  title="Documents expiring soon"
  hintText="Renew these documents before they expire to avoid a lapse in coverage."
></cwr-callout>`;

  actionsCode = `<cwr-callout
  variant="negative"
  title="Verification failed"
  hintText="We couldn't verify this document. Try uploading it again."
  [hasActions]="true"
>
  <cwr-button variant="outline" intent="neutral" size="sm" label="Dismiss"></cwr-button>
  <cwr-button variant="solid" intent="negative" size="sm" label="Retry"></cwr-button>
</cwr-callout>`;
}
