import { FilterCondition, FilterField, FilterOption } from '@checkworkrights/ui-angular';
import { Observable, delay, of } from 'rxjs';

const toOptions = (labels: string[]): FilterOption[] =>
  labels.map((label) => ({ value: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label }));

const LOCATIONS = toOptions([
  'Adelaide',
  'Auckland',
  'Brisbane',
  'Canberra',
  'Darwin',
  'Hobart',
  'Melbourne',
  'Perth',
  'Sydney',
  'Wellington',
]);

/** Stands in for an API search: filters the locations after a short delay. */
export const searchLocations = (query: string): Observable<FilterOption[]> =>
  of(
    LOCATIONS.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase())),
  ).pipe(delay(600));

export const APPLIES_TO_FIELD: FilterField = {
  key: 'employmentStatus',
  label: 'Applies to',
  dataType: 'enum',
  icon: 'icon.ui.attribute',
  required: true,
  operatorLabel: '',
  searchable: false,
  options: [
    { value: 'everyone', label: 'Everyone' },
    { value: 'employees', label: 'Employees only' },
    { value: 'candidates', label: 'Candidates only' },
  ],
};

export const FILTER_FIELDS: FilterField[] = [
  {
    key: 'businessUnit',
    label: 'Business unit',
    dataType: 'string',
    icon: 'icon.ui.business-unit',
    options: toOptions([
      'Customer Services',
      'Design',
      'Engineering',
      'Marketing',
      'Product Management',
      'Sales',
    ]),
  },
  {
    key: 'jobRole',
    label: 'Job role',
    dataType: 'string',
    icon: 'icon.ui.job-role',
    options: toOptions([
      'Business Development Manager',
      'Customer Services Manager',
      'Marketing Manager',
      'Product Designer',
      'Product Manager',
      'Tech Lead',
    ]),
  },
  {
    key: 'location',
    label: 'Location',
    dataType: 'enum',
    icon: 'icon.ui.location',
    loadOptions: searchLocations,
  },
  {
    key: 'created',
    label: 'Created',
    operatorLabel: 'on or after',
    dataType: 'date',
    icon: 'icon.ui.calendar',
  },
  { key: 'hoursPerWeek', label: 'Hours per week', dataType: 'integer', icon: 'icon.ui.attribute' },
  { key: 'payRate', label: 'Hourly pay rate', dataType: 'decimal', icon: 'icon.ui.attribute' },
];

/** The fields a Check Intelligence rule uses: "Applies to" is always first and can't be removed. */
export const RULE_FIELDS: FilterField[] = [APPLIES_TO_FIELD, ...FILTER_FIELDS];

export const POPULATED_EXPRESSION: FilterCondition[] = [
  { field: 'businessUnit', operator: 'is', value: 'engineering' },
  { field: 'location', operator: 'is', value: 'melbourne', label: 'Melbourne' },
  { field: 'created', operator: 'is', value: '2026-04-15' },
  { field: 'hoursPerWeek', operator: 'is', value: 38 },
];

export const RULE_EXPRESSION: FilterCondition[] = [
  { field: 'employmentStatus', operator: 'is', value: 'everyone' },
  ...POPULATED_EXPRESSION,
];
