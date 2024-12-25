import dayjs from 'dayjs';
export function getCurrentWeekDates() {
    const today = dayjs(); 
    const startOfWeek = today.startOf('week');
    const endOfWeek = today.endOf('week');
  
    return {
      from_date: startOfWeek.format('YYYY-MM-DD'),
      to_date: today.format('YYYY-MM-DD'),
    };
  }
  
  export function getCurrentMonthDates() {
    const today = dayjs();
    const startOfMonth = today.startOf('month');
    const endOfMonth = today.endOf('month');
  
    return {
      from_date: startOfMonth.format('YYYY-MM-DD'),
      to_date: today.format('YYYY-MM-DD'),
    };
  }