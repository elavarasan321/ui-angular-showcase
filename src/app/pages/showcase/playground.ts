import { Component, Input, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ButtonComponent,
  SegmentControlComponent,
  SegmentControlItem,
} from '@checkworkrights/ui-angular';
import { HighlightSnippet } from './highlight-snippet';
import { PREVIEW_THEME_PARAM, PlaygroundState } from './playground-state';

type PreviewTheme = 'page' | 'light' | 'dark';

const PREVIEW_THEMES: SegmentControlItem[] = [
  { value: 'page', label: 'Page', ariaLabel: 'Preview in the page theme' },
  { value: 'light', label: 'Light', ariaLabel: 'Preview in the light theme' },
  { value: 'dark', label: 'Dark', ariaLabel: 'Preview in the dark theme' },
];

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [HighlightSnippet, ButtonComponent, SegmentControlComponent],
  template: `
    <section class="playground">
      <div class="playground__header">
        <h3 class="playground__title">Playground</h3>
        <div class="playground__actions">
          <cwr-segment-control
            variant="text-only"
            [items]="previewThemes"
            [checkedValue]="previewTheme()"
            (checkedValueChange)="setPreviewTheme($any($event))"
          ></cwr-segment-control>
          @if (state) {
            <cwr-button
              variant="ghost"
              intent="neutral"
              size="sm"
              label="Reset"
              leadingIcon="icon.ui.rotate"
              [disabled]="!state.dirty()"
              (buttonClick)="state.reset()"
            ></cwr-button>
          }
        </div>
      </div>
      <div class="playground__body">
        <!-- data-theme scopes the token set to the preview; overlays rendered at <body> level
             (dialogs, drawers, tooltips) still follow the page theme. -->
        <div
          class="playground__preview"
          [attr.data-theme]="previewTheme() === 'page' ? null : previewTheme()"
        >
          <ng-content select="[playground-preview]"></ng-content>
        </div>
        <div class="playground__controls">
          <ng-content select="[playground-controls]"></ng-content>
        </div>
      </div>
      <app-highlight-snippet
        title="Usage"
        [language]="language"
        [code]="code"
      ></app-highlight-snippet>
    </section>
  `,
  styles: [
    `
      .playground {
        margin-bottom: var(--space-xl, 1.5rem);
        border: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }

      /* No overflow: hidden on .playground — cwr-picker-input's popup is absolutely positioned
         and would be clipped, so the rounded corners are applied to the first/last children. */
      .playground ::ng-deep .hl-snippet {
        margin: 0;
        border-width: 1px 0 0;
        border-radius: 0 0 var(--border-radius-md, 8px) var(--border-radius-md, 8px);
        overflow: hidden;
      }

      .playground__header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-sm, 0.75rem);
        padding: var(--space-xs, 0.5rem) var(--space-md, 1rem);
        border-bottom: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px) var(--border-radius-md, 8px) 0 0;
        background: var(--color-bg-surface-lowered, #fafafa);
      }

      .playground__title {
        margin: 0;
        font: var(--text-style-h4);
        color: var(--color-text-surface-secondary);
      }

      .playground__actions {
        display: flex;
        align-items: center;
        gap: var(--space-xs, 0.5rem);
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
        color: var(--color-text-surface);
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
  /** From `playgroundState(this)` in the host playground; enables the Reset button. */
  @Input() state?: PlaygroundState;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly previewThemes = PREVIEW_THEMES;
  protected readonly previewTheme = signal<PreviewTheme>(this.readPreviewTheme());

  protected setPreviewTheme(theme: PreviewTheme): void {
    if (theme === this.previewTheme()) return;
    this.previewTheme.set(theme);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [PREVIEW_THEME_PARAM]: theme === 'page' ? null : theme },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private readPreviewTheme(): PreviewTheme {
    const raw = this.route.snapshot.queryParamMap.get(PREVIEW_THEME_PARAM);
    return raw === 'light' || raw === 'dark' ? raw : 'page';
  }
}
