import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-header',
  standalone: true,
  template: `
    <header class="showcase-header">
      <h1>{{ title }}</h1>
      <span class="showcase-header__badge">{{ selector }}</span>
    </header>
  `,
  styles: [
    `
      .showcase-header {
        display: flex;
        align-items: center;
        gap: var(--space-md, 1rem);
        margin-bottom: var(--space-lg, 1.25rem);
      }

      .showcase-header h1 {
        margin: 0;
      }

      .showcase-header__badge {
        display: inline-flex;
        align-items: center;
        padding: var(--space-3xs, 0.25rem) var(--space-sm, 0.75rem);
        border-radius: var(--border-radius-full, 999px);
        background: var(--color-bg-brand);
        color: var(--color-text-brand-inverse);
        font: var(--text-style-caption);
        font-family: 'SFMono-Regular', Consolas, monospace;
        white-space: nowrap;
      }
    `,
  ],
})
export class ShowcaseHeader {
  @Input() title = '';
  @Input() selector = '';
}
