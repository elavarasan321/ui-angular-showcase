import { Component, Input } from '@angular/core';
import { CodeSnippet } from './code-snippet';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CodeSnippet],
  template: `
    <section class="playground">
      <h3 class="playground__title">Playground</h3>
      <div class="playground__body">
        <div class="playground__preview">
          <ng-content select="[playground-preview]"></ng-content>
        </div>
        <div class="playground__controls">
          <ng-content select="[playground-controls]"></ng-content>
        </div>
      </div>
      <app-code-snippet [language]="language" [code]="code"></app-code-snippet>
    </section>
  `,
  styles: [
    `
      .playground {
        margin-bottom: var(--space-xl, 1.5rem);
        border: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px);
        overflow: hidden;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }

      .playground__title {
        margin: 0;
        padding: var(--space-sm, 0.75rem) var(--space-md, 1rem);
        font: var(--text-style-h4);
        color: var(--color-text-surface-secondary);
        border-bottom: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        background: var(--color-bg-surface-lowered, #fafafa);
      }

      .playground__body {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-lg, 1.25rem);
        padding: var(--space-lg, 1.25rem);
      }

      .playground__preview {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--space-md, 1rem);
        flex: 1 1 12rem;
        min-height: 6rem;
        padding: var(--space-md, 1rem);
        border: 1px dashed var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px);
        background: var(--color-bg-surface);
      }

      .playground__controls {
        display: flex;
        flex-direction: column;
        flex: 1 1 16rem;
        gap: var(--space-sm, 0.75rem);
      }
    `,
  ],
})
export class Playground {
  @Input() code = '';
  @Input() language = 'html';
}
