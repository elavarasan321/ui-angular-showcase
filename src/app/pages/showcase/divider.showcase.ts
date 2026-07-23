import { Component } from '@angular/core';
import { DividerComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { DividerPlayground } from './divider-playground';

@Component({
  selector: 'app-divider-showcase',
  standalone: true,
  imports: [DividerComponent, ExampleBlock, ShowcaseHeader, DividerPlayground],
  template: `
    <app-showcase-header title="Divider" selector="cwr-divider"></app-showcase-header>
    <app-divider-playground></app-divider-playground>
    <p>
      <code>cwr-divider</code> renders no content of its own — it's a thin styled line. Vertical
      dividers need an explicit height (directly on the element, or via a sized flex/grid
      container) to be visible, since the element defaults to <code>height: 100%</code> of its
      parent.
    </p>

    <app-example-block title="Horizontal" [code]="horizontalCode">
      <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
        <span>Section one</span>
        <cwr-divider orientation="horizontal"></cwr-divider>
        <span>Section two</span>
      </div>
    </app-example-block>

    <app-example-block title="Vertical" [code]="verticalCode">
      <div style="display: flex; align-items: center; gap: 0.75rem; height: 3rem;">
        <span>Left</span>
        <cwr-divider orientation="vertical" style="height: 3rem;"></cwr-divider>
        <span>Right</span>
      </div>
    </app-example-block>

    <app-example-block title="Sizes" [code]="sizesCode">
      <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
        <cwr-divider size="default"></cwr-divider>
        <cwr-divider size="thick"></cwr-divider>
        <cwr-divider size="thickest"></cwr-divider>
      </div>
    </app-example-block>

    <app-example-block title="Rounded" [code]="roundedCode">
      <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
        <cwr-divider size="thickest" [rounded]="true"></cwr-divider>
        <cwr-divider size="thickest" [rounded]="false"></cwr-divider>
      </div>
    </app-example-block>
  `,
})
export class DividerShowcase {
  horizontalCode = `<div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
  <span>Section one</span>
  <cwr-divider orientation="horizontal"></cwr-divider>
  <span>Section two</span>
</div>`;

  verticalCode = `<div style="display: flex; align-items: center; gap: 0.75rem; height: 3rem;">
  <span>Left</span>
  <cwr-divider orientation="vertical" style="height: 3rem;"></cwr-divider>
  <span>Right</span>
</div>`;

  sizesCode = `<cwr-divider size="default"></cwr-divider>
<cwr-divider size="thick"></cwr-divider>
<cwr-divider size="thickest"></cwr-divider>`;

  roundedCode = `<cwr-divider size="thickest" [rounded]="true"></cwr-divider>
<cwr-divider size="thickest" [rounded]="false"></cwr-divider>`;
}
