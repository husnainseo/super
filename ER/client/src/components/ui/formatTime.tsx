import React ,{FC} from 'react';

type Props = {
    dateString: Date;
    };

const DateFormat = ({ dateString }:Props) => {
  const inputDate = new Date(dateString);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const year = inputDate.getFullYear();
  const month = monthNames[inputDate.getMonth()];
  const day = inputDate.getDate();
  const outputDateString = `${day} ${month}, ${year}`;
  return (
    <span>{outputDateString}</span>
  );
};

export default DateFormat;
