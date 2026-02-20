import type { FieldDefinition } from '../types/filtertypes';
import { departments, roles, skillsList } from '../data/mockData';

export const AVAILABLE_FIELDS: FieldDefinition[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'text' },
  { id: 'department', label: 'Department', type: 'singleSelect', options: departments },
  { id: 'role', label: 'Role', type: 'singleSelect', options: roles },
  { id: 'salary', label: 'currency' ,type:'number'},
  { id: 'joinDate', label: 'Join Date', type: 'date' },
  { id: 'isActive', label: 'Active Status', type: 'boolean' },
  { id: 'skills', label: 'Skills', type: 'multiSelect', options: skillsList },
  { id: 'address.city', label: 'City', type: 'text' },
  { id: 'address.country', label: 'Country', type: 'text' }, 
  { id: 'projects', label: 'Project Count', type: 'number' },
  { id: 'performanceRating', label: 'Performance Rating', type: 'number' }
];