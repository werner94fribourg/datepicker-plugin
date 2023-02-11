import { PickerContext } from '../../../store/picker-store';
import PropTypes from 'prop-types';
import { useContext } from 'react';

/**
 * Component representing a month choice in an option selector
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const MonthOption = props => {
  const { id, value, picker, className, active } = props;
  const { id: pickerId } = picker;
  const displayedMonth = picker.displayedMonth;
  const { dispatch } = useContext(PickerContext);

  const optionHandler = () => {
    if (id !== displayedMonth)
      dispatch({
        type: 'set_displayed_month',
        id: pickerId,
        month: id,
      });
  };

  let classNames = className;

  if (id === displayedMonth) classNames = classNames.concat(` ${active}`);

  return (
    <div
      className={classNames}
      onClick={optionHandler}
      data-testid={`month-option-${id}`}
    >
      {value}
    </div>
  );
};

MonthOption.propTypes = {
  /** The index of the month option displayed in the option */
  id: PropTypes.number.isRequired,
  /** The text value of the month displayed in the option */
  value: PropTypes.string.isRequired,
  /** The associated datepicker values displayed on the datepicker */
  picker: PropTypes.object.isRequired,
  /** The styles passed from a parent component invoking the YearOption component */
  className: PropTypes.string.isRequired,
  /** The styles passed from a parent component invoking the YearOption component when the year displayed in the component is the active one */
  active: PropTypes.string.isRequired,
};

export default MonthOption;
