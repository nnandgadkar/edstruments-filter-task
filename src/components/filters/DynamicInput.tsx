import React from 'react';
import { TextField, Select, MenuItem, Box, FormControlLabel, Switch, InputAdornment, Checkbox, ListItemText } from '@mui/material';
import { Calendar } from 'lucide-react';
import type { FieldDefinition, FilterOperator } from '../../types/filtertypes';

interface DynamicInputProps {
  fieldDef: FieldDefinition;
  operator: FilterOperator;
  value: any;
  onChange: (value: any) => void;
}

export const DynamicInput: React.FC<DynamicInputProps> = ({ fieldDef, operator, value, onChange }) => {

  if (operator === 'between') {
    const isDate = fieldDef.type === 'date';
    const valArray = Array.isArray(value) ? value : ['', ''];
    
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          type={isDate ? 'date' : 'number'}
          value={valArray[0] || ''}
          onChange={(e) => onChange([e.target.value, valArray[1]])}
          placeholder="Min"
          InputProps={isDate ? { startAdornment: <InputAdornment position="start"><Calendar size={16}/></InputAdornment> } : undefined}
        />
        <TextField
          size="small"
          type={isDate ? 'date' : 'number'}
          value={valArray[1] || ''}
          onChange={(e) => onChange([valArray[0], e.target.value])}
          placeholder="Max"
          InputProps={isDate ? { startAdornment: <InputAdornment position="start"><Calendar size={16}/></InputAdornment> } : undefined}
        />
      </Box>
    );
  }


  switch (fieldDef.type) {
    case 'text':
    case 'number':
    case 'currency':
      return (
        <TextField 
          size="small" 
          type={fieldDef.type === 'text' ? 'text' : 'number'}
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={`Enter ${fieldDef.label}...`}
        />
      );

    case 'date':
      return (
        <TextField
          size="small"
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Calendar size={16}/></InputAdornment> }}
        />
      );

    case 'singleSelect':
      return (
        <Select size="small" value={value || ''} onChange={(e) => onChange(e.target.value)} displayEmpty sx={{ minWidth: 150 }}>
          <MenuItem value="" disabled>Select Option</MenuItem>
          {fieldDef.options?.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      );

    case 'multiSelect':
      const selectedValues = Array.isArray(value) ? value : [];
      return (
        <Select
          size="small"
          multiple
          value={selectedValues}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
          renderValue={(selected) => (selected.length === 0 ? <em>Select Options</em> : selected.join(', '))}
        >
          {fieldDef.options?.map(opt => (
            <MenuItem key={opt} value={opt}>
              <Checkbox checked={selectedValues.indexOf(opt) > -1} />
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      );

    case 'boolean':
      return (
        <FormControlLabel 
          control={<Switch checked={value === true || value === 'true'} onChange={(e) => onChange(e.target.checked)} />} 
          label={value ? "Yes / Active" : "No / Inactive"} 
        />
      );

    default:
      return null;
  }
};