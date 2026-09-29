import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@checkworkrights/ui-angular';
import { UI_ANGULAR_SOURCE_URL } from '../../library-version.generated';
import { ALL_SHOWCASE_PAGES, findPageByPath } from '../../showcase-pages';

/** Browse URL of this showcase's repository; "Edit this page" links point here. */
const SHOWCASE_SOURCE_URL = 'https://github.com/elavarasan321/ui-angular-showcase';
const SHOWCASE_BRANCH = 'main';

/** Edit / view-source links and previous/next navigation, shown under every showcase page. */
@Component({
  selector: 'app-page-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    @if (page(); as page) {
      <footer class="page-footer">
        <div class="page-footer__links">
          <a [href]="editUrl()" target="_blank" rel="noopener">
            <cwr-icon icon="icon.ui.edit" size="sm" />
            Edit this page
          </a>
          @if (sourceUrl(); as sourceUrl) {
            <a [href]="sourceUrl" target="_blank" rel="noopener">
              <cwr-icon icon="icon.ui.external-link" size="sm" />
              View {{ page.selectors![0] }} source
            </a>
          }
        </div>

        <nav class="page-footer__pager" aria-label="Previous and next pages">
          @if (previous(); as previous) {
            <a class="pager-link" [routerLink]="'/' + previous.route">
              <span class="pager-link__hint">Previous</span>
              <span class="pager-link__label">
                <cwr-icon icon="icon.ui.arrow-left" size="sm" />
                {{ previous.label }}
              </span>
            </a>
          }
          @if (next(); as next) {
            <a class="pager-link pager-link--next" [routerLink]="'/' + next.route">
              <span class="pager-link__hint">Next</span>
              <span class="pager-link__label">
                {{ next.label }}
                <cwr-icon icon="icon.ui.arrow-right" size="sm" />
              </span>
            </a>
          }
        </nav>
      </footer>
    }
  `,
  styles: [
    `
      .page-footer {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg, 1.25rem);
        margin-top: var(--space-2xl, 3rem);
        padding-top: var(--space-lg, 1.25rem);
        border-top: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .page-footer__links {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-lg, 1.25rem);
      }

      .page-footer__links a {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2xs, 0.375rem);
        font: var(--text-style-label);
        color: var(--color-text-surface-secondary);
        text-decoration: none;
      }

      .page-footer__links a:hover {
        color: var(--color-text-brand);
        text-decoration: underline;
      }

      .page-footer__pager {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md, 1rem);
      }

      .pager-link {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        padding: var(--space-md, 1rem);
        border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
        border-radius: var(--border-radius-md, 0.5rem);
        color: var(--color-text-surface);
        text-decoration: none;
        transition: border-color 0.12s ease;
      }

      .pager-link:hover,
      .pager-link:focus-visible {
        border-color: var(--color-text-brand);
      }

      .pager-link--next {
        grid-column: 2;
        align-items: flex-end;
        text-align: right;
      }

      .pager-link__hint {
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .pager-link__label {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2xs, 0.375rem);
        font: var(--text-style-label);
        color: var(--color-text-brand);
      }

      @media (max-width: 600px) {
        .page-footer__pager {
          grid-template-columns: 1fr;
        }

        .pager-link--next {
          grid-column: 1;
        }
      }
    `,
  ],
})
export class PageFooter {
  /** Current router path, e.g. `/showcase/button`. */
  readonly path = input.required<string>();

  protected readonly page = computed(() => findPageByPath(this.path()));

  private readonly index = computed(() => {
    const page = this.page();
    return page ? ALL_SHOWCASE_PAGES.indexOf(page) : -1;
  });

  protected readonly previous = computed(() =>
    this.index() > 0 ? ALL_SHOWCASE_PAGES[this.index() - 1] : undefined,
  );

  protected readonly next = computed(() =>
    this.index() >= 0 ? ALL_SHOWCASE_PAGES[this.index() + 1] : undefined,
  );

  protected readonly editUrl = computed(
    () => `${SHOWCASE_SOURCE_URL}/edit/${SHOWCASE_BRANCH}/src/app/pages/${this.page()?.file}.ts`,
  );

  /** Library folder of the page's first selector: `cwr-menu` → `src/lib/menu`. */
  protected readonly sourceUrl = computed(() => {
    const selector = this.page()?.selectors?.[0];
    return selector && UI_ANGULAR_SOURCE_URL
      ? `${UI_ANGULAR_SOURCE_URL}/src/lib/${selector.replace(/^cwr-/, '')}`
      : null;
  });
}
