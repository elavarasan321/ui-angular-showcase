import { Component } from '@angular/core';
import { SpinnerComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-spinner-showcase',
  standalone: true,
  imports: [SpinnerComponent, ExampleBlock, ShowcaseHeader],
  template: `
    <app-showcase-header title="Spinner" selector="cwr-spinner"></app-showcase-header>
    <p>
      <code>cwr-spinner</code> positions itself absolutely over its parent by default — set
      <code>style="position: relative"</code> on it (or on a wrapper) to render it inline.
    </p>

    <app-example-block title="Sizes" [code]="sizesCode">
      <cwr-spinner size="xs" style="position: relative;"></cwr-spinner>
      <cwr-spinner size="sm" style="position: relative;"></cwr-spinner>
      <cwr-spinner size="md" style="position: relative;"></cwr-spinner>
      <cwr-spinner size="lg" style="position: relative;"></cwr-spinner>
      <cwr-spinner size="xl" style="position: relative;"></cwr-spinner>
    </app-example-block>
  `,
})
export class SpinnerShowcase {
  sizesCode = `<cwr-spinner size="xs" style="position: relative;"></cwr-spinner>
<cwr-spinner size="sm" style="position: relative;"></cwr-spinner>
<cwr-spinner size="md" style="position: relative;"></cwr-spinner>
<cwr-spinner size="lg" style="position: relative;"></cwr-spinner>
<cwr-spinner size="xl" style="position: relative;"></cwr-spinner>`;
}
