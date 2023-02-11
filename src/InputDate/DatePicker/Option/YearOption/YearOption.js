import { PickerContext } from '../../../store/picker-store';
import PropTypes from 'prop-types';
import { useContext } from 'react';

/**
 * Component representing a year choice in an option selector
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const YearOption = props => {
  const { picker, year, className, active } = props;
  const { id } = picker;
  const displayedYear = picker.displayedYear;
  const { dispatch } = useContext(PickerContext);

  const optionHandler = () => {
    if (year !== displayedYear)
      dispatch({ type: 'set_displayed_year', id, year });
  };
  let classNames = className;

  if (year === displayedYear) classNames = classNames.concat(` ${active}`);

  return (
    <div
      className={classNames}
      onClick={optionHandler}
      data-testid={`year-option-${year}`}
    >
      {year}
    </div>
  );
};

YearOption.propTypes = {
  /** The associated datepicker values displayed on the datepicker */
  picker: PropTypes.object.isRequired,
  /** The year value displayed in the option element */
  year: PropTypes.number.isRequired,
  /** The styles passed from a parent component invoking the YearOption component */
  className: PropTypes.string.isRequired,
  /** The styles passed from a parent component invoking the YearOption component when the year displayed in the component is the active one */
  active: PropTypes.string.isRequired,
};
export default YearOption;
