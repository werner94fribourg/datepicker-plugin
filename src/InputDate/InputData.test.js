import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDate, { InputDateProvider } from './InputDate';

describe('<InputDate />', () => {
  describe('When a single InputDate component is rendered,', () => {
    beforeEach(() => {
      render(
        <InputDateProvider>
          <InputDate />
        </InputDateProvider>
      );
    });
    test('an input date element should be displayed on the screen', () => {
      const inputDateEl = screen.getByTestId('input-date');

      expect(inputDateEl).toBeInTheDocument();
    });
    test('no datepicker is displayed at the beginning', () => {
      const getPickerFn = () => {
        screen.getByTestId('datepicker');
      };

      expect(getPickerFn).toThrow();
    });
    describe('when we click on the input date,', () => {
      beforeEach(() => {
        const inputDateEl = screen.getByTestId('input-date');

        userEvent.click(inputDateEl);
      });
      test('a datepicker is rendered on the screen', () => {
        const datepickerEl = screen.getByTestId('datepicker');

        expect(datepickerEl).toBeInTheDocument();
      });
      test('the datepicker stays rendered if we click again on the input date', () => {
        const inputDateEl = screen.getByTestId('input-date');

        userEvent.click(inputDateEl);
        const datepickerEl = screen.getByTestId('datepicker');

        expect(datepickerEl).toBeInTheDocument();
      });
      test('the datepicker stays rendered if we click on the datepicker', () => {
        const datepickerEl = screen.getByTestId('datepicker');

        userEvent.click(datepickerEl);
        const datePickerAfterClickEl = screen.getByTestId('datepicker');

        expect(datePickerAfterClickEl).toBeInTheDocument();
      });
      test('the datepicker disappears if we click on DOM elements different from the input date or the datepicker', () => {
        const datepickerEl = screen.getByTestId('datepicker');
        expect(datepickerEl).toBeInTheDocument();

        const body = document.querySelector('body');
        userEvent.click(body);

        const getPickerFn = () => {
          screen.getByTestId('datepicker');
        };

        expect(getPickerFn).toThrow();
      });
      describe('and the Datepicker element is displayed', () => {});
    });
  });
  describe('When multiple InputDate components are rendered', () => {
    beforeEach(() => {
      render(
        <InputDateProvider>
          <InputDate />
          <InputDate />
        </InputDateProvider>
      );
    });
    test('multiple input date elements should be displayed on the screen', () => {
      const inputDateEls = screen.getAllByTestId('input-date');

      expect(inputDateEls.length).toBeGreaterThan(0);
      inputDateEls.forEach(el => {
        expect(el).toBeInTheDocument();
      });
    });
    describe('when we click on the first input date element', () => {
      let inputDateEls;
      beforeEach(() => {
        inputDateEls = screen.getAllByTestId('input-date');

        const [firstInputEl] = inputDateEls;

        userEvent.click(firstInputEl);
      });
      test('a single datepicker element should be displayed on the screen', () => {
        const datepickerEl = screen.getByTestId('datepicker');
        expect(datepickerEl).toBeInTheDocument();
      });
      test('the datepicker associated with the first one is removed and another one shown if we click on another datepicker', () => {
        const [_, secondInputEl] = inputDateEls;

        const firstDatepickerEl = screen.getByTestId('datepicker');
        const firstPickerId = firstDatepickerEl.dataset.id;

        userEvent.click(secondInputEl);
        const secondDatepickerEl = screen.getByTestId('datepicker');
        const secondPickerId = secondDatepickerEl.dataset.id;

        expect(secondDatepickerEl).toBeInTheDocument();
        expect(secondPickerId).not.toBe(firstPickerId);
      });
      test("no datepicker is displayed if we click on an element which isn't a datepicker", () => {
        const body = document.querySelector('body');

        userEvent.click(body);

        const getPickerFn = () => {
          screen.getByTestId('datepicker');
        };

        expect(getPickerFn).toThrow();
      });
    });
  });
});
