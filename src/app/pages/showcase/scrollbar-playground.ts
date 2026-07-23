import { Component, computed, signal } from '@angular/core';
import { ScrollbarComponent, ScrollbarOverflow } from '@checkworkrights/ui-angular';
import { Playground } from './playground';

// @checkworkrights/ui-angular@1.0.30 exports ScrollbarOverflow as a type only — the
// SCROLLBAR_OVERFLOWS runtime const declared in its .d.ts isn't actually present in the
// published bundle, so the option list is hardcoded here to match the union.
const SCROLLBAR_OVERFLOWS: readonly ScrollbarOverflow[] = ['vertical', 'horizontal'];

@Component({
  selector: 'app-scrollbar-playground',
  standalone: true,
  imports: [ScrollbarComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <div playground-preview>
        @if (overflow() === 'vertical') {
          <div style="position: relative; height: 160px; width: 240px;">
            <div style="height: 160px; overflow: auto; padding-right: 14px;">
              <p>Right to work checks confirm a candidate's legal eligibility to work.</p>
              <p>Police checks screen for relevant criminal history.</p>
              <p>Reference checks verify past employment and conduct.</p>
              <p>Qualification checks confirm certifications and study entitlements.</p>
              <p>Visa checks track work rights and expiry dates over time.</p>
            </div>
            <cwr-scrollbar overflow="vertical"></cwr-scrollbar>
          </div>
        } @else {
          <div style="position: relative; width: 260px;">
            <div style="overflow: auto; white-space: nowrap; padding-bottom: 14px;">
              <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Right to Work</span>
              <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Police Check</span>
              <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Reference Check</span>
              <span style="display: inline-block; width: 140px; margin-right: 0.75rem;">Qualification</span>
              <span style="display: inline-block; width: 140px;">Visa Check</span>
            </div>
            <cwr-scrollbar overflow="horizontal"></cwr-scrollbar>
          </div>
        }
      </div>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Overflow</span>
          <select (change)="overflow.set($any($event.target).value)">
            @for (o of overflows; track o) {
              <option [value]="o" [selected]="o === overflow()">{{ o }}</option>
            }
          </select>
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select,
      .playground__field input[type='text'] {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }

      .playground__checkbox {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        font: var(--text-style-body);
        color: var(--color-text-surface);
      }
    `,
  ],
})
export class ScrollbarPlayground {
  overflows = SCROLLBAR_OVERFLOWS;

  overflow = signal<ScrollbarOverflow>('vertical');

  generatedCode = computed(() => {
    if (this.overflow() === 'vertical') {
      return `<div style="position: relative; height: 160px;">
  <div style="height: 160px; overflow: auto;">
    <!-- tall content -->
  </div>
  <cwr-scrollbar overflow="vertical"></cwr-scrollbar>
</div>`;
    }
    return `<div style="position: relative;">
  <div style="overflow: auto; white-space: nowrap;">
    <!-- wide content -->
  </div>
  <cwr-scrollbar overflow="horizontal"></cwr-scrollbar>
</div>`;
  });
}
