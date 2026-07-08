import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  template: `
    <div class="code-snippet">
      @if (title) {
        <span class="code-snippet__label">{{ title }}</span>
      }
      <pre class="code-snippet__code"><code>{{ code }}</code></pre>
    </div>
  `,
  styles: [
    `
      .code-snippet {
        margin-bottom: var(--space-lg, 1.25rem);
        padding: var(--space-md, 1rem);
        border: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px);
        background: var(--color-bg-surface);
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
        margin: 0;
        overflow-x: auto;

        code {
          font: var(--text-style-input-value);
          line-height: 1.7;
          color: var(--color-text-surface);
        }
      }
    `,
  ],
})
export class CodeSnippet {
  @Input() title = '';
  @Input() code = '';
}
