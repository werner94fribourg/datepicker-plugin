import { useDispatch } from 'react-redux';

import { pickerActions } from '../../../store/slices/picker';

const MonthOption = props => {
  const { id, value, picker, className, active } = props;
  const { id: pickerId } = picker;
  const displayedMonth = picker.displayedMonth;
  const dispatch = useDispatch();
  const optionHandler = () => {
    if (id !== displayedMonth)
      dispatch(
        pickerActions.setDisplayedMonth({ id: pickerId, displayedMonth: id })
      );
  };

  let classNames = className;

  if (id === displayedMonth) classNames = classNames.concat(` ${active}`);

  return (
    <div className={classNames} onClick={optionHandler}>
      {value}
    </div>
  );
};

export default MonthOption;
