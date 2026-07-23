import { Component } from '@angular/core';
import { ScrollbarComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ScrollbarPlayground } from './scrollbar-playground';

@Component({
  selector: 'app-scrollbar-showcase',
  standalone: true,
  imports: [ScrollbarComponent, ExampleBlock, ShowcaseHeader, ScrollbarPlayground],
  template: `
    <app-showcase-header title="Scrollbar" selector="cwr-scrollbar"></app-showcase-header>
    <app-scrollbar-playground></app-scrollbar-playground>
    <p>
      <code>cwr-scrollbar</code> renders no content of its own — it must be placed as the last
      sibling immediately after the element that actually scrolls (it measures its
      <code>previousElementSibling</code> and hides that element's native scrollbar). Wrap both the
      scrollable element and the <code>cwr-scrollbar</code> tag in a
      <code>position: relative</code> container, and give the scrollable element a fixed
      <code>height</code> (for vertical overflow) or a fixed <code>width</code> with
      <code>white-space: nowrap</code> content (for horizontal overflow).
    </p>

    <app-example-block title="Vertical overflow" [code]="verticalCode">
      <div style="position: relative; height: 160px; width: 240px;">
        <div style="height: 160px; overflow: auto; padding-right: 14px;">
          <p>Right to work checks confirm a candidate's legal eligibility to work.</p>
          <p>Police checks screen for relevant criminal history.</p>
          <p>Reference checks verify past employment and conduct.</p>
          <p>Qualification checks confirm certifications and study entitlements.</p>
          <p>Visa checks track work rights and expiry dates over time.</p>
        </div>
        <cwr-scrollbar overflow="vertical"></cwr-scrollbar>
      </div>
    </app-example-block>

    <app-example-block title="Horizontal overflow" [code]="horizontalCode">
      <div style="position: relative; width: 260px;">
        <div style="overflow: auto; white-space: nowrap; padding-bottom: 14px;">
          <span style="display: inline-block; width: 140px; margin-right: 0.75rem;"
            >Right to Work</span
          >
          <span style="display: inline-block; width: 140px; margin-right: 0.75rem;"
            >Police Check</span
          >
          <span style="display: inline-block; width: 140px; margin-right: 0.75rem;"
            >Reference Check</span
          >
          <span style="display: inline-block; width: 140px; margin-right: 0.75rem;"
            >Qualification</span
          >
          <span style="display: inline-block; width: 140px;">Visa Check</span>
        </div>
        <cwr-scrollbar overflow="horizontal"></cwr-scrollbar>
      </div>
    </app-example-block>
  `,
})
export class ScrollbarShowcase {
  verticalCode = `<div style="position: relative; height: 160px; width: 240px;">
  <div style="height: 160px; overflow: auto; padding-right: 14px;">
    <p>Right to work checks confirm a candidate's legal eligibility to work.</p>
    <p>Police checks screen for relevant criminal history.</p>
    <p>Reference checks verify past employment and conduct.</p>
    <p>Qualification checks confirm certifications and study entitlements.</p>
    <p>Visa checks track work rights and expiry dates over time.</p>
  </div>
  <cwr-scrollbar overflow="vertical"></cwr-scrollbar>
</div>`;

  horizontalCode = `<div style="position: relative; width: 260px;">
  <div style="overflow: auto; white-space: nowrap; padding-bottom: 14px;">
    <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Right to Work</span>
    <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Police Check</span>
    <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Reference Check</span>
    <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Qualification</span>
    <span style="display: inline-block; width: 140px;">Visa Check</span>
  </div>
  <cwr-scrollbar overflow="horizontal"></cwr-scrollbar>
</div>`;
}
