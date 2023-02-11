import PickerContextProvider from './store/picker-store';
import PropTypes from 'prop-types';

/**
 * InputDate store provider, that gives access to the picker's general store.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const InputDateProvider = props => {
  return <PickerContextProvider>{props.children}</PickerContextProvider>;
};

InputDateProvider.propTypes = {
  /** The children components wrapped by the store provider */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InputDateProvider;
