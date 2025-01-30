import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import { useState } from 'react';
import { TableConfig } from '../../../types/caseManagement';
import { FilterList as FilterIcon } from '@mui/icons-material';
import { DataTableFilters } from './DataTableFilters';
import { DataTableActions } from './DataTableActions';
import { useAuth } from '../../../hooks/useAuth';

interface DataTableProps {
  config: TableConfig;
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
}

export const DataTable = ({ 
  config, 
  data,
  onEdit,
  onDelete,
  onView
}: DataTableProps) => {
  const [sortField, setSortField] = useState(config.defaultSort?.field);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    config.defaultSort?.direction || 'asc'
  );
  const [showFilters, setShowFilters] = useState(false);
  const { user, permissions } = useAuth();

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = getNestedValue(a, sortField);
    const bValue = getNestedValue(b, sortField);
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return (
    <Paper>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Show filters">
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {showFilters && config.filters && (
        <DataTableFilters 
          filters={config.filters}
          onChange={() => {/* Implement filtering */}}
        />
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {config.columns.map((column) => (
                <TableCell key={column.field}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortField === column.field}
                      direction={sortField === column.field ? sortDirection : 'asc'}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.header}
                    </TableSortLabel>
                  ) : (
                    column.header
                  )}
                </TableCell>
              ))}
              {(onEdit || onDelete || onView) && (
                <TableCell align="right">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                {config.columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.formatter 
                      ? column.formatter(getNestedValue(row, column.field))
                      : getNestedValue(row, column.field)
                    }
                  </TableCell>
                ))}
                {(onEdit || onDelete || onView) && (
                  <TableCell align="right">
                    <DataTableActions
                      row={row}
                      onEdit={permissions.canEdit ? onEdit : undefined}
                      onDelete={permissions.canDelete ? onDelete : undefined}
                      onView={onView}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Helper function to get nested object values
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}; 