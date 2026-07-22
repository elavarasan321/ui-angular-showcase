import { Component, signal } from '@angular/core';
import { IconComponent } from '@checkworkrights/ui-angular';

@Component({
  selector: 'app-markdown-copy-button',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      type="button"
      class="markdown-copy-button"
      [class.markdown-copy-button--copied]="copied()"
      (click)="onCopyToClipboardClick()"
    >
      <cwr-icon [icon]="copied() ? 'icon.ui.check' : 'icon.ui.copy'" size="lg"></cwr-icon>
    </button>
  `,
  styles: [
    `
      .markdown-copy-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--color-text-surface-secondary, currentColor);
        background: var(--color-bg-surface-nested, transparent);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-3xs, 0.25rem);
        transition:
          background-color 120ms ease,
          border-color 120ms ease;
      }

      .markdown-copy-button:hover {
        background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.1));
        border-color: var(--color-border-brand, currentColor);
      }

      .markdown-copy-button--copied {
        background: var(--color-bg-positive-subtle, rgba(0, 122, 61, 0.15));
        border-color: var(--color-border-positive, #2e7d32);
        color: var(--color-text-positive, #2e7d32);
      }
    `,
  ],
})
export class MarkdownCopyButton {
  copied = signal(false);
  private copiedTimeout?: ReturnType<typeof setTimeout>;

  onCopyToClipboardClick(): void {
    this.copied.set(true);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = setTimeout(() => this.copied.set(false), 1200);
  }
}
