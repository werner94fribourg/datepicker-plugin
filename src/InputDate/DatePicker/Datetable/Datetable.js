import { weekDays } from '../../utils/globals';
import { generateDays } from '../../utils/helpers';
import DateItem from './DateItem/DateItem';
import styles from './Datetable.module.scss';

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

export default Datetable;
