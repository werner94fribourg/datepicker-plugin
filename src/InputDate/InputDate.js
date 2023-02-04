import React, { useEffect, useId, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';

import Datepicker from './DatePicker/Datepicker';
import { pickerActions } from './store/slices/picker';
import store from './store/store';

const InputDate = props => {
  const pickerId = useId();

  const { id, className } = props;
  const pickers = useSelector(state => state.picker.pickers);
  const picker = pickers.find(picker => picker.id === pickerId);
  const dispatch = useDispatch();
  const date = picker?.chosenDate || new Date();

  const [formattedDate] = new Date(date).toISOString().split('T');
  const inputRef = useRef(null);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });

  const pickerStatusHandler = () => {
    dispatch(pickerActions.setVisibility({ id: pickerId, visible: true }));
    const boundings = inputRef.current.getBoundingClientRect();

    if (
      pickerPosition.x !== boundings.x &&
      pickerPosition.y !== boundings.y + boundings.height
    )
      setPickerPosition({ x: boundings.x, y: boundings.y + boundings.height });
  };

  useEffect(() => {
    dispatch(pickerActions.registerPicker(pickerId));

    document.addEventListener('click', event => {
      const element = event.target.closest(`*[data-id="${pickerId}"]`);

      if (element) return;
      dispatch(pickerActions.setVisibility({ id: pickerId, visible: false }));
    });
  }, [pickerId, dispatch]);

  return (
    <React.Fragment>
      <input
        className={className}
        id={id}
        type="date"
        value={formattedDate}
        readOnly
        onClick={pickerStatusHandler}
        ref={inputRef}
        data-id={pickerId}
      />
      {picker?.visible && (
        <Datepicker position={pickerPosition} picker={picker} />
      )}
    </React.Fragment>
  );
};

export default InputDate;

export const InputDateProvider = props => {
  return <Provider store={store}>{props.children}</Provider>;
};
