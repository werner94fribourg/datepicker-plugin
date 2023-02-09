import React from 'react';

import InputDateProvider from '../src/InputDate/InputDateProvider';

global.InputDateProvider = InputDateProvider;
global.React = React;
global.position = { x: 0, y: 0 };
global.picker = {
  chosenDate: Date.now(),
  displayedMonth: 1,
  displayedYear: 2023,
  id: ':r0:',
  visible: false,
};
