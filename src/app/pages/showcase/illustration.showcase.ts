import { Component } from '@angular/core';
import { IllustrationComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-illustration-showcase',
  standalone: true,
  imports: [IllustrationComponent, ExampleBlock, ShowcaseHeader],
  template: `
    <app-showcase-header title="Illustration" selector="cwr-illustration"></app-showcase-header>

    <app-example-block title="Sizes" [code]="sizesCode">
      <cwr-illustration illustration="illustration.document.complete" size="xs"></cwr-illustration>
      <cwr-illustration illustration="illustration.document.complete" size="sm"></cwr-illustration>
      <cwr-illustration illustration="illustration.document.complete" size="md"></cwr-illustration>
      <cwr-illustration illustration="illustration.document.complete" size="lg"></cwr-illustration>
    </app-example-block>

    <app-example-block title="Different illustration keys" [code]="keysCode">
      <cwr-illustration illustration="illustration.document.awaiting-verification" size="md"></cwr-illustration>
      <cwr-illustration illustration="illustration.document.expired" size="md"></cwr-illustration>
      <cwr-illustration illustration="illustration.document.fail" size="md"></cwr-illustration>
    </app-example-block>
  `,
})
export class IllustrationShowcase {
  sizesCode = `<cwr-illustration illustration="illustration.document.complete" size="xs"></cwr-illustration>
<cwr-illustration illustration="illustration.document.complete" size="sm"></cwr-illustration>
<cwr-illustration illustration="illustration.document.complete" size="md"></cwr-illustration>
<cwr-illustration illustration="illustration.document.complete" size="lg"></cwr-illustration>`;

  keysCode = `<cwr-illustration illustration="illustration.document.awaiting-verification" size="md"></cwr-illustration>
<cwr-illustration illustration="illustration.document.expired" size="md"></cwr-illustration>
<cwr-illustration illustration="illustration.document.fail" size="md"></cwr-illustration>`;
}
