import Datepicker from './DatePicker/Datepicker';
import { PickerContext } from './store/picker-store';
import { getPickerDate, getPickerVisibility } from './utils/helpers';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Input date component, rendering a date input and a datepicker to select a date from it.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const InputDate = props => {
  // Styles that will be passed from a parent component invoking the datepicker to customize the rendering of the input field
  const { className } = props;

  // Generates a new id each time an InputDate component is created in the App
  // This id is used to register the new picker in the store and handle its behaviors
  const pickerId = useId();
  const { pickers, dispatch } = useContext(PickerContext);
  const picker = pickers.find(picker => picker.id === pickerId);
  // Picker's informations : date and visibility
  const pickerDate = getPickerDate(picker);
  const pickerVisible = getPickerVisibility(picker);

  const inputRef = useRef(null);
  // Position of the displayed picker relatively to its input date
  // This parameter is important, since a portal sets its direct parent to be the body element
  // We then have to manipulate the position of the picker to set it relatively to the input element
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });

  // Changes the visibility of the picker when we click on the input date
  // The handler also sets the position of the picker relatively to the input element
  const pickerStatusHandler = () => {
    dispatch({ type: 'visibility', id: pickerId, visible: !pickerVisible });
    const boundings = inputRef.current.getBoundingClientRect();

    if (
      pickerPosition.x !== boundings.x &&
      pickerPosition.y !== boundings.y + boundings.height
    )
      setPickerPosition({
        x: boundings.x + window.scrollX,
        y: boundings.y + window.scrollY + boundings.height,
      });
  };

  // Registers the picker in the store the first time it's created
  // Also create an event listener on the document that will hide the picker if we don't click on an element related to this picker (the input date or the picker itself)
  useEffect(() => {
    dispatch({ type: 'register', id: pickerId });
    document.addEventListener('click', event => {
      const element = event.target.closest(`*[data-id="${pickerId}"]`);

      if (element) return;
      dispatch({ type: 'visibility', id: pickerId, visible: false });
    });
  }, [pickerId, dispatch]);

  return (
    <React.Fragment>
      <input
        data-testid="input-date"
        className={className}
        type="date"
        value={pickerDate}
        readOnly
        onClick={pickerStatusHandler}
        ref={inputRef}
        data-id={pickerId}
      />
      {picker?.visible &&
        createPortal(
          <Datepicker
            position={pickerPosition}
            picker={picker}
            isPortal={true}
          />,
          document.querySelector('body')
        )}
    </React.Fragment>
  );
};

InputDate.propTypes = {
  /** The styles passed from a parent component invoking the input date */
  className: PropTypes.string,
};

export default InputDate;
