import { Component, DestroyRef, inject, signal } from '@angular/core';
import type { SkeletonLoaderBlock } from '@checkworkrights/ui-angular';
import {
  ButtonComponent,
  SkeletonLoaderComponent,
  SkeletonLoaderContentDirective,
  SkeletonLoaderPlaceholderDirective,
} from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { SkeletonLoaderPlayground } from './skeleton-loader-playground';

@Component({
  selector: 'app-skeleton-loader-showcase',
  standalone: true,
  imports: [
    ButtonComponent,
    SkeletonLoaderComponent,
    SkeletonLoaderContentDirective,
    SkeletonLoaderPlaceholderDirective,
    ExampleBlock,
    ShowcaseHeader,
    SkeletonLoaderPlayground,
    ComponentReference,
  ],
  template: `
    <app-showcase-header title="Skeleton Loader" selector="cwr-skeleton-loader"></app-showcase-header>

    <app-skeleton-loader-playground></app-skeleton-loader-playground>
    <p>
      <code>cwr-skeleton-loader</code> shows a pulsing placeholder in the shape of content that is
      still loading. It waits <code>showDelay</code> before appearing, so fast loads never flash a
      skeleton, and once shown it stays at least <code>minVisibleDuration</code>. When
      <code>loading</code> turns off, it swaps in the <code>cwrSkeletonContent</code> template.
    </p>

    <app-example-block title="Line and paragraph" [code]="linesCode">
      <div class="stack">
        <cwr-skeleton-loader [lines]="1" [showDelay]="0"></cwr-skeleton-loader>
        <cwr-skeleton-loader [lines]="3" [showDelay]="0"></cwr-skeleton-loader>
      </div>
    </app-example-block>
    <p>
      One line renders a single full-width bar. Two or more render a paragraph that ends in a
      two-thirds-width line.
    </p>

    <app-example-block title="Repeated blocks with an image" [code]="repeatedCode">
      <cwr-skeleton-loader
        [blockCount]="3"
        [lines]="2"
        [hasImage]="true"
        [showDelay]="0"
      ></cwr-skeleton-loader>
    </app-example-block>

    <app-example-block title="Non-uniform blocks" [code]="blocksCode">
      <cwr-skeleton-loader [blocks]="profileBlocks" [showDelay]="0"></cwr-skeleton-loader>
    </app-example-block>
    <p>
      <code>blocks</code> configures each block separately and takes precedence over
      <code>blockCount</code>, <code>lines</code> and <code>hasImage</code>.
    </p>

    <app-example-block title="Swapping in content" [code]="contentCode">
      <div class="stack">
        <cwr-button
          variant="outline"
          intent="neutral"
          size="sm"
          label="Reload"
          leadingIcon="icon.ui.rotate"
          [disabled]="loading()"
          (buttonClick)="reload()"
        ></cwr-button>
        <cwr-skeleton-loader [loading]="loading()" [lines]="2" [hasImage]="true">
          <ng-template cwrSkeletonContent>
            <div class="profile">
              <span class="profile__avatar" aria-hidden="true">J</span>
              <span class="profile__text">
                <strong>Jordan Smith</strong>
                <span class="profile__detail">Contractor · Onboarded 12 Mar 2025</span>
              </span>
            </div>
          </ng-template>
        </cwr-skeleton-loader>
      </div>
    </app-example-block>
    <p>
      Reload simulates a 1.5s request. The content template is only created once loading ends, and
      <code>(contentShown)</code> fires at that point.
    </p>

    <app-example-block title="Custom placeholder" [code]="placeholderCode">
      <cwr-skeleton-loader [showDelay]="0">
        <ng-template cwrSkeletonPlaceholder>
          <div class="cards">
            @for (card of [1, 2]; track card) {
              <div class="card">
                <cwr-skeleton-loader [lines]="1" [showDelay]="0" style="width: 40%;"></cwr-skeleton-loader>
                <cwr-skeleton-loader [lines]="3" [showDelay]="0"></cwr-skeleton-loader>
              </div>
            }
          </div>
        </ng-template>
      </cwr-skeleton-loader>
    </app-example-block>
    <p>
      A <code>cwrSkeletonPlaceholder</code> template replaces the generated blocks, for layouts
      the block model can't describe. The outer loader still owns the timing and the
      <code>role="status"</code> announcement.
    </p>

    <app-component-reference selector="cwr-skeleton-loader"></app-component-reference>
  `,
  styles: [
    `
      .stack {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-lg);
        width: 100%;
      }

      .profile {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }

      .profile__avatar {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        width: var(--size-3xl);
        height: var(--size-3xl);
        border-radius: var(--border-radius-full);
        background-color: var(--color-bg-neutral-muted);
        font: var(--text-style-label);
        color: var(--color-text-neutral);
      }

      .profile__text {
        display: flex;
        flex-direction: column;
        font: var(--text-style-p);
        color: var(--color-text-surface);
      }

      .profile__detail {
        color: var(--color-text-surface-secondary);
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: var(--space-md);
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-md);
        border: 1px solid var(--color-border-neutral-subtle);
        border-radius: var(--border-radius-md);
      }
    `,
  ],
})
export class SkeletonLoaderShowcase {
  protected readonly loading = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;

  protected readonly profileBlocks: SkeletonLoaderBlock[] = [
    { lines: 2, hasImage: true },
    { lines: 1 },
    { lines: 4 },
  ];

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected reload(): void {
    this.loading.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.loading.set(false), 1500);
  }

  linesCode = `<cwr-skeleton-loader [lines]="1"></cwr-skeleton-loader>
<cwr-skeleton-loader [lines]="3"></cwr-skeleton-loader>`;

  repeatedCode = `<cwr-skeleton-loader [blockCount]="3" [lines]="2" [hasImage]="true"></cwr-skeleton-loader>`;

  blocksCode = `<cwr-skeleton-loader [blocks]="profileBlocks"></cwr-skeleton-loader>

// component
profileBlocks: SkeletonLoaderBlock[] = [
  { lines: 2, hasImage: true },
  { lines: 1 },
  { lines: 4 },
];`;

  contentCode = `<cwr-skeleton-loader
  [loading]="loading()"
  [lines]="2"
  [hasImage]="true"
  (contentShown)="onContentShown()"
>
  <ng-template cwrSkeletonContent>
    <app-profile [person]="person()"></app-profile>
  </ng-template>
</cwr-skeleton-loader>`;

  placeholderCode = `<cwr-skeleton-loader [loading]="loading()">
  <ng-template cwrSkeletonPlaceholder>
    <div class="cards">
      @for (card of [1, 2]; track card) {
        <div class="card">
          <cwr-skeleton-loader [lines]="1" [showDelay]="0" style="width: 40%;"></cwr-skeleton-loader>
          <cwr-skeleton-loader [lines]="3" [showDelay]="0"></cwr-skeleton-loader>
        </div>
      }
    </div>
  </ng-template>
  <ng-template cwrSkeletonContent>
    <!-- Real cards -->
  </ng-template>
</cwr-skeleton-loader>`;
}
