import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { pickerActions } from '../store/slices/picker';
import { months } from '../utils/globals';
import styles from './Datepicker.module.scss';
import Datetable from './Datetable/Datetable';
import NavButton from './NavButton/NavButton';
import MonthOption from './Option/MonthOption/MonthOption';
import Option from './Option/Option';
import YearOption from './Option/YearOption/YearOption';

const Datepicker = props => {
  const { position, picker } = props;
  const { id } = picker;
  const [scrollerMonthDisplayed, setScrollerMonthDisplayed] = useState(false);
  const [scrollerYearDisplayed, setScrollerYearDisplayed] = useState(false);

  const displayedMonth = picker.displayedMonth;
  const displayedYear = picker.displayedYear;

  const dispatch = useDispatch();

  const yearsArray = Array.from(
    { length: 2023 - 1930 + 1 },
    (_, i) => 2023 - i
  );

  const scrollerMonthHandler = () => {
    setScrollerMonthDisplayed(prevState => !prevState);
  };

  const scrollerYearHandler = () => {
    setScrollerYearDisplayed(prevState => !prevState);
  };

  const prevMonthHandler = () => {
    dispatch(pickerActions.decrementDisplayMonth({ id }));
  };

  const nextMonthHandler = () => {
    dispatch(pickerActions.incrementDisplayMonth({ id }));
  };

  const todayHandler = () => {
    dispatch(pickerActions.setTodayDisplayedValues({ id }));
  };

  return createPortal(
    <div
      className={`${styles.datepicker}`}
      style={{ left: position.x, top: position.y }}
      data-id={picker.id}
    >
      <NavButton className="prev-btn" onClick={prevMonthHandler} />
      <NavButton className="today-btn" onClick={todayHandler} />
      <Option
        className="month"
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
        className="year"
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
      <NavButton className="next-btn" onClick={nextMonthHandler} />
      <div className={styles.calendar}>
        <Datetable picker={picker} />
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default Datepicker;
