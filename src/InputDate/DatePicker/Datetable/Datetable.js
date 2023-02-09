import PropTypes from 'prop-types';

import { weekDays } from '../../utils/globals';
import { generateDays } from '../../utils/helpers';
import DateItem from './DateItem/DateItem';
import styles from './Datetable.module.scss';

/**
 * Component representing the table of displayed dates in the Datepicker Component.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Datetable = props => {
  const { picker } = props;
  const currentMonth = picker.displayedMonth;
  const currentYear = picker.displayedYear;

  const datesArray = generateDays(currentMonth, currentYear);

  return (
    <table className={styles['calendar-table']}>
      <thead>
        <tr>
          {weekDays.map(day => (
            <th
              className={`${styles['calendar-cell']} ${styles['calendar-head']}`}
              key={day}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datesArray.map((line, index) => (
          <tr key={index}>
            {line.map(entry => (
              <DateItem key={entry} date={entry} picker={picker} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Datetable.propTypes = {
  /** The associated datepicker values displayed on the datepicker */
  picker: PropTypes.object.isRequired,
};

export default Datetable;
