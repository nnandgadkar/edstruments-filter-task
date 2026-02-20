export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string; 
  isActive: boolean;
  skills: string[];
  address: Address;
  projects: number;
  lastReview: string; 
  performanceRating: number;
}

export type FilterOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'doesNotContain'
  | 'gt' // Greater Than
  | 'lt' // Less Than
  | 'gte' // Greater Than or Equal
  | 'lte' // Less Than or Equal
  | 'between'
  | 'is'
  | 'isNot'
  | 'in'
  | 'notIn'
  | 'containsAll';

export type FieldType = 'text' | 'number' | 'date' | 'currency' | 'singleSelect' | 'multiSelect' | 'boolean';

export interface FieldDefinition {
  id: string; 
  label: string;
  type: FieldType;
  options?: string[]; 
}

export interface FilterCondition {
  id: string;
  fieldId: string;
  operator: FilterOperator;
  value: any;
}
