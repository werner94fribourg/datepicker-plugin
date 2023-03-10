import { PickerContext } from '../../../store/picker-store';
import styles from './DateItem.module.scss';
import PropTypes from 'prop-types';
import { useContext } from 'react';

/**
 * Component representing a selectable date in the table of dates.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const DateItem = props => {
  const { date, picker } = props;
  const { id } = picker;
  const { dispatch } = useContext(PickerContext);

  const currentSelectedDate = new Date(picker.chosenDate);
  const displayedMonth = picker.displayedMonth;
  const today = new Date(Date.now());
  const isSelected = currentSelectedDate.toDateString() === date.toDateString();
  const isToday = today.toDateString() === date.toDateString();
  const isInDisplayedMonth = date.getMonth() !== displayedMonth;

  const selectDateHandler = event => {
    event.stopPropagation();
    dispatch({ type: 'date', id, date: date.getTime() });
  };

  let classNames = `${styles['calendar-cell']} ${styles['calendar-date']}`;

  if (isSelected) classNames = classNames.concat(` ${styles.active}`);

  if (isToday) classNames = classNames.concat(` ${styles.today}`);

  if (isInDisplayedMonth)
    classNames = classNames.concat(` ${styles['other-month']}`);

  return (
    <td
      className={classNames}
      onClick={selectDateHandler}
      data-testid="date-item"
      data-date={date}
      data-today={isToday}
      data-selected={isSelected}
    >
      <div>{date.getUTCDate()}</div>
    </td>
  );
};

DateItem.propTypes = {
  /** The associated datepicker values displayed on the datepicker */
  picker: PropTypes.object.isRequired,
  /** The date associated with the item */
  date: PropTypes.instanceOf(Date).isRequired,
};
export default DateItem;
