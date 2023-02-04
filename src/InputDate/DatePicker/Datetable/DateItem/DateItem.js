import { useDispatch } from 'react-redux';

import { pickerActions } from '../../../store/slices/picker';
import styles from './DateItem.module.scss';

const DateItem = props => {
  const { date, picker } = props;
  const { id } = picker;
  const currentSelectedDate = new Date(picker.chosenDate);

  const displayedMonth = picker.displayedMonth;
  const today = new Date(Date.now());
  const dispatch = useDispatch();

  const selectDateHandler = event => {
    event.stopPropagation();
    dispatch(pickerActions.setDate({ id, date: date.getTime() }));
  };

  let classNames = `${styles['calendar-cell']} ${styles['calendar-date']}`;

  if (currentSelectedDate.toDateString() === date.toDateString())
    classNames = classNames.concat(` ${styles.active}`);

  if (today.toDateString() === date.toDateString())
    classNames = classNames.concat(` ${styles.today}`);

  if (date.getMonth() !== displayedMonth)
    classNames = classNames.concat(` ${styles['other-month']}`);

  return (
    <td className={classNames} onClick={selectDateHandler}>
      <div>{date.getUTCDate()}</div>
    </td>
  );
};

export default DateItem;
