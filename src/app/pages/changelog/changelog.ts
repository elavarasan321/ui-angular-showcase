import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalloutComponent, StyledLinkComponent } from '@checkworkrights/ui-angular';
import { UI_ANGULAR_SOURCE_URL, UI_ANGULAR_VERSION } from '../../library-version.generated';
import { CHANGELOG } from './changelog.generated';

/** `1.0.32-dev.d968770` → `1.0.32` */
const INSTALLED_RELEASE = UI_ANGULAR_VERSION.replace(/-.*$/, '');

@Component({
  selector: 'app-changelog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalloutComponent, StyledLinkComponent],
  template: `
    <h1>Changelog</h1>
    <p class="lead">
      Release notes for <code>&#64;checkworkrights/ui-angular</code>, read from the
      <code>CHANGELOG.md</code> in the installed package (v{{ installedVersion }}).
      @if (changelogUrl) {
        <cwr-styled-link [href]="changelogUrl" target="_blank" rel="noopener"
          >View it on GitHub</cwr-styled-link
        >
      }
    </p>

    @if (!hasInstalledRelease) {
      <cwr-callout
        class="notice"
        variant="warning"
        [title]="'No entry for v' + installedRelease + ' yet'"
        hintText="The library's changelog hasn't been updated for the version this showcase runs, so recent changes may be missing below."
      ></cwr-callout>
    }

    @for (release of releases; track release.version) {
      <section class="release" [id]="'v' + release.version">
        <h2
          class="release__title"
          [attr.data-toc-label]="release.version === 'Unreleased' ? 'Unreleased' : 'v' + release.version"
        >
          {{ release.version === 'Unreleased' ? 'Unreleased' : 'v' + release.version }}
          @if (release.date) {
            <span class="release__date">{{ release.date }}</span>
          }
          @if (release.version === installedRelease) {
            <span class="release__installed">Installed</span>
          }
        </h2>
        @for (section of release.sections; track $index) {
          @if (section.title) {
            <h3 class="release__section" data-toc-ignore>{{ section.title }}</h3>
          }
          <div class="release__body" [innerHTML]="section.html"></div>
        }
      </section>
    } @empty {
      <p>The installed package doesn't include a changelog.</p>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 56rem;
      }

      code {
        font-family: 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.875em;
      }

      .lead {
        margin: 0 0 var(--space-xl, 1.5rem);
        color: var(--color-text-surface-secondary, inherit);
      }

      .notice {
        display: block;
        width: 100%;
        margin-bottom: var(--space-xl, 1.5rem);
      }

      .release {
        padding-bottom: var(--space-lg, 1.25rem);
        margin-bottom: var(--space-lg, 1.25rem);
        border-bottom: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
      }

      .release__title {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-sm, 0.75rem);
        margin: 0 0 var(--space-sm, 0.75rem);
      }

      .release__date {
        font: var(--text-style-label);
        color: var(--color-text-surface-secondary);
      }

      .release__installed {
        padding: var(--space-3xs, 0.25rem) var(--space-sm, 0.75rem);
        border-radius: var(--border-radius-full, 999px);
        background: var(--color-bg-neutral);
        color: var(--color-text-neutral-inverse);
        font: var(--text-style-label-sm);
      }

      .release__section {
        margin: var(--space-md, 1rem) 0 var(--space-xs, 0.5rem);
        font: var(--text-style-h4);
      }

      .release__body ::ng-deep ul {
        margin: 0;
        padding-left: 1.25rem;
      }

      .release__body ::ng-deep li {
        margin: 0.25rem 0;
      }
    `,
  ],
})
export class Changelog {
  protected readonly releases = CHANGELOG;
  protected readonly installedVersion = UI_ANGULAR_VERSION;
  protected readonly installedRelease = INSTALLED_RELEASE;
  protected readonly hasInstalledRelease = CHANGELOG.some((r) => r.version === INSTALLED_RELEASE);
  protected readonly changelogUrl = UI_ANGULAR_SOURCE_URL
    ? `${UI_ANGULAR_SOURCE_URL.replace('/tree/', '/blob/')}/CHANGELOG.md`
    : '';
}
