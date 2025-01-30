export const calculateHours = (startTime: string, endTime: string): number => {
  if (!startTime || !endTime) return 0;
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const start = startHour + startMinute / 60;
  const end = endHour + endMinute / 60;
  
  return Math.max(0, end - start);
};

export const validateTimeRange = (startTime: string, endTime: string): boolean => {
  if (!startTime || !endTime) return true;
  return calculateHours(startTime, endTime) > 0;
}; 