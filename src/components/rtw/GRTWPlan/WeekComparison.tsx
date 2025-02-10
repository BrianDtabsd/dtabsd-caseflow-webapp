import { WeekPlan } from '/Users/brianonufrejow/Documents/dtabsd-caseflow-webapp/src/components/rtw/GRTWPlan.tsx';

interface WeekComparisonProps {
  weeks: WeekPlan[];
  regularHours: number;
}

export const WeekComparison = ({ weeks, regularHours }: WeekComparisonProps) => {
  console.log(weeks, regularHours); // Placeholder usage
  return <div>WeekComparison Component</div>;
};
