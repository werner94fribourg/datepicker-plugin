import { useDispatch } from 'react-redux';

import { pickerActions } from '../../../store/slices/picker';

const YearOption = props => {
  const { picker, year, className, active } = props;
  const { id } = picker;
  const displayedYear = picker.displayedYear;
  const dispatch = useDispatch();

  const optionHandler = () => {
    if (year !== displayedYear)
      dispatch(pickerActions.setDisplayedYear({ id, displayedYear: year }));
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

export default YearOption;
