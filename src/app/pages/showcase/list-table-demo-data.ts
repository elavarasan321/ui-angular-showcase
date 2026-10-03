import { ListTableSortDirection } from '@checkworkrights/ui-angular';

export interface DemoEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On leave' | 'Inactive';
  startDate: string;
}

export const DEMO_EMPLOYEES: DemoEmployee[] = [
  { id: '1', name: 'Ava Thompson', role: 'Engineer', department: 'Product', status: 'Active', startDate: '2021-03-14' },
  { id: '2', name: 'Liam Chen', role: 'Designer', department: 'Product', status: 'Active', startDate: '2020-11-02' },
  { id: '3', name: 'Noah Patel', role: 'Recruiter', department: 'People', status: 'Active', startDate: '2022-06-30' },
  { id: '4', name: 'Emma Rodriguez', role: 'Analyst', department: 'Finance', status: 'On leave', startDate: '2019-08-19' },
  { id: '5', name: 'Oliver Kim', role: 'Engineer', department: 'Platform', status: 'Active', startDate: '2023-01-09' },
  { id: '6', name: 'Sophia Nguyen', role: 'Manager', department: 'Product', status: 'Active', startDate: '2018-05-23' },
  { id: '7', name: 'Mason Johnson', role: 'Support', department: 'Success', status: 'Active', startDate: '2022-09-12' },
  { id: '8', name: 'Isabella Garcia', role: 'Engineer', department: 'Platform', status: 'Active', startDate: '2021-12-01' },
  { id: '9', name: 'James Lee', role: 'Recruiter', department: 'People', status: 'Inactive', startDate: '2017-02-27' },
  { id: '10', name: 'Mia Martinez', role: 'Analyst', department: 'Finance', status: 'Active', startDate: '2020-07-15' },
  { id: '11', name: 'Ethan Davis', role: 'Designer', department: 'Product', status: 'Active', startDate: '2023-04-03' },
  { id: '12', name: 'Amelia Wilson', role: 'Manager', department: 'Success', status: 'Active', startDate: '2019-10-11' },
  { id: '13', name: 'Lucas Brown', role: 'Engineer', department: 'Platform', status: 'On leave', startDate: '2022-02-21' },
  { id: '14', name: 'Harper White', role: 'Support', department: 'Success', status: 'Active', startDate: '2021-07-05' },
];

/** Sorts a copy of `rows` by one of their string fields, the way a server would. */
export function sortEmployees(
  rows: DemoEmployee[],
  column: string | null,
  direction: ListTableSortDirection,
): DemoEmployee[] {
  if (!column || !direction) return rows;
  const key = column as keyof DemoEmployee;
  const factor = direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => factor * a[key].localeCompare(b[key], undefined, { numeric: true }));
}
