import * as yup from 'yup';
import { calculateHours } from './timeCalculations';

export const validationRules = {
  required: {
    required: 'This field is required',
  },
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^\+?[\d\s-]{10,}$/,
      message: 'Invalid phone number',
    },
  },
  postalCode: {
    pattern: {
      value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      message: 'Invalid postal code',
    },
  },
};

export const createGRTWValidationSchema = (regularHours: number = 8) => {
  return yup.object().shape({
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date()
      .required('End date is required')
      .min(yup.ref('startDate'), 'End date must be after start date'),
    
    // Dynamic week validation
    weeks: yup.array().of(
      yup.object().shape({
        schedule: yup.array().of(
          yup.object().shape({
            startTime: yup.string()
              .required('Start time is required'),
            endTime: yup.string()
              .required('End time is required')
              .test('is-after-start', 'End time must be after start time', 
                function(endTime) {
                  const startTime = this.parent.startTime;
                  return calculateHours(startTime, endTime) > 0;
                }),
            hoursWorked: yup.number()
              .min(0, 'Hours cannot be negative')
              .max(regularHours, `Hours cannot exceed ${regularHours}`)
              .test('matches-time-range', 'Hours must match time range',
                function(hours) {
                  const { startTime, endTime } = this.parent;
                  const calculated = calculateHours(startTime, endTime);
                  return Math.abs(calculated - hours) < 0.25; // Allow 15min difference
                })
          })
        )
        .test('max-weekly-hours', 'Weekly hours cannot exceed regular schedule',
          function(schedule) {
            const weeklyHours = schedule.reduce((sum, day) => 
              sum + (day.hoursWorked || 0), 0);
            return weeklyHours <= regularHours * 5;
          }),
        restrictions: yup.string()
          .required('Restrictions must be specified'),
        duties: yup.string()
          .required('Modified duties must be specified')
      })
    ),

    supervisorName: yup.string()
      .required('Supervisor name is required'),
    approvalDate: yup.date()
      .required('Approval date is required')
      .max(new Date(), 'Approval date cannot be in the future')
  });
};

export const grtwValidationRules = {
  schedule: {
    maxConsecutiveDays: (days: number) => 
      yup.array().test('max-consecutive', 
        `Cannot work more than ${days} consecutive days`,
        function(schedule) {
          // Check consecutive working days logic
          return true; // Implement logic
        }),
    minRestBetweenShifts: (hours: number) =>
      yup.string().test('min-rest',
        `Must have ${hours} hours between shifts`,
        function(endTime) {
          const nextDayStart = this.parent.nextDayStart;
          // Check rest period logic
          return true; // Implement logic
        }),
    maxShiftLength: (hours: number) =>
      yup.number().max(hours, `Shift cannot exceed ${hours} hours`),
  },
  restrictions: {
    requireEndDate: yup.date()
      .when('hasRestrictions', {
        is: true,
        then: yup.date().required('End date required for restrictions')
      }),
    requireDetails: yup.string()
      .when('hasRestrictions', {
        is: true,
        then: yup.string().min(10, 'Please provide detailed restrictions')
      }),
  },
  duties: {
    matchRestrictions: yup.string()
      .test('duties-match-restrictions',
        'Duties must align with current restrictions',
        function(duties) {
          const restrictions = this.parent.restrictions;
          // Implement validation logic
          return true;
        }),
  }
}; 