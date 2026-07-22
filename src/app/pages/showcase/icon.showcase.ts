import { Component } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { IconPlayground } from './icon-playground';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-icon-showcase',
  standalone: true,
  imports: [IconComponent, ExampleBlock, ShowcaseHeader, IconPlayground],
  template: `
    <app-showcase-header title="Icon" selector="cwr-icon"></app-showcase-header>

    <app-icon-playground></app-icon-playground>

    <app-example-block title="Sizes" [code]="sizesCode">
      <cwr-icon icon="icon.ui.placeholder" size="xs"></cwr-icon>
      <cwr-icon icon="icon.ui.placeholder" size="sm"></cwr-icon>
      <cwr-icon icon="icon.ui.placeholder" size="md"></cwr-icon>
      <cwr-icon icon="icon.ui.placeholder" size="lg"></cwr-icon>
      <cwr-icon icon="icon.ui.placeholder" size="xl"></cwr-icon>
    </app-example-block>

    <app-example-block title="Different icon keys" [code]="keysCode">
      <cwr-icon icon="icon.nav.admin" size="lg"></cwr-icon>
      <cwr-icon icon="icon.ui.search" size="lg"></cwr-icon>
      <cwr-icon icon="icon.status.success" size="lg"></cwr-icon>
    </app-example-block>
  `,
})
export class IconShowcase {
  sizesCode = `<cwr-icon icon="icon.ui.placeholder" size="xs"></cwr-icon>
<cwr-icon icon="icon.ui.placeholder" size="sm"></cwr-icon>
<cwr-icon icon="icon.ui.placeholder" size="md"></cwr-icon>
<cwr-icon icon="icon.ui.placeholder" size="lg"></cwr-icon>
<cwr-icon icon="icon.ui.placeholder" size="xl"></cwr-icon>`;

  keysCode = `<cwr-icon icon="icon.nav.admin" size="lg"></cwr-icon>
<cwr-icon icon="icon.ui.search" size="lg"></cwr-icon>
<cwr-icon icon="icon.status.success" size="lg"></cwr-icon>`;
}
