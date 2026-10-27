import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FilterComponent, FilterCondition } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { FilterPlayground } from './filter-playground';
import {
  FILTER_FIELDS,
  POPULATED_EXPRESSION,
  RULE_EXPRESSION,
  RULE_FIELDS,
} from './filter-demo-data';

@Component({
  selector: 'app-filter-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FilterComponent, ExampleBlock, ShowcaseHeader, FilterPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Filter" selector="cwr-filter"></app-showcase-header>

    <app-filter-playground></app-filter-playground>
    <p>
      <code>cwr-filter</code> builds an expression from "field is value" conditions joined by AND,
      such as "Location is Melbourne and Business unit is Retail". Every node is rendered from
      <code>fields</code>; the user adds, edits and removes nodes, and each committed change
      updates <code>expression</code> straight away — there is no Apply step. Use it to narrow a
      list by known fields, or to define who a rule applies to. It isn't for free-text search or
      form data entry.
    </p>
    <p>
      A field's <code>dataType</code> picks its value editor: <code>string</code> and
      <code>enum</code> show an option list (static <code>options</code>, or
      <code>loadOptions</code> to search an API), <code>date</code> a date input, and
      <code>integer</code> / <code>decimal</code> a number input. Dates are ISO strings such as
      <code>'2026-04-15'</code>.
    </p>

    <app-example-block title="Empty" [code]="emptyCode">
      <div class="filter-showcase__frame">
        <cwr-filter
          ariaLabel="Filter employees"
          [fields]="fields"
          [(expression)]="emptyExpression"
        ></cwr-filter>
      </div>
    </app-example-block>

    <app-example-block title="Required field" [code]="requiredCode">
      <div class="filter-showcase__frame">
        <cwr-filter
          ariaLabel="Rule conditions"
          [fields]="ruleFields"
          [(expression)]="ruleExpression"
        ></cwr-filter>
      </div>
    </app-example-block>

    <app-example-block title="Read-only" [code]="readonlyCode">
      <div class="filter-showcase__frame">
        <cwr-filter
          ariaLabel="Rule conditions"
          [fields]="ruleFields"
          [expression]="ruleExampleExpression"
          [readonly]="true"
        ></cwr-filter>
      </div>
    </app-example-block>

    <app-example-block title="No wrapping" [code]="noWrapCode">
      <div class="filter-showcase__frame filter-showcase__frame--narrow">
        <cwr-filter
          ariaLabel="Filter employees"
          [fields]="fields"
          [(expression)]="noWrapExpression"
          [wrap]="false"
        ></cwr-filter>
      </div>
    </app-example-block>

    <app-example-block title="Loading" [code]="loadingCode">
      <div class="filter-showcase__frame">
        <cwr-filter
          ariaLabel="Filter employees"
          [fields]="fields"
          [expression]="populatedExpression"
          [loading]="true"
        ></cwr-filter>
      </div>
      <div class="filter-showcase__frame">
        <cwr-filter
          ariaLabel="Filter employees"
          [fields]="fields"
          [expression]="populatedExpression"
          [loadingFields]="['location']"
        ></cwr-filter>
      </div>
    </app-example-block>

    <app-component-reference selector="cwr-filter"></app-component-reference>
  `,
  styles: [
    `
      .filter-showcase__frame {
        width: 100%;
        max-width: 40rem;
      }

      .filter-showcase__frame--narrow {
        max-width: 24rem;
      }
    `,
  ],
})
export class FilterShowcase {
  fields = FILTER_FIELDS;
  ruleFields = RULE_FIELDS;
  populatedExpression = POPULATED_EXPRESSION;
  ruleExampleExpression = RULE_EXPRESSION;

  emptyExpression = signal<FilterCondition[]>([]);
  ruleExpression = signal<FilterCondition[]>(RULE_EXPRESSION);
  noWrapExpression = signal<FilterCondition[]>(POPULATED_EXPRESSION);

  emptyCode = `fields: FilterField[] = [
  { key: 'businessUnit', label: 'Business unit', dataType: 'string', options: [...] },
  { key: 'location', label: 'Location', dataType: 'enum', loadOptions: (query) => this.api.searchLocations(query) },
  { key: 'created', label: 'Created', dataType: 'date', operatorLabel: 'on or after' },
];
expression = signal<FilterCondition[]>([]);

<cwr-filter ariaLabel="Filter employees" [fields]="fields" [(expression)]="expression"></cwr-filter>`;

  requiredCode = `// A required field is always present, first, and can't be removed.
appliesTo: FilterField = {
  key: 'employmentStatus',
  label: 'Applies to',
  dataType: 'enum',
  required: true,
  operatorLabel: '', // hides "is"
  searchable: false, // every option fits without scrolling
  options: [
    { value: 'everyone', label: 'Everyone' },
    { value: 'employees', label: 'Employees only' },
    { value: 'candidates', label: 'Candidates only' },
  ],
};

<cwr-filter ariaLabel="Rule conditions" [fields]="[appliesTo, ...fields]" [(expression)]="expression"></cwr-filter>`;

  readonlyCode = `<cwr-filter
  ariaLabel="Rule conditions"
  [fields]="fields"
  [expression]="expression"
  [readonly]="true"
></cwr-filter>`;

  noWrapCode = `<!-- Scrolls horizontally instead of wrapping onto new lines. -->
<cwr-filter ariaLabel="Filter employees" [fields]="fields" [(expression)]="expression" [wrap]="false"></cwr-filter>`;

  loadingCode = `<!-- Nodes not known yet: a single-line skeleton. -->
<cwr-filter ariaLabel="Filter employees" [fields]="fields" [expression]="expression" [loading]="true"></cwr-filter>

<!-- One condition saving: only its node shows as loading. -->
<cwr-filter ariaLabel="Filter employees" [fields]="fields" [expression]="expression" [loadingFields]="['location']"></cwr-filter>`;
}
