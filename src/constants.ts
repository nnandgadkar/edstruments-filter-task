import type { FieldType, FilterOperator } from './types/filtertypes';

export const OPERATORS_BY_TYPE: Record<FieldType, { value: FilterOperator; label: string }[]> = {
  text: [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'doesNotContain', label: 'Does Not Contain' },
  ],
  number: [
    { value: 'equals', label: '=' },
    { value: 'gt', label: '>' },
    { value: 'lt', label: '<' },
    { value: 'gte', label: '>=' },
    { value: 'lte', label: '<=' },
    { value: 'between', label: 'Between' },
  ],
  currency: [
    { value: 'between', label: 'Between' },
    { value: 'equals', label: '=' },
    { value: 'gt', label: '>' },
    { value: 'lt', label: '<' },
  ],
  date: [
    { value: 'between', label: 'Between' },
  ],
  singleSelect: [
    { value: 'is', label: 'Is' },
    { value: 'isNot', label: 'Is Not' },
  ],
  multiSelect: [
    { value: 'in', label: 'Contains Any' },
    { value: 'notIn', label: 'Does Not Contain' },
    { value: 'containsAll', label: 'Contains All' },
  ],
  boolean: [
    { value: 'is', label: 'Is' },
  ],
};
