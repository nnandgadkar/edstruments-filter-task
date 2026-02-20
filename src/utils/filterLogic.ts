import type { Employee, FilterCondition, FieldDefinition, FilterOperator } from '../types/filtertypes';
import {  parseISO, startOfDay } from 'date-fns';


export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const filterData = (data: Employee[], filters: FilterCondition[], fields: FieldDefinition[]): Employee[] => {
  if (filters.length === 0) return data;

  return data.filter((item) => {
    
    const filtersByField = filters.reduce((acc, filter) => {
      if (!acc[filter.fieldId]) {
        acc[filter.fieldId] = [];
      }
      acc[filter.fieldId].push(filter);
      return acc;
    }, {} as Record<string, FilterCondition[]>);

   
    return Object.entries(filtersByField).every(([fieldId, fieldFilters]) => {
      
      return fieldFilters.some((filter) => {
        const fieldDef = fields.find(f => f.id === filter.fieldId);
        if (!fieldDef) return true;

        const itemValue = getNestedValue(item, filter.fieldId);
        return evaluateCondition(itemValue, filter.operator, filter.value, fieldDef.type);
      });
    });
  });
};

const evaluateCondition = (itemValue: any, operator: FilterOperator, filterValue: any, type: string): boolean => {
  
  if (itemValue === null || itemValue === undefined) {
    return operator === 'isNot' || operator === 'doesNotContain';
  }

  switch (type) {
    case 'text':
      const strItem = String(itemValue).toLowerCase();
      const strFilter = String(filterValue).toLowerCase();
      switch (operator) {
        case 'equals': return strItem === strFilter;
        case 'contains': return strItem.includes(strFilter);
        case 'startsWith': return strItem.startsWith(strFilter);
        case 'endsWith': return strItem.endsWith(strFilter);
        case 'doesNotContain': return !strItem.includes(strFilter);
        default: return false;
      }

    case 'number':
    case 'currency':
      const numItem = Number(itemValue);
      const numFilter = Number(filterValue);
      switch (operator) {
        case 'equals': return numItem === numFilter;
        case 'gt': return numItem > numFilter;
        case 'lt': return numItem < numFilter;
        case 'gte': return numItem >= numFilter;
        case 'lte': return numItem <= numFilter;
        case 'between':
          
          if (Array.isArray(filterValue)) {
            return numItem >= filterValue[0] && numItem <= filterValue[1];
          }
          return false;
        default: return false;
      }

    case 'date':
      const dateItem = parseISO(itemValue); 
      
      if (operator === 'between' && Array.isArray(filterValue)) {
        const start = filterValue[0] ? startOfDay(new Date(filterValue[0])) : null;
        const end = filterValue[1] ? startOfDay(new Date(filterValue[1])) : null;
      
        const itemTime = dateItem.getTime();
        
        if (start && end) return itemTime >= start.getTime() && itemTime <= end.getTime();
        if (start) return itemTime >= start.getTime();
        if (end) return itemTime <= end.getTime();
        return true;
      }
      return false;

    case 'boolean':
      return itemValue === (filterValue === 'true' || filterValue === true);

    case 'singleSelect':
      switch (operator) {
        case 'is': return String(itemValue) === String(filterValue);
        case 'isNot': return String(itemValue) !== String(filterValue);
        default: return false;
      }

    case 'multiSelect':
      // filterValue is array of selected options
      const selectedOptions = Array.isArray(filterValue) ? filterValue : [filterValue];
      
      if (Array.isArray(itemValue)) {
        // Data is an array (e.g. Skills)
        switch (operator) {
          case 'in': // Contains ANY of the selected
            return itemValue.some(val => selectedOptions.includes(val));
          case 'notIn': // Contains NONE of the selected
            return !itemValue.some(val => selectedOptions.includes(val));
          case 'containsAll': // Contains ALL of the selected
            return selectedOptions.every(val => itemValue.includes(val));
          default: return false;
        }
      } else {
        // Data is a single value (e.g. Department if we used multiSelect input)
        switch (operator) {
          case 'in': // Value is IN the selected options
            return selectedOptions.includes(itemValue);
          case 'notIn': // Value is NOT IN the selected options
            return !selectedOptions.includes(itemValue);
          default: return false;
        }
      }

    default:
      return false;
  }
};
