import { Component, computed, input, signal } from '@angular/core';
import { BadgeComponent, TabBarComponent, TabBarItem } from '@checkworkrights/ui-angular';
import { ACCESSIBILITY_NOTES, ACCESSIBILITY_NOTES_VERSION, KeyboardNote } from './accessibility-notes';
import { API_REFERENCE, ApiEntry, UI_ANGULAR_VERSION } from './api-reference.generated';

type ApiTab = 'inputs' | 'outputs';

interface KeyRow {
  /** Individual keys/chords, e.g. ["ArrowDown", "ArrowUp"]. */
  keys: string[];
  /** Where the keys apply, from a trailing "(in the listbox)" in the source note. */
  context?: string;
  action: string;
}

/** "ArrowDown / ArrowUp (in the listbox)" → keys ["ArrowDown", "ArrowUp"], context "in the listbox". */
function toKeyRow(note: KeyboardNote): KeyRow {
  const match = note.keys.match(/^(.*?)\s*\(([^)]*)\)$/);
  const keys = (match ? match[1] : note.keys).split(/\s+\/\s+/).map((k) => k.trim()).filter(Boolean);
  return { keys, context: match?.[2], action: note.action };
}

/**
 * Accessibility notes and the generated input/output reference for one or more selectors.
 * Accepts the same string as `app-showcase-header`'s `selector`, e.g.
 * "cwr-menu · cwr-menu-button", and renders a card per selector.
 */
@Component({
  selector: 'app-component-reference',
  standalone: true,
  imports: [BadgeComponent, TabBarComponent],
  template: `
    @if (a11y().length) {
      <section class="ref">
        <header class="ref__heading">
          <h2>Accessibility</h2>
          @if (a11yStale) {
            <p class="ref__meta">
              Checked against v{{ a11yVersion }}. The installed library is v{{ version }}, so some
              details may have changed.
            </p>
          }
        </header>

        @for (entry of a11y(); track entry.selector) {
          <article class="ref__card">
            @if (a11y().length > 1) {
              <header class="ref__card-header">
                <code class="ref__selector">&lt;{{ entry.selector }}&gt;</code>
              </header>
            }

            @if (entry.keys.length) {
              <div class="ref__block">
                <h4 class="ref__label">Keyboard</h4>
                <ul class="ref__keys">
                  @for (k of entry.keys; track $index) {
                    <li class="ref__key-row">
                      <div class="ref__key-combo">
                        @for (key of k.keys; track $index) {
                          <kbd>{{ key }}</kbd>
                        }
                        @if (k.context) {
                          <span class="ref__key-context">{{ k.context }}</span>
                        }
                      </div>
                      <p class="ref__text">{{ k.action }}</p>
                    </li>
                  }
                </ul>
              </div>
            }

            @if (entry.aria.length) {
              <div class="ref__block">
                <h4 class="ref__label">Roles &amp; ARIA</h4>
                <ul class="ref__bullets">
                  @for (a of entry.aria; track $index) {
                    <li>{{ a }}</li>
                  }
                </ul>
              </div>
            }

            @if (entry.notes.length) {
              <div class="ref__block ref__block--notes">
                <h4 class="ref__label">Usage notes</h4>
                <ul class="ref__bullets">
                  @for (n of entry.notes; track $index) {
                    <li>{{ n }}</li>
                  }
                </ul>
              </div>
            }
          </article>
        }
      </section>
    }

    @if (api().length) {
      <section class="ref">
        <header class="ref__heading">
          <h2>API</h2>
          <p class="ref__meta">Generated from &#64;checkworkrights/ui-angular v{{ version }}.</p>
        </header>

        @for (entry of api(); track entry.selector) {
          <article class="ref__card">
            <header class="ref__card-header">
              <code class="ref__selector">&lt;{{ entry.selector }}&gt;</code>
              <span class="ref__class">{{ entry.ref.className }}</span>
            </header>

            @if (entry.tabs.length > 1) {
              <cwr-tab-bar
                class="ref__tabs"
                [attr.aria-label]="entry.selector + ' API'"
                [items]="entry.tabs"
                [checkedValue]="tabFor(entry.selector, entry.ref)"
                (checkedValueChange)="setTab(entry.selector, $any($event))"
              ></cwr-tab-bar>
            }

            @switch (tabFor(entry.selector, entry.ref)) {
              @case ('inputs') {
                <div class="ref__panel" role="tabpanel" [id]="panelId(entry.selector, 'inputs')">
                  @for (i of entry.ref.inputs; track i.name) {
                    <div class="ref__prop">
                      <div class="ref__prop-name">
                        <code>{{ i.name }}</code>
                        @if (i.required) {
                          <cwr-badge value="Required" intent="warning" emphasis="subtle"></cwr-badge>
                        }
                      </div>
                      <div class="ref__prop-body">
                        @if (i.description) {
                          <p class="ref__text">{{ i.description }}</p>
                        }
                        <dl class="ref__facts">
                          <div>
                            <dt>Type</dt>
                            <dd><code class="ref__type">{{ i.type }}</code></dd>
                          </div>
                          @if (i.default) {
                            <div>
                              <dt>Default</dt>
                              <dd><code class="ref__type">{{ i.default }}</code></dd>
                            </div>
                          }
                        </dl>
                        @if (i.values) {
                          <div class="ref__chips" role="list" aria-label="Allowed values">
                            @for (v of i.values; track v) {
                              <code
                                role="listitem"
                                class="ref__chip"
                                [class.ref__chip--default]="v === i.default"
                                [attr.title]="v === i.default ? 'Default' : null"
                              >{{ v }}</code>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  } @empty {
                    <p class="ref__empty">No inputs.</p>
                  }
                </div>
              }
              @case ('outputs') {
                <div class="ref__panel" role="tabpanel" [id]="panelId(entry.selector, 'outputs')">
                  @for (o of entry.ref.outputs; track o.name) {
                    <div class="ref__prop">
                      <div class="ref__prop-name">
                        <code>({{ o.name }})</code>
                      </div>
                      <div class="ref__prop-body">
                        @if (o.description) {
                          <p class="ref__text">{{ o.description }}</p>
                        }
                        <dl class="ref__facts">
                          <div>
                            <dt>Payload</dt>
                            <dd><code class="ref__type">{{ o.type }}</code></dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  } @empty {
                    <p class="ref__empty">No outputs.</p>
                  }
                </div>
              }
            }
          </article>
        }
      </section>
    }
  `,
  styles: [
    `
      :host {
        --ref-radius: var(--border-radius-md, 8px);
        --ref-border: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        --ref-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
        display: block;
      }

      .ref {
        margin-top: var(--space-2xl, 2rem);
      }

      .ref__heading {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-2xs, 0.25rem) var(--space-md, 1rem);
        margin-bottom: var(--space-md, 1rem);
      }

      .ref__heading h2 {
        margin: 0;
      }

      .ref__meta,
      .ref__empty {
        margin: 0;
        font: var(--text-style-caption);
        color: var(--color-text-surface-subtle);
      }

      .ref__empty {
        padding: var(--space-md, 1rem) var(--space-lg, 1.25rem);
      }

      /* ---- Card ---- */

      .ref__card {
        border: var(--ref-border);
        border-radius: var(--ref-radius);
        background: var(--color-bg-surface);
        overflow: hidden;
      }

      .ref__card + .ref__card {
        margin-top: var(--space-md, 1rem);
      }

      .ref__card-header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-xs, 0.5rem);
        padding: var(--space-sm, 0.75rem) var(--space-lg, 1.25rem);
        background: var(--color-bg-surface-lowered, #fafafa);
        border-bottom: var(--ref-border);
      }

      .ref__selector {
        font: var(--text-style-h4);
        font-family: var(--ref-mono);
        color: var(--color-text-surface);
      }

      .ref__class {
        font: var(--text-style-caption);
        font-family: var(--ref-mono);
        color: var(--color-text-surface-subtle);
      }

      .ref__tabs {
        display: block;
        padding: 0 var(--space-md, 1rem);
        border-bottom: var(--ref-border);
      }

      /* ---- Prop rows ---- */

      .ref__prop {
        display: grid;
        grid-template-columns: minmax(8rem, 14rem) 1fr;
        gap: var(--space-xs, 0.5rem) var(--space-lg, 1.25rem);
        padding: var(--space-md, 1rem) var(--space-lg, 1.25rem);
      }

      .ref__prop + .ref__prop {
        border-top: var(--ref-border);
      }

      .ref__prop-name {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-self: start;
        gap: var(--space-2xs, 0.25rem) var(--space-xs, 0.5rem);
      }

      .ref__prop-name code {
        font-family: var(--ref-mono);
        font-weight: 600;
        font-size: 0.95em;
        color: var(--color-text-surface);
        overflow-wrap: anywhere;
      }

      .ref__prop-body {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs, 0.5rem);
        min-width: 0;
      }

      .ref__text {
        margin: 0;
        font: var(--text-style-p);
        color: var(--color-text-surface-secondary);
      }

      .ref__facts {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2xs, 0.25rem) var(--space-lg, 1.25rem);
        margin: 0;
      }

      .ref__facts > div {
        display: flex;
        align-items: baseline;
        gap: var(--space-xs, 0.5rem);
        min-width: 0;
      }

      .ref__facts dt {
        font: var(--text-style-caption);
        color: var(--color-text-surface-subtle);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .ref__facts dd {
        margin: 0;
        min-width: 0;
      }

      .ref__type {
        font-family: var(--ref-mono);
        font-size: 0.85em;
        color: var(--color-text-surface);
        overflow-wrap: anywhere;
      }

      .ref__chips {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2xs, 0.25rem);
      }

      .ref__chip {
        padding: 1px var(--space-xs, 0.5rem);
        border: var(--ref-border);
        border-radius: var(--border-radius-full, 999px);
        background: var(--color-bg-surface-lowered, #fafafa);
        font-family: var(--ref-mono);
        font-size: 0.8em;
        color: var(--color-text-surface-secondary);
        white-space: nowrap;
      }

      .ref__chip--default {
        border-color: var(--color-border-brand, currentColor);
        color: var(--color-text-surface);
        font-weight: 600;
      }

      /* ---- Accessibility blocks ---- */

      .ref__block {
        padding: var(--space-md, 1rem) var(--space-lg, 1.25rem);
      }

      .ref__block + .ref__block {
        border-top: var(--ref-border);
      }

      .ref__block--notes {
        background: var(--color-bg-surface-lowered, #fafafa);
      }

      .ref__label {
        margin: 0 0 var(--space-sm, 0.75rem);
        font: var(--text-style-label);
        color: var(--color-text-surface-secondary);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .ref__keys {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm, 0.75rem);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .ref__key-row {
        display: grid;
        grid-template-columns: minmax(8rem, 16rem) 1fr;
        gap: var(--space-xs, 0.5rem) var(--space-lg, 1.25rem);
        align-items: baseline;
      }

      .ref__key-combo {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-2xs, 0.25rem);
      }

      .ref__key-combo kbd {
        padding: 1px var(--space-xs, 0.5rem);
        border: var(--ref-border);
        border-bottom-width: 2px;
        border-radius: var(--border-radius-sm, 4px);
        background: var(--color-bg-surface-lowered, #fafafa);
        font-family: var(--ref-mono);
        font-size: 0.8em;
        color: var(--color-text-surface);
        white-space: nowrap;
      }

      .ref__key-context {
        flex-basis: 100%;
        font: var(--text-style-caption);
        color: var(--color-text-surface-subtle);
      }

      .ref__bullets {
        margin: 0;
        padding-left: var(--space-lg, 1.25rem);
        font: var(--text-style-p);
        color: var(--color-text-surface-secondary);
      }

      .ref__bullets li + li {
        margin-top: var(--space-2xs, 0.25rem);
      }

      @media (max-width: 640px) {
        .ref__prop,
        .ref__key-row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ComponentReference {
  readonly selector = input.required<string>();

  protected readonly version = UI_ANGULAR_VERSION;
  protected readonly a11yVersion = ACCESSIBILITY_NOTES_VERSION;
  protected readonly a11yStale = ACCESSIBILITY_NOTES_VERSION !== UI_ANGULAR_VERSION;

  /** Selected API tab per selector; unset means the first tab that has content. */
  private readonly tabs = signal<Record<string, ApiTab>>({});

  private readonly selectors = computed(() =>
    this.selector()
      .split('·')
      .map((s) => s.trim())
      .filter(Boolean),
  );

  protected readonly api = computed(() =>
    this.selectors()
      .filter((s) => API_REFERENCE[s])
      .map((s) => {
        const ref = API_REFERENCE[s];
        const tabs: TabBarItem[] = [];
        if (ref.inputs.length) {
          tabs.push({ value: 'inputs', label: 'Inputs', badge: ref.inputs.length, panelId: this.panelId(s, 'inputs') });
        }
        if (ref.outputs.length) {
          tabs.push({ value: 'outputs', label: 'Outputs', badge: ref.outputs.length, panelId: this.panelId(s, 'outputs') });
        }
        return { selector: s, ref, tabs };
      }),
  );

  protected readonly a11y = computed(() =>
    this.selectors()
      .filter((s) => ACCESSIBILITY_NOTES[s])
      .map((s) => {
        const notes = ACCESSIBILITY_NOTES[s];
        return { selector: s, keys: notes.keyboard.map(toKeyRow), aria: notes.aria, notes: notes.notes };
      }),
  );

  protected tabFor(selector: string, ref: ApiEntry): ApiTab {
    return this.tabs()[selector] ?? (ref.inputs.length || !ref.outputs.length ? 'inputs' : 'outputs');
  }

  protected setTab(selector: string, tab: ApiTab): void {
    this.tabs.update((t) => ({ ...t, [selector]: tab }));
  }

  protected panelId(selector: string, tab: ApiTab): string {
    return `ref-${selector}-${tab}`;
  }
}
