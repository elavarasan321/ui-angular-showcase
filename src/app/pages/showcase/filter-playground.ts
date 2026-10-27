import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ButtonComponent,
  CheckboxComponent,
  FilterComponent,
  FilterCondition,
  FormFieldComponent,
  PickerInputComponent,
  PickerInputOption,
  TextInputComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import {
  FILTER_FIELDS,
  POPULATED_EXPRESSION,
  RULE_EXPRESSION,
  RULE_FIELDS,
} from './filter-demo-data';

type FieldSet = 'standard' | 'rule';

const FIELD_SETS: PickerInputOption[] = [
  { value: 'standard', label: 'Standard fields' },
  { value: 'rule', label: 'Rule fields (required "Applies to")' },
];

const DEFAULT_PLACEHOLDER = 'Add a filter…';

@Component({
  selector: 'app-filter-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FilterComponent,
    ButtonComponent,
    Playground,
    FormFieldComponent,
    PickerInputComponent,
    TextInputComponent,
    CheckboxComponent,
  ],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview class="filter-playground__preview">
        <cwr-filter
          ariaLabel="Filter employees"
          [fields]="fields()"
          [(expression)]="expression"
          [placeholder]="placeholder()"
          [wrap]="wrap()"
          [readonly]="readonly()"
          [disabled]="disabled()"
          [loading]="loading()"
          [loadingFields]="nodeLoading() ? ['location'] : []"
        ></cwr-filter>
        <pre class="filter-playground__expression"><code>expression = {{ expressionJson() }}</code></pre>
      </div>

      <ng-container playground-controls>
        <cwr-form-field label="Fields">
          <cwr-picker-input
            [options]="fieldSets"
            [value]="fieldSet()"
            (valueChange)="setFieldSet($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Placeholder">
          <cwr-text-input
            [value]="placeholder()"
            (valueChange)="placeholder.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Wrap"
          [checked]="wrap()"
          (checkedChange)="wrap.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Read-only"
          [checked]="readonly()"
          (checkedChange)="readonly.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Disabled"
          [checked]="disabled()"
          (checkedChange)="disabled.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Loading"
          [checked]="loading()"
          (checkedChange)="loading.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Location node loading"
          [checked]="nodeLoading()"
          (checkedChange)="nodeLoading.set($event)"
        ></cwr-checkbox>

        <div class="filter-playground__actions">
          <cwr-button
            variant="outline"
            intent="neutral"
            size="sm"
            label="Restore example"
            (buttonClick)="restoreExpression()"
          ></cwr-button>
          <cwr-button
            variant="ghost"
            intent="neutral"
            size="sm"
            label="Clear"
            (buttonClick)="expression.set([])"
          ></cwr-button>
        </div>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .filter-playground__preview {
        display: flex;
        flex-direction: column;
        gap: var(--space-md, 1rem);
        align-self: stretch;
        width: 100%;
        min-width: 0;
      }

      .filter-playground__expression {
        margin: 0;
        max-height: 12rem;
        overflow: auto;
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
        white-space: pre-wrap;
      }

      .filter-playground__actions {
        display: flex;
        gap: var(--space-xs, 0.5rem);
      }
    `,
  ],
})
export class FilterPlayground {
  fieldSets = FIELD_SETS;

  fieldSet = signal<FieldSet>('standard');
  placeholder = signal(DEFAULT_PLACEHOLDER);
  wrap = signal(true);
  readonly = signal(false);
  disabled = signal(false);
  loading = signal(false);
  nodeLoading = signal(false);

  // An array, so the playground state leaves it out of the URL; it's reset with the field set.
  expression = signal<FilterCondition[]>(POPULATED_EXPRESSION);

  fields = computed(() => (this.fieldSet() === 'rule' ? RULE_FIELDS : FILTER_FIELDS));

  expressionJson = computed(() => JSON.stringify(this.expression(), null, 2));

  setFieldSet(fieldSet: FieldSet): void {
    this.fieldSet.set(fieldSet);
    this.restoreExpression();
  }

  restoreExpression(): void {
    this.expression.set(this.fieldSet() === 'rule' ? RULE_EXPRESSION : POPULATED_EXPRESSION);
  }

  generatedCode = computed(() => {
    const attrs = [
      'ariaLabel="Filter employees"',
      '[fields]="fields"',
      '[(expression)]="expression"',
    ];
    if (this.placeholder() !== DEFAULT_PLACEHOLDER) attrs.push(`placeholder="${this.placeholder()}"`);
    if (!this.wrap()) attrs.push('[wrap]="false"');
    if (this.readonly()) attrs.push('[readonly]="true"');
    if (this.disabled()) attrs.push('[disabled]="true"');
    if (this.loading()) attrs.push('[loading]="true"');
    if (this.nodeLoading()) attrs.push(`[loadingFields]="['location']"`);
    const field =
      this.fieldSet() === 'rule'
        ? `{
  key: 'employmentStatus',
  label: 'Applies to',
  dataType: 'enum',
  required: true, // always first, can't be removed
  operatorLabel: '', // hides "is"
  searchable: false,
  options: [{ value: 'everyone', label: 'Everyone' }, …],
},`
        : `{ key: 'businessUnit', label: 'Business unit', dataType: 'string', options: […] },`;
    return `<!--
fields: FilterField[] = [
  ${field.replace(/\n/g, '\n  ')}
  { key: 'location', label: 'Location', dataType: 'enum', loadOptions: (query) => this.api.searchLocations(query) },
  { key: 'created', label: 'Created', dataType: 'date', operatorLabel: 'on or after' },
  { key: 'hoursPerWeek', label: 'Hours per week', dataType: 'integer' },
];
-->
<cwr-filter
  ${attrs.join('\n  ')}
></cwr-filter>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);

  constructor() {
    // The field set may have come from the URL; start with the matching example.
    this.restoreExpression();
  }
}
