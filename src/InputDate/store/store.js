import { configureStore } from '@reduxjs/toolkit';

import pickerReducer from './slices/picker';

const store = configureStore({
  reducer: { picker: pickerReducer },
});

export default store;
