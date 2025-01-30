import { DataGrid } from '@mui/x-data-grid';
import { Card, Box, Typography, Toolbar } from '@mui/material';
import { SearchBar } from '../../common/SearchBar';
import { FilterPanel } from '../../common/FilterPanel';

const columns = [
  { field: 'id', headerName: 'Case ID', width: 130 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'priority', headerName: 'Priority', width: 130 },
  { field: 'assignee', headerName: 'Assignee', width: 180 },
  { field: 'createdAt', headerName: 'Created', width: 180 },
];

export const CaseList = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ p: 2, gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cases
        </Typography>
        <SearchBar />
        <FilterPanel />
      </Toolbar>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <DataGrid
          rows={[]}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Card>
  );
}; 