export const getWeekDay = date => {
  const dayValue = date.getDay();
  return (dayValue + 6) % 7;
};

const addDays = (date, value) => {
  const returnedDate = new Date(date.getTime());
  returnedDate.setDate(returnedDate.getDate() + value);
  return returnedDate;
};

const nbDisplayedDays = (date2, date1) => {
  const diffTime = date2.getTime() - date1.getTime();

  return Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
};

export const generateDays = (month, year) => {
  const firstDayofMonth = new Date(year, month, 1);
  firstDayofMonth.setHours(firstDayofMonth.getHours() + 12);

  const lastDayOfMonth = new Date(year, month + 1, 0);
  lastDayOfMonth.setHours(lastDayOfMonth.getHours() + 12);

  const firstWeekDayOfMonth = getWeekDay(firstDayofMonth);
  const lastWeekDayOfMonth = getWeekDay(lastDayOfMonth);

  const firstDisplayedDay = addDays(firstDayofMonth, -1 * firstWeekDayOfMonth);
  const lastDisplayedDay = addDays(lastDayOfMonth, 6 - lastWeekDayOfMonth);

  const displayedDays = nbDisplayedDays(lastDisplayedDay, firstDisplayedDay);

  const nbRows = Math.floor(displayedDays / 7);
  const datesArray = new Array(nbRows)
    .fill(0)
    .map((_, indexX) =>
      new Array(7)
        .fill(0)
        .map((_, indexY) => addDays(firstDisplayedDay, 7 * indexX + indexY))
    );

  return datesArray;
};
