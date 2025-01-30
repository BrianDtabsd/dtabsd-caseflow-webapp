import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, FormProvider } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { calculateHours, validateTimeRange } from '../../../utils/timeCalculations';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMediaQuery, Theme } from '@mui/material';
import { WeekComparison } from './WeekComparison';
import { PreviewDialog } from './PreviewDialog';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DraggableWeek } from './DraggableWeek';
import { ProgressTimeline } from './ProgressTimeline';

interface DaySchedule {
  day: string;
  startTime: string;
  endTime: string;
  hoursWorked: number;
}

interface WeekPlan {
  weekNumber: number;
  schedule: DaySchedule[];
  restrictions: string[];
  specialInstructions: string;
  duties: string;
}

const defaultWeekSchedule: DaySchedule[] = [
  { day: 'Monday', startTime: '', endTime: '', hoursWorked: 0 },
  { day: 'Tuesday', startTime: '', endTime: '', hoursWorked: 0 },
  { day: 'Wednesday', startTime: '', endTime: '', hoursWorked: 0 },
  { day: 'Thursday', startTime: '', endTime: '', hoursWorked: 0 },
  { day: 'Friday', startTime: '', endTime: '', hoursWorked: 0 },
];

export const GRTWPlan = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const { t, i18n } = useTranslation();

  const methods = useForm({
    defaultValues: {
      // ... existing defaults ...
    },
    resolver: yupResolver(
      yup.object().shape({
        // Validation schema for each week
        ...weeks.reduce((acc, week) => ({
          ...acc,
          ...week.schedule.reduce((dayAcc, day) => ({
            ...dayAcc,
            [`week${week.weekNumber}_${day.day}_start`]: yup.string().required('Start time required'),
            [`week${week.weekNumber}_${day.day}_end`]: yup.string()
              .required('End time required')
              .test('is-after-start', 'End time must be after start time', function(value) {
                const startTime = this.parent[`week${week.weekNumber}_${day.day}_start`];
                return validateTimeRange(startTime, value);
              }),
          }), {})
        }), {})
      })
    )
  });

  const [weeks, setWeeks] = useState<WeekPlan[]>([{
    weekNumber: 1,
    schedule: defaultWeekSchedule,
    restrictions: [],
    specialInstructions: '',
    duties: ''
  }]);

  const addWeek = () => {
    const nextWeek = weeks.length + 1;
    setWeeks([...weeks, { 
      weekNumber: nextWeek,
      schedule: defaultWeekSchedule,
      restrictions: [],
      specialInstructions: '',
      duties: ''
    }]);
  };

  const removeWeek = (weekNumber: number) => {
    setWeeks(weeks.filter(week => week.weekNumber !== weekNumber));
  };

  const copyPreviousWeek = (weekNumber: number) => {
    const previousWeek = weeks[weekNumber - 2];
    if (!previousWeek) return;

    const newWeeks = [...weeks];
    newWeeks[weekNumber - 1] = {
      ...newWeeks[weekNumber - 1],
      schedule: previousWeek.schedule.map(day => ({ ...day })),
      duties: previousWeek.duties,
      restrictions: [...previousWeek.restrictions],
      specialInstructions: previousWeek.specialInstructions
    };
    setWeeks(newWeeks);
  };

  const calculateWeeklyHours = (weekSchedule: DaySchedule[]): number => {
    return weekSchedule.reduce((total, day) => {
      return total + calculateHours(day.startTime, day.endTime);
    }, 0);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedWeeks = Array.from(weeks);
    const [movedWeek] = reorderedWeeks.splice(result.source.index, 1);
    reorderedWeeks.splice(result.destination.index, 0, movedWeek);

    // Update week numbers
    const updatedWeeks = reorderedWeeks.map((week, index) => ({
      ...week,
      weekNumber: index + 1
    }));

    setWeeks(updatedWeeks);
  };

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography variant="h6">
            {t('grtw.title')}
          </Typography>
          <Box>
            <Button
              size="small"
              onClick={() => setShowComparison(!showComparison)}
              sx={{ mr: 1 }}
            >
              {showComparison ? 'Hide' : 'Show'} Comparison
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setPreviewOpen(true)}
              startIcon={<PreviewIcon />}
            >
              Preview
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Dates Section */}
          <Grid item xs={12} md={6}>
            <DatePicker
              label="GRTW Start Date"
              onChange={() => {}}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Expected Full RTW Date"
              onChange={() => {}}
              sx={{ width: '100%' }}
            />
          </Grid>
          
          {showComparison && (
            <WeekComparison 
              weeks={weeks}
              regularHours={40}
            />
          )}

          {/* Weekly Plans with mobile optimization */}
          <Grid container spacing={isMobile ? 2 : 3}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="weeks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {weeks.map((week, index) => (
                      <DraggableWeek 
                        key={week.weekNumber} 
                        week={week} 
                        index={index}
                      >
                        <Paper 
                          sx={{ 
                            p: isMobile ? 2 : 3,
                            bgcolor: 'background.default'
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1">
                              Week {week.weekNumber}
                            </Typography>
                            <Box>
                              {week.weekNumber > 1 && (
                                <Button
                                  size="small"
                                  onClick={() => copyPreviousWeek(week.weekNumber)}
                                  sx={{ mr: 1 }}
                                >
                                  Copy Previous Week
                                </Button>
                              )}
                              {weeks.length > 1 && (
                                <Button
                                  startIcon={<DeleteIcon />}
                                  onClick={() => removeWeek(week.weekNumber)}
                                  color="error"
                                  size="small"
                                >
                                  Remove Week
                                </Button>
                              )}
                            </Box>
                          </Box>

                          {/* Weekly Summary */}
                          <WeeklyScheduleView 
                            week={week}
                            totalTargetHours={40}
                          />

                          {/* Daily Schedule */}
                          <Typography variant="subtitle2" sx={{ mt: 3, mb: 2 }}>
                            Daily Schedule
                          </Typography>
                          {week.schedule.map((day) => (
                            <Grid container spacing={2} key={day.day} sx={{ mb: 2 }}>
                              <Grid item xs={12} sm={3}>
                                <Typography>{day.day}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <ValidationTextField
                                  name={`week${week.weekNumber}_${day.day}_start`}
                                  label="Start Time"
                                  type="time"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  aria-label={`Start time for ${day.day}`}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <ValidationTextField
                                  name={`week${week.weekNumber}_${day.day}_end`}
                                  label="End Time"
                                  type="time"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  aria-label={`End time for ${day.day}`}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <ValidationTextField
                                  name={`week${week.weekNumber}_${day.day}_hours`}
                                  label="Hours"
                                  type="number"
                                  fullWidth
                                  InputProps={{ inputProps: { min: 0, max: 8, step: 0.5 } }}
                                  aria-label={`Hours worked on ${day.day}`}
                                />
                              </Grid>
                            </Grid>
                          )}

                          {/* Restrictions & Limitations */}
                          <Typography variant="subtitle2" sx={{ mt: 3, mb: 2 }}>
                            Restrictions & Limitations
                          </Typography>
                          <ValidationTextField
                            name={`week${week.weekNumber}_restrictions`}
                            label="Current Restrictions"
                            fullWidth
                            multiline
                            rows={3}
                            aria-label={`Restrictions for week ${week.weekNumber}`}
                          />

                          {/* Special Instructions */}
                          <Typography variant="subtitle2" sx={{ mt: 3, mb: 2 }}>
                            Special Instructions
                          </Typography>
                          <ValidationTextField
                            name={`week${week.weekNumber}_instructions`}
                            label="Special Instructions or Accommodations"
                            fullWidth
                            multiline
                            rows={2}
                            aria-label={`Special instructions for week ${week.weekNumber}`}
                          />

                          {/* Modified Duties */}
                          <Typography variant="subtitle2" sx={{ mt: 3, mb: 2 }}>
                            Modified Duties
                          </Typography>
                          <ValidationTextField
                            name={`week${week.weekNumber}_duties`}
                            label="Modified Duties Description"
                            fullWidth
                            multiline
                            rows={2}
                            aria-label={`Modified duties for week ${week.weekNumber}`}
                          />

                          <WeeklyHoursBreakdown
                            week={week}
                            regularHours={40}
                            showProgress
                          />
                        </Paper>
                      </DraggableWeek>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>

          {/* Add Week Button */}
          <Grid item xs={12}>
            <Button
              startIcon={<AddIcon />}
              onClick={addWeek}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Another Week
            </Button>
          </Grid>

          {/* Supervisor Approval Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>
                Supervisor Approval
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ValidationTextField
                    name="supervisorName"
                    label="Supervisor Name"
                    fullWidth
                    rules={{ required: 'Supervisor name is required' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Approval Date"
                    onChange={() => {}}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ValidationTextField
                    name="supervisorComments"
                    label="Comments"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Progress Tracker */}
          <Grid item xs={12}>
            <ProgressTracker
              currentWeek={weeks.length}
              totalWeeks={6}  // or dynamic based on plan
              targetHours={40}
              currentHours={calculateWeeklyHours(weeks[weeks.length - 1].schedule)}
            />
          </Grid>

          {/* Plan Summary */}
          <Grid item xs={12}>
            <PlanSummary
              weeks={weeks}
              startDate={methods.getValues('startDate')}
              endDate={methods.getValues('endDate')}
            />
          </Grid>

          {/* Progress Timeline */}
          <Grid item xs={12}>
            <ProgressTimeline
              weeks={weeks.map(week => ({
                week: week.weekNumber,
                hours: calculateWeeklyHours(week.schedule),
                targetHours: 40,
                date: new Date() // You'll need to add dates to your week structure
              }))}
              startDate={methods.getValues('startDate')}
              targetDate={methods.getValues('endDate')}
            />
          </Grid>
        </Grid>

        {/* Preview Dialog */}
        <PreviewDialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          data={{
            weeks,
            startDate: methods.getValues('startDate'),
            endDate: methods.getValues('endDate'),
            supervisorInfo: {
              name: methods.getValues('supervisorName'),
              approvalDate: methods.getValues('approvalDate'),
            },
          }}
        />
      </Paper>
    </FormProvider>
  );
}; 