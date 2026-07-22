import { Component } from '@angular/core';
import { TextOverflowComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { TextOverflowPlayground } from './text-overflow-playground';

@Component({
  selector: 'app-text-overflow-showcase',
  standalone: true,
  imports: [TextOverflowComponent, ExampleBlock, ShowcaseHeader, TextOverflowPlayground],
  template: `
    <app-showcase-header title="Text Overflow" selector="cwr-text-overflow"></app-showcase-header>

    <app-text-overflow-playground></app-text-overflow-playground>

    <app-example-block title="Trailing truncation" [code]="trailingCode">
      <cwr-text-overflow
        text="This is a long piece of text that will be truncated at the end"
        truncation="trailing"
        style="width: 220px; display: inline-block;"
      ></cwr-text-overflow>
    </app-example-block>

    <app-example-block title="Middle truncation" [code]="middleCode">
      <cwr-text-overflow
        text="/compliance/2024/visa-holder-right-to-work-check-result.pdf"
        truncation="middle"
        style="width: 220px; display: inline-block;"
      ></cwr-text-overflow>
    </app-example-block>
  `,
})
export class TextOverflowShowcase {
  trailingCode = `<cwr-text-overflow text="This is a long piece of text that will be truncated at the end"
  truncation="trailing" style="width: 220px; display: inline-block;"></cwr-text-overflow>`;

  middleCode = `<cwr-text-overflow text="/compliance/2024/visa-holder-right-to-work-check-result.pdf"
  truncation="middle" style="width: 220px; display: inline-block;"></cwr-text-overflow>`;
}
