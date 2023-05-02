import NepaliDate from 'nepali-date-converter'

export const formatNepaliDate = val => {
  const nepaliDate = new NepaliDate(val);
  const formattedDate = nepaliDate.format('dd DD, MMMM');
  return formattedDate;
};
