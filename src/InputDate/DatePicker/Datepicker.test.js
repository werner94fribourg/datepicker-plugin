import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDate, { InputDateProvider } from '../InputDate';
import { months } from '../utils/globals';
import { getNextMonth, getPreviousMonth } from '../utils/helpers';

describe('<Datepicker />', () => {
  let datepickerEl;
  beforeEach(() => {
    render(
      <InputDateProvider>
        <InputDate />
      </InputDateProvider>
    );

    const inputDateEl = screen.getByTestId('input-date');

    userEvent.click(inputDateEl);
    datepickerEl = screen.getByTestId('datepicker');
  });
  test('The datepicker initially displays the current month and year', () => {
    const now = Date.now();
    const today = new Date(now);
    const currentMonth = Number(datepickerEl.dataset.month);
    const currentYear = Number(datepickerEl.dataset.year);

    expect(today.getMonth()).toBe(currentMonth);
    expect(today.getFullYear()).toBe(currentYear);
  });
  test('The datepicker displays the previous month in the calendar if we click the previous button', () => {
    let currentMonth = Number(datepickerEl.dataset.month);
    let currentYear = Number(datepickerEl.dataset.year);
    const [prevMonth, prevYear] = getPreviousMonth(currentMonth, currentYear);

    const prevBtn = screen.getByTestId('prev-btn');

    userEvent.click(prevBtn);

    currentMonth = Number(datepickerEl.dataset.month);
    currentYear = Number(datepickerEl.dataset.year);

    expect(currentMonth).toBe(prevMonth);
    expect(currentYear).toBe(prevYear);
  });
  test('The datepicker displays the next month in the calendar if we click the next button', () => {
    let currentMonth = Number(datepickerEl.dataset.month);
    let currentYear = Number(datepickerEl.dataset.year);
    const [nextMonth, nextYear] = getNextMonth(currentMonth, currentYear);

    const nextBtn = screen.getByTestId('next-btn');

    userEvent.click(nextBtn);

    currentMonth = Number(datepickerEl.dataset.month);
    currentYear = Number(datepickerEl.dataset.year);

    expect(currentMonth).toBe(nextMonth);
    expect(currentYear).toBe(nextYear);
  });
  test("The datepicker display the current month and year in the user's system if we click the today button", () => {
    const yearOptionEl = screen.getByTestId('year-option-2013');
    userEvent.click(yearOptionEl);
    const monthOptionEl = screen.getByTestId('month-option-0');
    userEvent.click(monthOptionEl);
    let currentMonth = Number(datepickerEl.dataset.month);
    let currentYear = Number(datepickerEl.dataset.year);
    const now = Date.now();
    const today = new Date(now);

    expect(currentMonth).toBe(0);
    expect(currentYear).toBe(2013);
    expect(currentYear).not.toBe(today.getFullYear());

    const todayBtn = screen.getByTestId('today-btn');
    userEvent.click(todayBtn);
    currentMonth = Number(datepickerEl.dataset.month);
    currentYear = Number(datepickerEl.dataset.year);

    expect(today.getMonth()).toBe(currentMonth);
    expect(today.getFullYear()).toBe(currentYear);
  });
  describe('If we are at the first month of the year', () => {
    beforeEach(() => {
      const firstMonthOptionEl = screen.getByTestId('month-option-0');

      userEvent.click(firstMonthOptionEl);
    });
    test('The month is set to december and the year is set to the previous year if we click on the previous button', () => {
      const currentYear = Number(datepickerEl.dataset.year);

      const prevBtn = screen.getByTestId('prev-btn');

      userEvent.click(prevBtn);
      const prevMonth = Number(datepickerEl.dataset.month);
      const prevYear = Number(datepickerEl.dataset.year);

      expect(prevMonth).toBe(11);
      expect(prevYear).toBe(currentYear - 1);
    });
  });
  describe('If we are at the last month of the year', () => {
    beforeEach(() => {
      const lastMonthOptionEl = screen.getByTestId('month-option-11');

      userEvent.click(lastMonthOptionEl);
    });
    test('The month is set to january and the year is set to the next year if we click on the next button', () => {
      const currentYear = Number(datepickerEl.dataset.year);

      const nextBtn = screen.getByTestId('next-btn');

      userEvent.click(nextBtn);

      const nextMonth = Number(datepickerEl.dataset.month);
      const nextYear = Number(datepickerEl.dataset.year);

      expect(nextMonth).toBe(0);
      expect(nextYear).toBe(currentYear + 1);
    });
  });
  test('The month option selector is set to the current month', () => {
    const monthOptionEl = screen.getByTestId('month-option');
    let currentMonth = Number(datepickerEl.dataset.month);

    const displayedMonth = monthOptionEl.dataset.active;

    expect(displayedMonth).toBe(months[currentMonth]);
  });
  test('The year option selector is set to the current year', () => {
    const yearOptionEl = screen.getByTestId('year-option');
    let currentYear = datepickerEl.dataset.year;

    const displayedYear = yearOptionEl.dataset.active;

    expect(displayedYear).toBe(currentYear);
  });
});
