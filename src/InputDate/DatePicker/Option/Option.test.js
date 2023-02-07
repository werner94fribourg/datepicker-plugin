import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDate, { InputDateProvider } from '../../InputDate';

describe('<Option />', () => {
  let monthOptionEl;
  let yearOptionEl;
  beforeEach(() => {
    render(
      <InputDateProvider>
        <InputDate />
      </InputDateProvider>
    );

    const inputDateEl = screen.getByTestId('input-date');
    userEvent.click(inputDateEl);

    monthOptionEl = screen.getByTestId('month-option');
    yearOptionEl = screen.getByTestId('year-option');
  });

  test('All the option selector lists are originally hidden', () => {
    const isMonthOptionHidden = JSON.parse(monthOptionEl.dataset.hidden);
    const isYearOptionHidden = JSON.parse(yearOptionEl.dataset.hidden);

    expect(isMonthOptionHidden).toBeFalsy();
    expect(isYearOptionHidden).toBeFalsy();
  });
  describe('The month option selector', () => {
    beforeEach(() => {
      userEvent.click(monthOptionEl);
    });
    test('is diplayed when we click on it', () => {
      const isMonthOptionHidden = JSON.parse(monthOptionEl.dataset.hidden);

      expect(isMonthOptionHidden).toBeTruthy();
    });
    test('is hidden when we click two times on it', () => {
      userEvent.click(monthOptionEl);

      const isMonthOptionHidden = JSON.parse(monthOptionEl.dataset.hidden);

      expect(isMonthOptionHidden).toBeFalsy();
    });
    test('is hidden after we choose a month option', () => {
      let isMonthOptionHidden = JSON.parse(monthOptionEl.dataset.hidden);

      expect(isMonthOptionHidden).toBeTruthy();

      const monthOptionChoiceEl = screen.getByTestId('month-option-1');
      userEvent.click(monthOptionChoiceEl);

      isMonthOptionHidden = JSON.parse(monthOptionEl.dataset.hidden);

      expect(isMonthOptionHidden).toBeFalsy();
    });
    test('sets the displayed month to the choosen option after we click on it', () => {
      const monthId = 1;
      const monthOptionChoiceEl = screen.getByTestId(`month-option-${monthId}`);
      userEvent.click(monthOptionChoiceEl);

      const datepicker = screen.getByTestId('datepicker');
      const displayedMonth = Number(datepicker.dataset.month);

      expect(displayedMonth).toBe(monthId);
    });
  });
  describe('The year option selector', () => {
    beforeEach(() => {
      userEvent.click(yearOptionEl);
    });
    test('is displayed when we click on it', () => {
      const isYearOptionHidden = JSON.parse(yearOptionEl.dataset.hidden);

      expect(isYearOptionHidden).toBeTruthy();
    });
    test('is hidden when we click two times on it', () => {
      userEvent.click(yearOptionEl);

      const isYearOptionHidden = JSON.parse(yearOptionEl.dataset.hidden);

      expect(isYearOptionHidden).toBeFalsy();
    });
    test('is hidden after we choose a year option', () => {
      let isYearOptionHidden = JSON.parse(yearOptionEl.dataset.hidden);

      expect(isYearOptionHidden).toBeTruthy();

      const yearOptionChoiceEl = screen.getByTestId('year-option-2013');
      userEvent.click(yearOptionChoiceEl);

      isYearOptionHidden = JSON.parse(yearOptionEl.dataset.hidden);

      expect(isYearOptionHidden).toBeFalsy();
    });
    test('sets the displayed year to the choosen option after we click on it', () => {
      const yearId = 2013;
      const yearOptionChoiceEl = screen.getByTestId(`year-option-${yearId}`);
      userEvent.click(yearOptionChoiceEl);

      const datepicker = screen.getByTestId('datepicker');
      const displayedYear = Number(datepicker.dataset.year);

      expect(displayedYear).toBe(yearId);
    });
  });
});
