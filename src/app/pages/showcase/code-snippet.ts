import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [MarkdownComponent],
  template: `
    <div class="code-snippet">
      @if (title) {
        <span class="code-snippet__label">{{ title }}</span>
      }
      <markdown class="code-snippet__code" clipboard [data]="fencedCode()"></markdown>
    </div>
  `,
  styles: [
    `
      .code-snippet {
        margin-bottom: var(--space-lg, 1.25rem);
        padding: var(--space-md, 1rem);
        border: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px);
        background: var(--color-bg-surface-lowered, #fafafa);
      }

      .code-snippet__label {
        display: block;
        margin-bottom: var(--space-sm, 0.75rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-muted);
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .code-snippet__code {
        display: block;

        ::ng-deep pre[class*='language-'] {
          margin: 0;
          overflow-x: auto;
          background: none;
          font: var(--text-style-input-value);
          line-height: 1.7;
        }
      }
    `,
  ],
})
export class CodeSnippet {
  @Input() title = '';
  @Input() code = '';
  @Input() language = 'typescript';

  fencedCode(): string {
    return '```' + this.language + '\n' + this.code + '\n```';
  }
}
