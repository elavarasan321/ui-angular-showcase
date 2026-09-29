import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonComponent,
  EmptyStateContentBlockComponent,
  InlineButtonComponent,
} from '@checkworkrights/ui-angular';
import { GlobalSearchService } from '../../components/global-search/global-search.service';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmptyStateContentBlockComponent, ButtonComponent, InlineButtonComponent],
  template: `
    <cwr-empty-state-content-block
      illustration="illustration.ui.link-broken"
      title="Page not found"
      [description]="description"
    >
      <cwr-button
        variant="solid"
        intent="brand"
        size="sm"
        label="Go to Getting Started"
        (buttonClick)="goHome()"
      ></cwr-button>
      <cwr-inline-button variant="neutral" (click)="openSearch()"
        >Search components</cwr-inline-button
      >
    </cwr-empty-state-content-block>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        padding-block: var(--space-3xl, 4rem);
      }
    `,
  ],
})
export class NotFound {
  private readonly router = inject(Router);
  private readonly searchService = inject(GlobalSearchService);

  protected readonly description = `There's no page at ${this.router.url.split(/[?#]/)[0]}. It may have been renamed or removed.`;

  protected goHome(): void {
    this.router.navigate(['/getting-started']);
  }

  protected openSearch(): void {
    this.searchService.openDialog();
  }
}
