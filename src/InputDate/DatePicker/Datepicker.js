import { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { pickerActions } from '../store/slices/picker';
import { months } from '../utils/globals';
import styles from './Datepicker.module.scss';
import Datetable from './Datetable/Datetable';
import NavButton from './NavButton/NavButton';
import MonthOption from './Option/MonthOption/MonthOption';
import Option from './Option/Option';
import YearOption from './Option/YearOption/YearOption';

/**
 * Datepicker element. It corresponds to the datepicker rendered when we click an InputDate component.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Datepicker = props => {
  // The related picker data and the position of the datepicker passed from its parent InputDate component
  const { position, picker, isPortal } = props;
  // Data retrieved used in the rendering
  const { id, displayedMonth, displayedYear } = picker;

  // State management for the display of the month and year scrollers
  const [scrollerMonthDisplayed, setScrollerMonthDisplayed] = useState(false);
  const [scrollerYearDisplayed, setScrollerYearDisplayed] = useState(false);

  const dispatch = useDispatch();

  // List of years that will be displayed in the year selector - from 1930 to 2023
  const yearsArray = Array.from(
    { length: 2023 - 1930 + 1 },
    (_, i) => 2023 - i
  );

  // Changes the visibility of the month scroller when we click on the month selector
  const scrollerMonthHandler = () => {
    setScrollerMonthDisplayed(prevState => !prevState);
  };

  // Changes the visibility of the year scroller when we click on the year selector
  const scrollerYearHandler = () => {
    setScrollerYearDisplayed(prevState => !prevState);
  };

  // Changes the displayed month and year to be the previous month and year in the calendar
  const prevMonthHandler = () => {
    dispatch(pickerActions.decrementDisplayMonth({ id }));
  };

  // Changes the displayed month and year to be the next month and year in the calendar
  const nextMonthHandler = () => {
    dispatch(pickerActions.incrementDisplayMonth({ id }));
  };

  // Sets the displayed month and year to be today's current month and year
  const todayHandler = () => {
    dispatch(pickerActions.setTodayDisplayedValues({ id }));
  };

  // The component is initialized using createPortal to make it be a direct child of the body element
  return (
    <div
      className={`${styles.datepicker}${isPortal ? ' ' + styles.portal : ''}`}
      data-testid="datepicker"
      style={{ left: position.x, top: position.y }}
      data-id={id}
      data-month={displayedMonth}
      data-year={displayedYear}
    >
      <NavButton
        className="prev-btn"
        data-testid="prev-btn"
        onClick={prevMonthHandler}
      />
      <NavButton
        className="today-btn"
        data-testid="today-btn"
        onClick={todayHandler}
      />
      <Option
        type="month"
        data-testid="month-option"
        onClick={scrollerMonthHandler}
        activeValue={months[displayedMonth]}
        scrollerDisplayed={scrollerMonthDisplayed}
      >
        {months.map((month, index) => (
          <MonthOption
            key={month}
            className={styles.option}
            active={styles.active}
            id={index}
            value={month}
            picker={picker}
          />
        ))}
      </Option>
      <Option
        type="year"
        data-testid="year-option"
        onClick={scrollerYearHandler}
        activeValue={displayedYear}
        scrollerDisplayed={scrollerYearDisplayed}
      >
        {yearsArray.map(value => (
          <YearOption
            key={value}
            className={styles.option}
            active={styles.active}
            year={value}
            picker={picker}
          />
        ))}
      </Option>
      <NavButton
        className="next-btn"
        data-testid="next-btn"
        onClick={nextMonthHandler}
      />
      <div className={styles.calendar}>
        <Datetable picker={picker} />
      </div>
    </div>
  );
};

Datepicker.propTypes = {
  /** The position of the datepicker in the screen */
  position: PropTypes.object.isRequired,
  /** The associated datepicker values displayed on the datepicker */
  picker: PropTypes.object.isRequired,
};

export default Datepicker;
