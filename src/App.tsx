import { useState, useMemo, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, Paper, Divider, 
  CssBaseline, CircularProgress, Chip 
} from '@mui/material';
import { LayoutDashboard, Plus, X, Users, Download } from 'lucide-react';
import type { FilterCondition, Employee } from './types/filtertypes';
import { AVAILABLE_FIELDS } from './utils/fieldConfig';
import { filterData } from './utils/filterLogic';
import { fetchEmployees } from './api';
import { FilterRow } from './components/filters/FilterRow';
import { DataTable } from './components/table/DataTable';

function App() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  
  
  const [filters, setFilters] = useState<FilterCondition[]>(() => {
    const savedFilters = localStorage.getItem('edstruments-filters');
    if (savedFilters) {
      try { return JSON.parse(savedFilters); } catch (e) { return []; }
    }
    return [];
  });

 
  useEffect(() => {
    localStorage.setItem('edstruments-filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const employees = await fetchEmployees();
      setData(employees);
      setLoading(false);
    };
    loadData();
  }, []);

  const addFilter = () => {
    setFilters([...filters, { id: crypto.randomUUID(), fieldId: 'name', operator: 'contains', value: '' }]);
  };

  const updateFilter = (id: string, updates: Partial<FilterCondition>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeFilter = (id: string) => setFilters(filters.filter(f => f.id !== id));
  const clearAllFilters = () => setFilters([]);

  const filteredData = useMemo(() => {
    return filterData(data, filters, AVAILABLE_FIELDS);
  }, [data, filters]);

  const exportToCSV = () => {
    if (filteredData.length === 0) return;
    
    const headers = ['Name', 'Email', 'Department', 'Role', 'Location', 'Salary', 'Status'];

    const csvRows = filteredData.map(emp => [
      `"${emp.name}"`, 
      `"${emp.email}"`, 
      `"${emp.department}"`, 
      `"${emp.role}"`, 
      `"${emp.address.city}, ${emp.address.country}"`,
      emp.salary,
      emp.isActive ? 'Active' : 'Inactive'
    ].join(','));


    const csvString = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_employees.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 2 }}>
        <CircularProgress />
        <Typography color="text.secondary">Loading employee directory...</Typography>
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LayoutDashboard size={28} color="#1976d2" />
            <Typography variant="h4" fontWeight="bold" sx={{ m: 0 }}>
              Employee Directory
            </Typography>
          </Box>
          <Chip icon={<Users size={16} />} label={`Total: ${data.length}`} color="primary" variant="outlined" />
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Dynamic Filter Component System Assessment
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4, backgroundColor: '#fafafa' }} elevation={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Data Filters</Typography>
            <Box sx={{ gap: 2, display: 'flex' }}>
              {filters.length > 0 && (
                <Button startIcon={<X size={18} />} variant="outlined" color="error" onClick={clearAllFilters} size="small">
                  Clear All
                </Button>
              )}
              <Button startIcon={<Plus size={18} />} variant="contained" onClick={addFilter} size="small">
                Add Filter
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {filters.length === 0 ? (
            <Typography color="text.secondary" variant="body2" fontStyle="italic">
              No active filters. Click "Add Filter" to refine the dataset.
            </Typography>
          ) : (
            filters.map(filter => (
              <FilterRow key={filter.id} filter={filter} fields={AVAILABLE_FIELDS} updateFilter={updateFilter} removeFilter={removeFilter} />
            ))
          )}
        </Paper>

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight="500">
            Showing {filteredData.length} of {data.length} records
          </Typography>
          
         
          <Button 
            startIcon={<Download size={18} />} 
            variant="text" 
            onClick={exportToCSV}
            disabled={filteredData.length === 0}
          >
            Export to CSV
          </Button>
        </Box>
        
        <DataTable data={filteredData} />
      </Container>
    </>
  );
}

export default App;