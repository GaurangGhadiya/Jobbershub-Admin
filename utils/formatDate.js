import moment from 'moment';

export const formatDate = (dateString) => {
    return moment(dateString).format("D MMM YYYY h:mm A");
  };