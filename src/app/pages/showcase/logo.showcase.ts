import { Component } from '@angular/core';
import { LogoComponent, LogomarkComponent, WordmarkComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { LogoPlayground } from './logo-playground';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-logo-showcase',
  standalone: true,
  imports: [
    LogoComponent,
    LogomarkComponent,
    WordmarkComponent,
    ExampleBlock,
    ShowcaseHeader,
    LogoPlayground,
  ],
  template: `
    <app-showcase-header
      title="Logo"
      selector="cwr-logo · cwr-logomark · cwr-wordmark"
    ></app-showcase-header>

    <app-logo-playground></app-logo-playground>

    <app-example-block title="Full logo" [code]="fullCode">
      <cwr-logo size="lg"></cwr-logo>
    </app-example-block>

    <app-example-block title="Logomark only" [code]="logomarkOnlyCode">
      <cwr-logo size="md" [showWordmark]="false"></cwr-logo>
    </app-example-block>

    <app-example-block title="Standalone logomark & wordmark" [code]="standaloneCode">
      <cwr-logomark size="sm"></cwr-logomark>
      <cwr-wordmark size="sm"></cwr-wordmark>
    </app-example-block>
  `,
})
export class LogoShowcase {
  fullCode = `<cwr-logo size="lg"></cwr-logo>`;
  logomarkOnlyCode = `<cwr-logo size="md" [showWordmark]="false"></cwr-logo>`;
  standaloneCode = `<cwr-logomark size="sm"></cwr-logomark>
<cwr-wordmark size="sm"></cwr-wordmark>`;
}
