import { Component, ViewEncapsulation, input, signal } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-highlight-snippet',
  standalone: true,
  imports: [Highlight, IconComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="hl-snippet">
      <div class="hl-snippet__preview"><ng-content></ng-content></div>
      <div class="hl-snippet__bar">
        <span class="hl-snippet__title">{{ title() }}</span>
        <span class="hl-snippet__lang">{{ language() }}</span>
        <button
          type="button"
          class="hl-snippet__copy"
          [class.hl-snippet__copy--copied]="copied()"
          [attr.aria-label]="copied() ? 'Copied' : 'Copy code'"
          (click)="copy()"
        >
          <cwr-icon
            [icon]="copied() ? 'icon.ui.check' : 'icon.ui.copy'"
            size="sm"
          ></cwr-icon>
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <pre
        class="hl-snippet__pre"
      ><code [highlight]="code()" [language]="language()"></code></pre>
    </div>
  `,
  styles: [
    `
      .hl-snippet {
        --hl-bg: #0d1117;
        --hl-fg: #e6edf3;
        --hl-comment: #8b949e;
        --hl-keyword: #ff7b72;
        --hl-string: #a5d6ff;
        --hl-number: #79c0ff;
        --hl-title: #d2a8ff;
        --hl-attr: #79c0ff;
        --hl-tag: #7ee787;
        --hl-meta: #ffa657;

        margin-bottom: var(--space-lg, 1.25rem);
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: var(--border-radius-md, 0.5rem);
        overflow: hidden;
      }

      [data-theme='light'] .hl-snippet {
        --hl-bg: #f6f8fa;
        --hl-fg: #1f2328;
        --hl-comment: #6e7781;
        --hl-keyword: #cf222e;
        --hl-string: #0a3069;
        --hl-number: #0550ae;
        --hl-title: #8250df;
        --hl-attr: #0550ae;
        --hl-tag: #116329;
        --hl-meta: #953800;
      }

      .hl-snippet__preview {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-md, 1rem);
        padding: var(--space-xl, 1.5rem);
        background: var(--color-bg-surface, transparent);
        border-bottom: 1px solid
          var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .hl-snippet__preview:empty {
        display: none;
      }

      .hl-snippet__bar {
        display: flex;
        align-items: center;
        gap: var(--space-xs, 0.5rem);
        padding: var(--space-2xs, 0.375rem) var(--space-2xs, 0.375rem)
          var(--space-2xs, 0.375rem) var(--space-md, 1rem);
        background: var(--color-bg-surface-raised, rgba(128, 128, 128, 0.08));
        border-bottom: 1px solid
          var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .hl-snippet__title {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
      }

      .hl-snippet__lang {
        padding: 0.0625rem 0.375rem;
        font-family: 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.6875rem;
        text-transform: lowercase;
        color: var(--color-text-surface-subtle, currentColor);
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: var(--border-radius-xs, 0.25rem);
      }

      .hl-snippet__copy {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.75rem;
        padding: 0 var(--space-xs, 0.5rem);
        font: var(--text-style-caption, inherit);
        color: var(--color-text-surface-secondary, currentColor);
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--border-radius-sm, 0.375rem);
        cursor: pointer;
        transition:
          background-color 120ms ease,
          border-color 120ms ease,
          color 120ms ease;
      }

      .hl-snippet__copy:hover,
      .hl-snippet__copy:focus-visible {
        color: var(--color-text-brand, currentColor);
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.12));
        border-color: var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .hl-snippet__copy--copied,
      .hl-snippet__copy--copied:hover {
        color: var(--color-text-positive, #2e7d32);
        background: var(--color-bg-positive-subtle, rgba(46, 125, 50, 0.12));
        border-color: transparent;
      }

      .hl-snippet__pre {
        margin: 0;
        padding: var(--space-md, 1rem);
        overflow-x: auto;
        background: var(--hl-bg);
        color: var(--hl-fg);
        font-family: 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        tab-size: 2;
      }

      .hl-snippet__pre code {
        font: inherit;
        color: inherit;
      }

      .hl-snippet__pre code * {
        font-family: inherit;
      }

      .hl-snippet .hljs-comment,
      .hl-snippet .hljs-quote {
        color: var(--hl-comment);
        font-style: italic;
      }

      .hl-snippet .hljs-keyword,
      .hl-snippet .hljs-selector-tag,
      .hl-snippet .hljs-built_in,
      .hl-snippet .hljs-literal,
      .hl-snippet .hljs-type {
        color: var(--hl-keyword);
      }

      .hl-snippet .hljs-string,
      .hl-snippet .hljs-regexp,
      .hl-snippet .hljs-template-variable {
        color: var(--hl-string);
      }

      .hl-snippet .hljs-number,
      .hl-snippet .hljs-variable {
        color: var(--hl-number);
      }

      .hl-snippet .hljs-title,
      .hl-snippet .hljs-title.function_,
      .hl-snippet .hljs-title.class_,
      .hl-snippet .hljs-section {
        color: var(--hl-title);
      }

      .hl-snippet .hljs-attr,
      .hl-snippet .hljs-attribute,
      .hl-snippet .hljs-property,
      .hl-snippet .hljs-params {
        color: var(--hl-attr);
      }

      .hl-snippet .hljs-name,
      .hl-snippet .hljs-tag,
      .hl-snippet .hljs-selector-class,
      .hl-snippet .hljs-selector-id {
        color: var(--hl-tag);
      }

      .hl-snippet .hljs-meta,
      .hl-snippet .hljs-symbol,
      .hl-snippet .hljs-subst {
        color: var(--hl-meta);
      }
    `,
  ],
})
export class HighlightSnippet {
  readonly title = input('');
  readonly code = input('');
  readonly language = input('typescript');

  readonly copied = signal(false);
  private timeout?: ReturnType<typeof setTimeout>;

  copy(): void {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.copied.set(false), 1400);
  }
}
