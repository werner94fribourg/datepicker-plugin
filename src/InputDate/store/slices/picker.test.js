import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputDateProvider } from '../../InputDate';
import { getNextMonth, getPreviousMonth } from '../../utils/helpers';
import { pickerActions } from './picker';

let pickers;
let pickerId = 'picker';
const randomDate = new Date(Date.now());
const displayedMonth = 3;
const displayedYear = 2015;
const TestComponent = () => {
  pickers = useSelector(state => state.picker.pickers);
  const dispatch = useDispatch();
  const registerHandler = () => {
    dispatch(pickerActions.registerPicker(pickerId));
  };
  const visibilityHandler = () => {
    dispatch(pickerActions.setVisibility({ id: pickerId, visible: true }));
  };
  const dateHandler = () => {
    dispatch(
      pickerActions.setDate({ id: pickerId, date: randomDate.getTime() })
    );
  };
  const setMonthHandler = () => {
    dispatch(pickerActions.setDisplayedMonth({ id: pickerId, displayedMonth }));
  };
  const setYearHandler = () => {
    dispatch(pickerActions.setDisplayedYear({ id: pickerId, displayedYear }));
  };
  const incrementMonthHandler = () => {
    dispatch(pickerActions.incrementDisplayMonth({ id: pickerId }));
  };
  const decrementMonthHandler = () => {
    dispatch(pickerActions.decrementDisplayMonth({ id: pickerId }));
  };

  const todayHandler = () => {
    dispatch(pickerActions.setTodayDisplayedValues({ id: pickerId }));
  };
  return (
    <React.Fragment>
      <button data-testid="register-picker" onClick={registerHandler}></button>
      <button
        data-testid="modify-visibility"
        onClick={visibilityHandler}
      ></button>
      <button data-testid="set-date" onClick={dateHandler}></button>
      <button data-testid="set-month" onClick={setMonthHandler}></button>
      <button data-testid="set-year" onClick={setYearHandler}></button>
      <button
        data-testid="increment-month"
        onClick={incrementMonthHandler}
      ></button>
      <button
        data-testid="decrement-month"
        onClick={decrementMonthHandler}
      ></button>
      <button data-testid="set-today" onClick={todayHandler}></button>
    </React.Fragment>
  );
};

describe('Picker store', () => {
  beforeEach(() => {
    render(
      <InputDateProvider>
        <TestComponent />
      </InputDateProvider>
    );
  });
  test('The store successfully registers a new picker', () => {
    const clickBtn = screen.getByTestId('register-picker');
    userEvent.click(clickBtn);

    const today = new Date(Date.now());
    const picker = pickers.find(picker => picker.id === pickerId);

    expect(picker).toBeDefined();
    expect(picker.visible).toBeFalsy();
    expect(picker.displayedMonth).toBe(today.getMonth());
    expect(picker.displayedYear).toBe(today.getFullYear());
  });
  test('The store successfully changes the visibility of an existing picker', () => {
    let picker = pickers.find(picker => picker.id === pickerId);
    const visibilityBtn = screen.getByTestId('modify-visibility');

    expect(picker.visible).toBeFalsy();

    userEvent.click(visibilityBtn);
    picker = pickers.find(picker => picker.id === pickerId);
    expect(picker.visible).toBeTruthy();
  });
  test('The store successfully changes the choosen date of an existing picker', () => {
    let picker = pickers.find(picker => picker.id === pickerId);
    const dateBtn = screen.getByTestId('set-date');
    const visibilityBtn = screen.getByTestId('modify-visibility');
    userEvent.click(visibilityBtn);

    expect(picker.chosenDate).not.toBe(randomDate.getTime());

    userEvent.click(dateBtn);

    picker = pickers.find(picker => picker.id === pickerId);
    expect(picker.chosenDate).toBe(randomDate.getTime());
    expect(picker.displayedMonth).toBe(randomDate.getMonth());
    expect(picker.displayedYear).toBe(randomDate.getFullYear());
    expect(picker.visible).toBeFalsy();
  });
  test('The store successfully changes the displayed month of an existing picker', () => {
    const monthBtn = screen.getByTestId('set-month');

    userEvent.click(monthBtn);

    let picker = pickers.find(picker => picker.id === pickerId);
    expect(picker.displayedMonth).toBe(displayedMonth);
  });
  test('The store successfully changes the displayed year of an existing picker', () => {
    const yearBtn = screen.getByTestId('set-year');

    userEvent.click(yearBtn);
    let picker = pickers.find(picker => picker.id === pickerId);
    expect(picker.displayedYear).toBe(displayedYear);
  });
  test('The store successfully increments the displayed year and month of an existing picker', () => {
    let picker = pickers.find(picker => picker.id === pickerId);
    const currentMonth = picker.displayedMonth;
    const currentYear = picker.displayedYear;
    const [nextMonth, nextYear] = getNextMonth(currentMonth, currentYear);

    const incrementBtn = screen.getByTestId('increment-month');

    userEvent.click(incrementBtn);
    picker = pickers.find(picker => picker.id === pickerId);

    expect(picker.displayedMonth).toBe(nextMonth);
    expect(picker.displayedYear).toBe(nextYear);
  });
  test('The store successfully decrements the displayed year and month of an existing picker', () => {
    let picker = pickers.find(picker => picker.id === pickerId);
    const currentMonth = picker.displayedMonth;
    const currentYear = picker.displayedYear;
    const [prevMonth, prevYear] = getPreviousMonth(currentMonth, currentYear);

    const decrementBtn = screen.getByTestId('decrement-month');

    userEvent.click(decrementBtn);
    picker = pickers.find(picker => picker.id === pickerId);

    expect(picker.displayedMonth).toBe(prevMonth);
    expect(picker.displayedYear).toBe(prevYear);
  });
  test('The store successfully sets the displayed year and month of an existing picker to the current year and month', () => {
    const today = new Date(Date.now());
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const monthBtn = screen.getByTestId('set-today');

    const yearBtn = screen.getByTestId('set-year');
    const decrementBtn = screen.getByTestId('decrement-month');

    userEvent.click(decrementBtn);
    userEvent.click(yearBtn);
    let picker = pickers.find(picker => picker.id === pickerId);

    expect(picker.displayedMonth).not.toBe(todayMonth);
    expect(picker.displayedYear).not.toBe(todayYear);

    userEvent.click(monthBtn);
    picker = pickers.find(picker => picker.id === pickerId);

    expect(picker.displayedMonth).toBe(todayMonth);
    expect(picker.displayedYear).toBe(todayYear);
  });
});
