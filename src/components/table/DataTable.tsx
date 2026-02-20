import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Box } from '@mui/material';
import type { Employee } from '../../types/filtertypes';

interface DataTableProps {
  data: Employee[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No results found matching your filters.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="employee table">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Role & Dept</strong></TableCell>
            <TableCell><strong>Location</strong></TableCell>
            <TableCell><strong>Salary</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Skills</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>
                <Typography variant="body2" fontWeight="500">{row.name}</Typography>
                <Typography variant="caption" color="text.secondary">{row.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.role}</Typography>
                <Typography variant="caption" color="text.secondary">{row.department}</Typography>
              </TableCell>
              <TableCell>
                {row.address.city}, {row.address.country} {/* Nested object display */}
              </TableCell>
              <TableCell>
                ${row.salary.toLocaleString()}
              </TableCell>
              <TableCell>
                <Chip 
                  label={row.isActive ? 'Active' : 'Inactive'} 
                  color={row.isActive ? 'success' : 'default'} 
                  size="small" 
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: 200 }}>
                  {row.skills.map(skill => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" />
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};