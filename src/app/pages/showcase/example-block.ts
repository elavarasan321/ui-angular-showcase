import { Component, Input } from '@angular/core';
import { HighlightSnippet } from './highlight-snippet';

@Component({
  selector: 'app-example-block',
  standalone: true,
  imports: [HighlightSnippet],
  template: `
    <section class="example-block">
      @if (title) {
        <h3 class="example-block__title">{{ title }}</h3>
      }
      <app-highlight-snippet title="Usage" [code]="code" [language]="language">
        <ng-content></ng-content>
      </app-highlight-snippet>
    </section>
  `,
  styles: [
    `
      .example-block {
        margin-bottom: var(--space-xl, 1.5rem);
      }

      .example-block__title {
        margin: 0 0 var(--space-sm, 0.75rem);
        font: var(--text-style-h4);
        color: var(--color-text-surface);
      }

      .example-block ::ng-deep .hl-snippet {
        margin-bottom: 0;
      }
    `,
  ],
})
export class ExampleBlock {
  @Input() title = '';
  @Input() code = '';
  @Input() language = 'html';
}
