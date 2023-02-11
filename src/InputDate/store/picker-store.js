import {
  generateUpdatedArray,
  getNextMonth,
  getPreviousMonth,
} from '../utils/helpers';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

/**
 * Reducer Function used to create and add a new picker in the store.
 * @param {string} id - the id of the new picker we want to add
 * @param {Array} state - the store of pickers to which we want to add the new one
 * @returns {Array} a brand new store containing the newly added picker
 */
const registerPicker = (id, state) => {
  const newPicker = { id, visible: false };
  const now = Date.now();
  const chosenDate = new Date(now);

  newPicker.chosenDate = now;
  newPicker.displayedMonth = chosenDate.getMonth();
  newPicker.displayedYear = chosenDate.getFullYear();
  return [...state, newPicker];
};

/**
 * Reducer Function used to update the visibility of a picker within the store.
 * @param {string} id - the id of the picker to which we want to update
 * @param {boolean} visibility - the newly visibility status of the picker
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const setVisibility = (id, visibility, state) => {
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);

  if (index !== -1) {
    const newArray = [...state];

    pickerToModify.visible = visibility;

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Reducer Function used to update the selected date of a picker within the store.
 * @param {string} id - the id of the picker to which we want to update
 * @param {number} date - the value of the date we want to set to the picker (in timestamp)
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const setDate = (id, date, state) => {
  const dateFor = new Date(date);
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);
  if (index !== -1) {
    const newArray = [...state];

    pickerToModify.chosenDate = date;
    pickerToModify.displayedMonth = dateFor.getMonth();
    pickerToModify.displayedYear = dateFor.getFullYear();
    pickerToModify.visible = false;

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Reducer Function used to update the displayed month of the picker when it is visible.
 * @param {string} id - the id of the picker we want to update
 * @param {number} month - the new value of the month we want to display
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const setDisplayedMonth = (id, month, state) => {
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);

  if (index !== -1) {
    const newArray = [...state];

    pickerToModify.displayedMonth = month;

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Reducer Function used to update the displayed year of the picker when it is visible.
 * @param {string} id - the id of the picker we want to update
 * @param {number} year - the new value of the year we want to display
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const setDisplayedYear = (id, year, state) => {
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);
  if (index !== -1) {
    const newArray = [...state];

    pickerToModify.displayedYear = year;

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Reducer Function used to increment the month and year we want to display in the picker.
 * @param {string} id - the id of the picker we want to update
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const incrementDisplayMonth = (id, state) => {
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);
  if (index !== -1) {
    const newArray = [...state];
    const [nextMonth, nextYear] = getNextMonth(
      pickerToModify.displayedMonth,
      pickerToModify.displayedYear
    );

    pickerToModify.displayedMonth = nextMonth;
    pickerToModify.displayedYear = nextYear;

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Reducer Function used to decrement the month and year we want to display in the picker.
 * @param {string} id - the id of the picker we want to update
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const decrementDisplayMonth = (id, state) => {
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);
  if (index !== -1) {
    const newArray = [...state];
    const [prevMonth, prevYear] = getPreviousMonth(
      pickerToModify.displayedMonth,
      pickerToModify.displayedYear
    );

    pickerToModify.displayedMonth = prevMonth;
    pickerToModify.displayedYear = prevYear;

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Reducer Function used to set the displayed month and year in the picker to the current month and year.
 * @param {string} id - the id of the picker we want to update
 * @param {Array} state - the store of pickers containing the requested one
 * @returns {Array} a brand new store containing the updated picker
 */
const setTodayDisplayedValues = (id, state) => {
  const pickerToModify = state.find(picker => picker.id === id);
  const index = state.indexOf(pickerToModify);
  if (index !== -1) {
    const newArray = [...state];
    const now = Date.now();
    const dateFor = new Date(now);

    pickerToModify.displayedMonth = dateFor.getMonth();
    pickerToModify.displayedYear = dateFor.getFullYear();

    return generateUpdatedArray(index, pickerToModify, newArray);
  }
};

/**
 * Main reducer function, used to modify the state and call the defined reducer functions depending on the type of action.
 * @param {Array} state - the array of pickers we want to update
 * @param {Object} action - the object containing the type of action and the data used to update the state
 * @returns {Array} an updated array for the state
 */
const reducers = (state = [], action) => {
  switch (action.type) {
    case 'register':
      return registerPicker(action.id, state);
    case 'visibility':
      return setVisibility(action.id, action.visible, state);
    case 'date':
      return setDate(action.id, action.date, state);
    case 'set_displayed_month':
      return setDisplayedMonth(action.id, action.month, state);
    case 'set_displayed_year':
      return setDisplayedYear(action.id, action.year, state);
    case 'increment':
      return incrementDisplayMonth(action.id, state);
    case 'decrement':
      return decrementDisplayMonth(action.id, state);
    case 'set_today':
      return setTodayDisplayedValues(action.id, state);
    default:
      return state;
  }
};

/**
 * Picker context object storing all initialized pickers and their data and the dispatch function
 * @typedef PickerContext
 * @property {Array} pickers - the store of existing pickers in the application
 * @property {Function} dispatch - the dispatcher function, used to update the store
 *
 * @type {PickerContext}
 */
const initialState = {
  pickers: [],
  dispatch: (state, action) => {},
};

/**
 * @type {Context<PickerContext>}
 */
export const PickerContext = React.createContext(initialState);

/**
 * Picker context provider, containing the store and its dispatcher functions as parameters.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const PickerContextProvider = props => {
  const [pickers, dispatch] = useReducer(reducers, []);

  return (
    <PickerContext.Provider
      value={{
        pickers,
        dispatch,
      }}
    >
      {props.children}
    </PickerContext.Provider>
  );
};

PickerContextProvider.propTypes = {
  /** The children components wrapped by the store provider */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PickerContextProvider;
