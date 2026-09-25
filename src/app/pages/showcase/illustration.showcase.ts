import { Component } from '@angular/core';
import { IllustrationComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { IllustrationPlayground } from './illustration-playground';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';

@Component({
  selector: 'app-illustration-showcase',
  standalone: true,
  imports: [IllustrationComponent, ExampleBlock, ShowcaseHeader, IllustrationPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Illustration" selector="cwr-illustration"></app-showcase-header>

    <app-illustration-playground></app-illustration-playground>

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

    <app-component-reference selector="cwr-illustration"></app-component-reference>
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
