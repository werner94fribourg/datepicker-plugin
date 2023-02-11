/**
 * Store of all global helper functions used in the application.
 * @module helpers
 */

/**
 * Function used to returns the day of the week of a specific date - from monday : 0 to sunday : 6.
 * @param {Date} date - the date from which we want to return the day of the week
 * @returns {number} the day of the week of the date in a numerical value
 */
export const getWeekDay = date => {
  const dayValue = date.getDay();
  return (dayValue + 6) % 7;
};

/**
 * Function used to find the date after/before a certain date in days.
 * @param {Date} date - the date from which we want to retrieve a previous/next date
 * @param {number} value - the integer value of the days, it is negative if we want to retrieve a previous date
 * @returns {Date} the corresponding day happening after/before the given day
 */
const addDays = (date, value) => {
  const returnedDate = new Date(date.getTime());
  returnedDate.setDate(returnedDate.getDate() + value);
  return returnedDate;
};

/**
 * Function used to calculate the number of displayed days between two dates, including the two passed as a parameter.
 * @param {Date} date2 the bigger date
 * @param {Date} date1 the smaller date
 * @returns {number} the number of days that will be displayed between the two dates
 */
const nbDisplayedDays = (date2, date1) => {
  const diffTime = date2.getTime() - date1.getTime();

  return Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
};

/**
 * Function used to generate, for a specific month, the dates in the datepicker that will be displayed in the view.
 * @param {number} month the month from which we want to generate the days
 * @param {number} year the year from which we want to generate the days
 * @returns {Date[][]} a two dimensional array that contains the dates that will be displayed on the datepicker
 */
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

/**
 * Function used to calculate, for a given month and year, the previous month and year in the calendar.
 * @param {number} month the specified month
 * @param {number} year the specified year
 * @returns {number[]} an array containing the previous month and year for the given month and year
 */
export const getPreviousMonth = (month, year) => {
  if (month === 0) return [11, --year];

  return [--month, year];
};

/**
 * Function used to calculate, for a given month and year, the next month and year in the calendar.
 * @param {number} month the specified month
 * @param {number} year the specified year
 * @returns {number[]} an array containing the next month and year for the given month and year
 */
export const getNextMonth = (month, year) => {
  if (month === 11) return [0, ++year];
  return [++month, year];
};

/**
 * Function used to retrieve and format the chosen date from a picker. It returns today's date by default if the picker is not defined.
 * @param {Object|undefined} picker the picker object from which we want to retrieve the chosen date
 * @returns {string} the chosen date of the picker in a formatted form
 */
export const getPickerDate = picker => {
  const date = picker?.chosenDate || new Date();

  const [formattedDate] = new Date(date).toISOString().split('T');

  return formattedDate;
};

/**
 * Function used to retrieve the visibility state of a picker. It returns false by default if the picker is not defined.
 * @param {Object|undefined} picker the picker object from which we want to retrieve the chosen date
 * @returns {boolean} the visibility of the picker
 */
export const getPickerVisibility = picker => {
  return picker?.visible || false;
};

/**
 * Function used to update the value of an element in an array at a specific position.
 * @param {number} index - the index in the array of the picker element we want to update
 * @param {Object} updatedElement - the new element we want to store at this position
 * @param {Array} pickersArray - the array passed as a parameter to the function
 * @returns {Array} the array passed as a parameter to the function
 */
export const generateUpdatedArray = (index, updatedElement, pickersArray) => {
  pickersArray[index] = updatedElement;
  return pickersArray;
};
