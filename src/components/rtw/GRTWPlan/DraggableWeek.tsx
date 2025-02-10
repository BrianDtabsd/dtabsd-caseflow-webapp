import { Draggable } from 'react-beautiful-dnd';
import { Paper, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface DraggableWeekProps {
  week: WeekPlan;
  index: number;
  children: React.ReactNode;
}

export const DraggableWeek = ({ week, index, children }: DraggableWeekProps) => {
  return (
    <Draggable draggableId={`week-${week.weekNumber}`} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Paper sx={{ 
            p: 2, 
            bgcolor: 'background.default',
            '&:hover .drag-handle': {
              opacity: 1,
            }
          }}>
            <Box 
              {...provided.dragHandleProps}
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                opacity: 0.3,
                transition: 'opacity 0.2s',
                cursor: 'grab',
                '&:hover': {
                  opacity: 1,
                }
              }}
              className="drag-handle"
            >
              <DragIndicatorIcon />
            </Box>
            {children}
          </Paper>
        </Box>
      )}
    </Draggable>
  );
}; 