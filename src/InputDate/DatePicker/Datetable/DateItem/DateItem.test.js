import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDate, { InputDateProvider } from '../../../InputDate';

describe('<DateItem />', () => {
  let dateItemEls;
  beforeEach(() => {
    render(
      <InputDateProvider>
        <InputDate />
      </InputDateProvider>
    );
    const inputDateEl = screen.getByTestId('input-date');

    userEvent.click(inputDateEl);
    dateItemEls = screen.getAllByTestId('date-item');
  });
  test('The current selected date is originally set to today', () => {
    const todayEl = dateItemEls.find(el => JSON.parse(el.dataset.today));
    const selectedEl = dateItemEls.find(el => JSON.parse(el.dataset.selected));

    const todayItemDate = new Date(todayEl.dataset.date);
    const today = new Date(Date.now());

    expect(selectedEl).toBe(todayEl);
    expect(todayItemDate.toDateString()).toBe(today.toDateString());
  });
  describe('If we select another date within the same month,', () => {
    let chosenDateEl;
    let chosenDate;
    beforeEach(() => {
      const datepickerEl = screen.getByTestId('datepicker');
      const currentMonth = Number(datepickerEl.dataset.month);

      do {
        chosenDateEl =
          dateItemEls[[Math.floor(Math.random() * dateItemEls.length)]];
        chosenDate = new Date(chosenDateEl.dataset.date);
      } while (chosenDate.getMonth() !== currentMonth);

      userEvent.click(chosenDateEl);
    });
    test('the picker is hidden', () => {
      const datepickerFn = () => {
        userEvent.getByTestId('datepicker');
      };

      expect(datepickerFn).toThrow();
    });
    test('the displayed date in the input date corresponds to the chosen date', () => {
      const inputDateEl = screen.getByTestId('input-date');

      const dateValue = new Date(inputDateEl.value);

      expect(dateValue.toDateString()).toBe(chosenDate.toDateString());
    });
    describe('when we click again on the input date,', () => {
      beforeEach(() => {
        const inputDateEl = screen.getByTestId('input-date');

        userEvent.click(inputDateEl);
        dateItemEls = screen.getAllByTestId('date-item');
      });
      test('the current displayed date is set to the new selected date', () => {
        const selectedEl = dateItemEls.find(el =>
          JSON.parse(el.dataset.selected)
        );

        const selectedDate = new Date(selectedEl.dataset.date);

        expect(selectedDate).toStrictEqual(chosenDate);
      });
      test("the today element always corresponds to today's date", () => {
        const todayEl = dateItemEls.find(el => JSON.parse(el.dataset.today));

        const todayItemDate = new Date(todayEl.dataset.date);
        const today = new Date(Date.now());

        expect(todayItemDate.toDateString()).toBe(today.toDateString());
      });
      test("the today element doesn't correspond to the selected item anymore", () => {
        const todayEl = dateItemEls.find(el => JSON.parse(el.dataset.today));
        const selectedEl = dateItemEls.find(el =>
          JSON.parse(el.dataset.selected)
        );

        expect(todayEl).not.toBe(selectedEl);
      });
    });
  });
  describe('If we select a date from a different month and year', () => {
    let chosenDateEl;
    let chosenDate;
    let choosenMonth;
    let choosenYear;
    beforeEach(() => {
      const monthId = Math.floor(Math.random() * 12);
      const monthOptionChoiceEl = screen.getByTestId(`month-option-${monthId}`);
      userEvent.click(monthOptionChoiceEl);
      const yearId = 2013;
      const yearOptionChoiceEl = screen.getByTestId(`year-option-${yearId}`);
      userEvent.click(yearOptionChoiceEl);

      const datepickerEl = screen.getByTestId('datepicker');
      choosenMonth = Number(datepickerEl.dataset.month);
      choosenYear = Number(datepickerEl.dataset.year);

      dateItemEls = screen.getAllByTestId('date-item');
      do {
        chosenDateEl =
          dateItemEls[[Math.floor(Math.random() * dateItemEls.length)]];
        chosenDate = new Date(chosenDateEl.dataset.date);
      } while (chosenDate.getMonth() !== choosenMonth);

      userEvent.click(chosenDateEl);
    });
    test('the picker is hidden', () => {
      const datepickerFn = () => {
        userEvent.getByTestId('datepicker');
      };

      expect(datepickerFn).toThrow();
    });
    test('the displayed date in the input date corresponds to the chosen date', () => {
      const inputDateEl = screen.getByTestId('input-date');

      const dateValue = new Date(inputDateEl.value);

      expect(dateValue.toDateString()).toBe(chosenDate.toDateString());
    });
    describe('when we click again on the input date,', () => {
      beforeEach(() => {
        const inputDateEl = screen.getByTestId('input-date');

        userEvent.click(inputDateEl);
        dateItemEls = screen.getAllByTestId('date-item');
      });
      test('the datepicker originally displays the month and year of the previously selected date', () => {
        const datepicker = screen.getByTestId('datepicker');

        const displayedMonth = Number(datepicker.dataset.month);
        const displayedYear = Number(datepicker.dataset.year);

        expect(choosenMonth).toBe(displayedMonth);
        expect(choosenYear).toBe(displayedYear);
      });
      test('the current displayed date is set to the new selected date', () => {
        const selectedEl = dateItemEls.find(el =>
          JSON.parse(el.dataset.selected)
        );

        const selectedDate = new Date(selectedEl.dataset.date);

        expect(selectedDate).toStrictEqual(chosenDate);
      });
      test('There is no today date displayed', () => {
        const todayEl = dateItemEls.find(el => JSON.parse(el.dataset.today));

        expect(todayEl).toBeUndefined();
      });
    });
  });
});
