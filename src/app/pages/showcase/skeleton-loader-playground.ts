import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { SkeletonLoaderGap } from '@checkworkrights/ui-angular';
import {
  SkeletonLoaderComponent,
  SkeletonLoaderContentDirective,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  NumericInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

// @checkworkrights/ui-angular only exports the skeleton-loader model as types, so
// SKELETON_LOADER_GAPS isn't in the bundle; the option list is hardcoded to match SkeletonLoaderGap.
const GAPS: readonly SkeletonLoaderGap[] = ['none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const PEOPLE = [
  { name: 'Jordan Smith', detail: 'Contractor · Onboarded 12 Mar 2025' },
  { name: 'Priya Patel', detail: 'Employee · Onboarded 3 Feb 2025' },
  { name: 'Alex Chen', detail: 'Contractor · Onboarded 28 Jan 2025' },
  { name: 'Sam Taylor', detail: 'Employee · Onboarded 14 Jan 2025' },
];

@Component({
  selector: 'app-skeleton-loader-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SkeletonLoaderComponent,
    SkeletonLoaderContentDirective,
    Playground,
    FormFieldComponent,
    PickerInputComponent,
    TextInputComponent,
    NumericInputComponent,
    CheckboxComponent,
    PickerOptionsPipe,
  ],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview style="width: 100%;">
        <cwr-skeleton-loader
          [loading]="loading()"
          [blockCount]="blockCount() ?? 0"
          [lines]="lines() ?? 1"
          [hasImage]="hasImage()"
          [blockGap]="blockGap()"
          [imageGap]="imageGap()"
          [lineGap]="lineGap()"
          [loadingLabel]="loadingLabel()"
          [showDelay]="showDelay() ?? undefined"
          [minVisibleDuration]="minVisibleDuration() ?? undefined"
        >
          <ng-template cwrSkeletonContent>
            <ul class="people" [style.gap]="'var(--space-' + blockGap() + ')'">
              @for (person of people(); track person.name) {
                <li class="person" [style.gap]="'var(--space-' + imageGap() + ')'">
                  @if (hasImage()) {
                    <span class="person__avatar" aria-hidden="true">{{ person.name[0] }}</span>
                  }
                  <span class="person__text">
                    <strong>{{ person.name }}</strong>
                    @if ((lines() ?? 1) > 1) {
                      <span class="person__detail">{{ person.detail }}</span>
                    }
                  </span>
                </li>
              }
            </ul>
          </ng-template>
        </cwr-skeleton-loader>
      </div>

      <ng-container playground-controls>
        <cwr-checkbox
          label="Loading"
          [checked]="loading()"
          (checkedChange)="loading.set($event)"
        ></cwr-checkbox>

        <cwr-form-field label="Block count">
          <cwr-numeric-input
            [value]="blockCount()"
            (valueChange)="blockCount.set($event)"
          ></cwr-numeric-input>
        </cwr-form-field>

        <cwr-form-field label="Lines per block">
          <cwr-numeric-input
            [value]="lines()"
            (valueChange)="lines.set($event)"
          ></cwr-numeric-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Has image"
          [checked]="hasImage()"
          (checkedChange)="hasImage.set($event)"
        ></cwr-checkbox>

        <cwr-form-field label="Block gap">
          <cwr-picker-input
            [options]="gaps | pickerOptions"
            [value]="blockGap()"
            (valueChange)="blockGap.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Image gap">
          <cwr-picker-input
            [options]="gaps | pickerOptions"
            [value]="imageGap()"
            (valueChange)="imageGap.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Line gap">
          <cwr-picker-input
            [options]="gaps | pickerOptions"
            [value]="lineGap()"
            (valueChange)="lineGap.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Loading label">
          <cwr-text-input
            [value]="loadingLabel()"
            (valueChange)="loadingLabel.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Show delay (ms)" hintText="Empty uses --timing-delay-short">
          <cwr-numeric-input
            [value]="showDelay()"
            (valueChange)="showDelay.set($event)"
          ></cwr-numeric-input>
        </cwr-form-field>

        <cwr-form-field label="Min visible duration (ms)" hintText="Empty uses --timing-duration-normal">
          <cwr-numeric-input
            [value]="minVisibleDuration()"
            (valueChange)="minVisibleDuration.set($event)"
          ></cwr-numeric-input>
        </cwr-form-field>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .people {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .person {
        display: flex;
        align-items: center;
      }

      .person__avatar {
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

      .person__text {
        display: flex;
        flex-direction: column;
        font: var(--text-style-p);
        color: var(--color-text-surface);
      }

      .person__detail {
        color: var(--color-text-surface-secondary);
      }
    `,
  ],
})
export class SkeletonLoaderPlayground {
  gaps = GAPS;

  loading = signal(true);
  blockCount = signal<number | null>(3);
  lines = signal<number | null>(2);
  hasImage = signal(true);
  blockGap = signal<SkeletonLoaderGap>('lg');
  imageGap = signal<SkeletonLoaderGap>('sm');
  lineGap = signal<SkeletonLoaderGap>('sm');
  loadingLabel = signal('Loading');
  showDelay = signal<number | null>(null);
  minVisibleDuration = signal<number | null>(null);

  protected people = computed(() =>
    Array.from({ length: Math.max(0, this.blockCount() ?? 0) }, (_, i) => PEOPLE[i % PEOPLE.length]),
  );

  generatedCode = computed(() => {
    const attrs = [`[loading]="loading"`];
    const blockCount = this.blockCount() ?? 0;
    const lines = this.lines() ?? 1;
    if (blockCount !== 1) attrs.push(`[blockCount]="${blockCount}"`);
    if (lines !== 2) attrs.push(`[lines]="${lines}"`);
    if (this.hasImage()) attrs.push(`[hasImage]="true"`);
    if (this.blockGap() !== 'lg') attrs.push(`blockGap="${this.blockGap()}"`);
    if (this.imageGap() !== 'sm') attrs.push(`imageGap="${this.imageGap()}"`);
    if (this.lineGap() !== 'sm') attrs.push(`lineGap="${this.lineGap()}"`);
    if (this.loadingLabel() !== 'Loading') attrs.push(`loadingLabel="${this.loadingLabel()}"`);
    if (this.showDelay() !== null) attrs.push(`[showDelay]="${this.showDelay()}"`);
    if (this.minVisibleDuration() !== null) {
      attrs.push(`[minVisibleDuration]="${this.minVisibleDuration()}"`);
    }

    return `<cwr-skeleton-loader
  ${attrs.join('\n  ')}
>
  <ng-template cwrSkeletonContent>
    <!-- Rendered once loading is false -->
  </ng-template>
</cwr-skeleton-loader>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
