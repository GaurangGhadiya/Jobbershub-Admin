import moment from 'moment';

export const formatDate = (dateString) => {
    return moment(dateString).format("D MMM YYYY h:mm A");
  };

  export const formatDateslesh =(dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  export const convertTimeToAmPm = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number); // Split into hours and minutes
    const period = hours >= 12 ? 'pm' : 'am'; // Determine am/pm
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format (0 becomes 12)
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  