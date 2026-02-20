import React from 'react';
import { Box, Select, MenuItem, IconButton } from '@mui/material';
import { Trash2 } from 'lucide-react';
import type { FilterCondition, FieldDefinition, FilterOperator } from '../../types/filtertypes';
import { OPERATORS_BY_TYPE } from '../../constants';
import { DynamicInput } from './DynamicInput';

interface FilterRowProps {
  filter: FilterCondition;
  fields: FieldDefinition[];
  updateFilter: (id: string, updates: Partial<FilterCondition>) => void;
  removeFilter: (id: string) => void;
}

export const FilterRow: React.FC<FilterRowProps> = ({ filter, fields, updateFilter, removeFilter }) => {
  const selectedFieldDef = fields.find(f => f.id === filter.fieldId);
  const availableOperators = selectedFieldDef ? OPERATORS_BY_TYPE[selectedFieldDef.type] : [];

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
  
      <Select 
        size="small" 
        value={filter.fieldId} 
        onChange={(e) => {
          const newFieldId = e.target.value;
       
          const newFieldDef = fields.find(f => f.id === newFieldId);
          
          if (newFieldDef) {
            
            const availableOps = OPERATORS_BY_TYPE[newFieldDef.type];
           
            const defaultOperator = availableOps.length > 0 ? availableOps[0].value : '' as FilterOperator;
            
         
            updateFilter(filter.id, { 
              fieldId: newFieldId, 
              operator: defaultOperator, 
              value: '' 
            });
          }
        }}
        displayEmpty
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="" disabled>Select Field</MenuItem>
        {fields.map(f => (
          <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>
        ))}
      </Select>

    
      <Select 
        size="small" 
        value={filter.operator || ''} 
        onChange={(e) => updateFilter(filter.id, { operator: e.target.value as FilterOperator, value: '' })}
        disabled={!filter.fieldId}
        displayEmpty
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="" disabled>Select Operator</MenuItem>
        {availableOperators.map(op => (
          <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
        ))}
      </Select>

 
      {selectedFieldDef && filter.operator && (
        <DynamicInput 
          fieldDef={selectedFieldDef} 
          operator={filter.operator} 
          value={filter.value} 
          onChange={(val) => updateFilter(filter.id, { value: val })}
        />
      )}

   
      <IconButton onClick={() => removeFilter(filter.id)} color="error" aria-label="delete filter">
        <Trash2 size={20} />
      </IconButton>
    </Box>
  );
};