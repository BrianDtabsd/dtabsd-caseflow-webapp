import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listFollowUpsWithDetails } from '../graphql/queries';
import { onCreateFollowUp, onUpdateFollowUp } from '../graphql/subscriptions';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Link as LinkIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  HIGH: '#f44336',
  MEDIUM: '#ff9800',
  LOW: '#4caf50',
};

const statusColors = {
  PENDING: '#9e9e9e',
  IN_PROGRESS: '#2196f3',
  DUE_TODAY: '#ff9800',
  OVERDUE: '#f44336',
  URGENT: '#d32f2f',
  COMPLETED: '#4caf50',
  CANCELLED: '#757575',
  ESCALATED: '#d32f2f',
  REASSIGNED: '#673ab7',
};

const FollowUpList = () => {
  const navigate = useNavigate();
  const [followUps, setFollowUps] = useState([]);
  const [sortField, setSortField] = useState('dueDate');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterReason, setFilterReason] = useState('all');

  useEffect(() => {
    fetchFollowUps();
    subscribeToNewFollowUps();
    subscribeToUpdatedFollowUps();
  }, []);

  const fetchFollowUps = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(listFollowUpsWithDetails, {
          limit: 100,
          filter: {
            status: { ne: 'CANCELLED' },
          },
        })
      );
      const sortedFollowUps = sortFollowUps(result.data.listFollowUps.items);
      setFollowUps(sortedFollowUps);
    } catch (error) {
      console.error('Error fetching follow-ups:', error);
    }
  };

  const subscribeToNewFollowUps = () => {
    API.graphql(graphqlOperation(onCreateFollowUp)).subscribe({
      next: ({ value }) => {
        setFollowUps((prev) => sortFollowUps([...prev, value.data.onCreateFollowUp]));
      },
      error: (error) => console.error(error),
    });
  };

  const subscribeToUpdatedFollowUps = () => {
    API.graphql(graphqlOperation(onUpdateFollowUp)).subscribe({
      next: ({ value }) => {
        setFollowUps((prev) =>
          sortFollowUps(
            prev.map((fu) =>
              fu.id === value.data.onUpdateFollowUp.id ? value.data.onUpdateFollowUp : fu
            )
          )
        );
      },
      error: (error) => console.error(error),
    });
  };

  const filterFollowUps = (followUps) => {
    return followUps.filter((followUp) => {
      const matchesSearch =
        searchTerm === '' ||
        followUp.case.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        followUp.case.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        followUp.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active'
          ? !['COMPLETED', 'CANCELLED'].includes(followUp.status)
          : followUp.status === filterStatus);

      const matchesPriority = filterPriority === 'all' || followUp.priority === filterPriority;

      const matchesReason = filterReason === 'all' || followUp.reason === filterReason;

      return matchesSearch && matchesStatus && matchesPriority && matchesReason;
    });
  };

  const sortFollowUps = (followUps) => {
    return [...followUps].sort((a, b) => {
      switch (sortField) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          return priorityOrder(b.priority) - priorityOrder(a.priority);
        case 'status':
          return statusOrder(b.status) - statusOrder(a.status);
        case 'caseNumber':
          return a.case.caseNumber.localeCompare(b.case.caseNumber);
        default:
          return 0;
      }
    });
  };

  const priorityOrder = (priority) => {
    const order = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return order[priority] || 0;
  };

  const statusOrder = (status) => {
    const order = {
      URGENT: 8,
      OVERDUE: 7,
      DUE_TODAY: 6,
      IN_PROGRESS: 5,
      PENDING: 4,
      ESCALATED: 3,
      REASSIGNED: 2,
      COMPLETED: 1,
      CANCELLED: 0,
    };
    return order[status] || 0;
  };

  const getSequenceLabel = (followUp) => {
    if (!followUp.sequence) return '';
    return followUp.isLastInSequence
      ? `Final Follow-up (${followUp.sequence}/${followUp.sequenceTotal})`
      : `Follow-up ${followUp.sequence}/${followUp.sequenceTotal}`;
  };

  const navigateToCase = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  const filteredFollowUps = filterFollowUps(followUps);

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Search cases..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              label="Sort By"
              onChange={(e) => setSortField(e.target.value)}
            >
              <MenuItem value="dueDate">Due Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="caseNumber">Case Number</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="DUE_TODAY">Due Today</MenuItem>
              <MenuItem value="OVERDUE">Overdue</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={filterPriority}
              label="Priority"
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <MenuItem value="all">All Priority</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="LOW">Low</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={2}>
          {filteredFollowUps.map((followUp) => (
            <Card
              key={followUp.id}
              sx={{
                borderLeft: `6px solid ${followUp.color || priorityColors[followUp.priority]}`,
                '&:hover': {
                  boxShadow: 3,
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigateToCase(followUp.case.id)}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6">
                      {followUp.case.caseNumber} - {followUp.case.title}
                    </Typography>
                    {followUp.sequence && (
                      <Chip
                        label={getSequenceLabel(followUp)}
                        size="small"
                        color={followUp.isLastInSequence ? 'error' : 'default'}
                      />
                    )}
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={followUp.status}
                      size="small"
                      sx={{ backgroundColor: statusColors[followUp.status], color: 'white' }}
                    />
                    <Chip
                      label={followUp.priority}
                      size="small"
                      sx={{ backgroundColor: priorityColors[followUp.priority], color: 'white' }}
                    />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1, fontSize: 'small' }} />
                    {format(new Date(followUp.dueDate), 'MMM d, yyyy')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1, fontSize: 'small' }} />
                    {followUp.case.caseManager.firstName} {followUp.case.caseManager.lastName}
                  </Typography>
                  {followUp.case.employer && (
                    <Typography variant="body2" color="text.secondary">
                      {followUp.case.employer.name}
                    </Typography>
                  )}
                </Stack>

                <Typography variant="body1" sx={{ mt: 2 }}>
                  {followUp.reason}: {followUp.description}
                </Typography>

                {followUp.notes && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Note: {followUp.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default FollowUpList; 