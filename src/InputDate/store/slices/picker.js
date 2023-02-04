import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pickers: [],
};

const pickerSlice = createSlice({
  name: 'picker',
  initialState,
  reducers: {
    setVisibility(state, action) {
      const { id, visible } = action.payload;
      const picker = state.pickers.find(picker => picker.id === id);
      picker.visible = visible;
    },
    registerPicker(state, action) {
      const now = Date.now();
      const chosenDate = new Date(now);
      const displayedMonth = chosenDate.getMonth();
      const displayedYear = chosenDate.getFullYear();
      state.pickers.push({
        id: action.payload,
        visible: false,
        chosenDate: now,
        displayedMonth,
        displayedYear,
      });
    },
    setDate(state, action) {
      const { id, date } = action.payload;
      const dateFor = new Date(date);
      const picker = state.pickers.find(picker => picker.id === id);

      picker.chosenDate = date;
      picker.displayedMonth = dateFor.getMonth();
      picker.displayedYear = dateFor.getFullYear();
      picker.visible = false;
    },
    setDisplayedMonth(state, action) {
      const { id, displayedMonth } = action.payload;
      const picker = state.pickers.find(picker => picker.id === id);

      picker.displayedMonth = displayedMonth;
    },
    setDisplayedYear(state, action) {
      const { id, displayedYear } = action.payload;
      const picker = state.pickers.find(picker => picker.id === id);

      picker.displayedYear = displayedYear;
    },
    incrementDisplayMonth(state, action) {
      const { id } = action.payload;
      const picker = state.pickers.find(picker => picker.id === id);

      if (picker.displayedMonth === 11) {
        picker.displayedMonth = 0;
        picker.displayedYear++;
      } else {
        picker.displayedMonth++;
      }
    },
    decrementDisplayMonth(state, action) {
      const { id } = action.payload;

      const picker = state.pickers.find(picker => picker.id === id);

      if (picker.displayedMonth === 0) {
        picker.displayedMonth = 11;
        picker.displayedYear--;
      } else {
        picker.displayedMonth--;
      }
    },
    setTodayDisplayedValues(state, action) {
      const { id } = action.payload;
      const picker = state.pickers.find(picker => picker.id === id);
      const now = Date.now();
      const chosenDate = new Date(now);
      const displayedMonth = chosenDate.getMonth();
      const displayedYear = chosenDate.getFullYear();

      picker.chosenDate = now;
      picker.displayedMonth = displayedMonth;
      picker.displayedYear = displayedYear;
    },
  },
});

export const pickerActions = pickerSlice.actions;

const pickerReducer = pickerSlice.reducer;

export default pickerReducer;
