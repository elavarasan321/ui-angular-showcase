import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-example-block',
  standalone: true,
  imports: [MarkdownComponent],
  template: `
    <section class="example-block">
      @if (title) {
        <h3 class="example-block__title">{{ title }}</h3>
      }
      <div class="example-block__demo">
        <ng-content></ng-content>
      </div>
      <div class="example-block__code-wrapper">
        <span class="example-block__code-label">Usage</span>
        <markdown class="example-block__code" clipboard [data]="fencedCode()"></markdown>
      </div>
    </section>
  `,
  styles: [
    `
      .example-block {
        margin-bottom: var(--space-xl);
        border: 1px solid var(--color-border-neutral-subtle);
        border-radius: var(--border-radius-md);
        overflow: hidden;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }

      .example-block__title {
        margin: 0;
        padding: var(--space-sm) var(--space-md);
        font: var(--text-style-h4);
        color: var(--color-text-surface-secondary);
        border-bottom: 1px solid var(--color-border-neutral-subtle);
        background: var(--color-bg-surface-lowered);
      }

      .example-block__demo {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-lg);
      }

      .example-block__code-wrapper {
        position: relative;
        padding: var(--space-md, 1rem) var(--space-md, 1rem) var(--space-lg, 1.25rem);
        border-top: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        background: var(--color-bg-surface-lowered, #fafafa);
      }

      .example-block__code-label {
        display: block;
        margin-bottom: var(--space-sm, 0.75rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-muted);
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .example-block__code {
        display: block;

        ::ng-deep pre[class*='language-'] {
          margin: 0;
          overflow-x: auto;
          background: var(--color-bg-surface-lowered);
          font: var(--text-style-p);
        }
      }
    `,
  ],
})
export class ExampleBlock {
  @Input() title = '';
  @Input() code = '';
  @Input() language = 'html';

  fencedCode(): string {
    return '```' + this.language + '\n' + this.code + '\n```';
  }
}
