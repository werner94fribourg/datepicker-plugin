import {
  generateDays,
  generateUpdatedArray,
  getNextMonth,
  getPickerDate,
  getPickerVisibility,
  getPreviousMonth,
  getWeekDay,
} from './helpers';

describe('test of helper functions', () => {
  describe('getWeekDay', () => {
    test('returns 0 if the date is a monday', () => {
      const firstDate = new Date(Date.parse('2023-02-06'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(0);
    });
    test('returns 1 if the date is a tuesday', () => {
      const firstDate = new Date(Date.parse('2023-02-07'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(1);
    });
    test('returns 2 if the date is a wednesday', () => {
      const firstDate = new Date(Date.parse('2023-02-08'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(2);
    });
    test('returns 3 if the date is a thursday', () => {
      const firstDate = new Date(Date.parse('2023-02-09'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(3);
    });
    test('returns 4 if the date is a friday', () => {
      const firstDate = new Date(Date.parse('2023-02-10'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(4);
    });
    test('returns 5 if the date is a saturday', () => {
      const firstDate = new Date(Date.parse('2023-02-11'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(5);
    });
    test('returns 6 if the date is a sunday', () => {
      const firstDate = new Date(Date.parse('2023-02-12'));
      const weekDay = getWeekDay(firstDate);

      expect(weekDay).toBe(6);
    });
  });
  describe('generateDays', () => {
    let month;
    let year;
    beforeEach(() => {
      const date = new Date(new Date() - Math.random() * 1e12);
      month = date.getMonth();
      year = date.getFullYear();
    });
    test('generate, for a give month and year, all the days of the months', () => {
      const dateArray = generateDays(month, year);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      lastDayOfMonth.setHours(lastDayOfMonth.getHours() + 12);
      const nbDays = lastDayOfMonth.getUTCDate();

      const flattenDays = dateArray.flatMap(date => date);
      const daysOfMonth = flattenDays.reduce((daysOfMonth, date) => {
        if (date.getMonth() === month) daysOfMonth.push(date);
        return daysOfMonth;
      }, []);

      expect(daysOfMonth.length).toBe(nbDays);
    });
    test('generates a multiple of 7 number of days', () => {
      const dateArray = generateDays(month, year);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      lastDayOfMonth.setHours(lastDayOfMonth.getHours() + 12);

      const nbDates = dateArray.reduce((acc, line) => acc + line.length, [0]);

      expect(nbDates % 7).toBe(0);
    });
  });
  describe('getPreviousMonth', () => {
    test('returns the previous month and the same year if the month given is not january', () => {
      const month = 2;
      const year = 2020;
      const [prevMonth, prevYear] = getPreviousMonth(month, year);

      expect(prevMonth).toBe(month - 1);
      expect(prevYear).toBe(year);
    });
    test('returns december and the previous year if the month given is january', () => {
      const month = 0;
      const year = 2020;
      const [prevMonth, prevYear] = getPreviousMonth(month, year);

      expect(prevMonth).toBe(11);
      expect(prevYear).toBe(year - 1);
    });
  });
  describe('getNextMonth', () => {
    test('returns the next month and the same year if the month given is not december', () => {
      const month = 2;
      const year = 2020;
      const [nextMonth, nextYear] = getNextMonth(month, year);

      expect(nextMonth).toBe(month + 1);
      expect(nextYear).toBe(year);
    });
    test('returns january and the next year if the month given is december', () => {
      const month = 11;
      const year = 2020;
      const [nextMonth, nextYear] = getNextMonth(month, year);

      expect(nextMonth).toBe(0);
      expect(nextYear).toBe(year + 1);
    });
  });
  describe('getPickerDate', () => {
    test("returns today's formatted date if the picker object doesn't contain a date", () => {
      const picker = {};
      const today = new Date(Date.now());

      const returnedByPicker = getPickerDate(picker);

      expect(returnedByPicker).toBe(today.toISOString().split('T')[0]);
    });
    test('returns the date in a formatted form if the picker object contains a date', () => {
      const chosenDate = Date.parse('2019-01-01');
      const picker = {
        chosenDate,
      };

      const returnedByPicker = getPickerDate(picker);

      expect(returnedByPicker).toBe(
        new Date(chosenDate).toISOString().split('T')[0]
      );
    });
  });
  describe('getPickerVisibility', () => {
    test("returns false if the picker object doesn't contain a visible key", () => {
      const picker = {};

      const pickerVisibility = getPickerVisibility(picker);

      expect(pickerVisibility).toBeFalsy();
    });
    test("returns true if the picker object's visible key is true", () => {
      const picker = { visible: true };

      const pickerVisibility = getPickerVisibility(picker);

      expect(pickerVisibility).toBeTruthy();
    });
    test("returns false if the picker object's visible key is false", () => {
      const picker = { visible: false };

      const pickerVisibility = getPickerVisibility(picker);

      expect(pickerVisibility).toBeFalsy();
    });
  });
  describe('generateUpdatedArray', () => {
    test('returns the same array', () => {
      const array = [3, 4, 6, 9];
      const newArray = generateUpdatedArray(0, 4, array);

      expect(array).toBe(newArray);
    });
    test('updates the element value at a specific position', () => {
      const position = 3;
      const array = [3, 4, 6, 9];
      expect(array[position]).toBe(9);

      const newArray = generateUpdatedArray(position, 4, array);

      expect(newArray[position]).toBe(4);
    });
    test("doesn't update the array at other positions", () => {
      const position = 3;
      const array = [3, 4, 6, 9];
      expect(array[0]).toBe(3);
      const newArray = generateUpdatedArray(position, 4, array);

      expect(newArray[0]).toBe(3);
    });
  });
});
