import { Provider } from 'react-redux';

import PropTypes from 'prop-types';

import store from './store/store';

/**
 * InputDate store provider, that gives access to the picker's general store.
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const InputDateProvider = props => {
  return <Provider store={store}>{props.children}</Provider>;
};

InputDateProvider.propTypes = {
  /** The children components wrapped by the store provider */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InputDateProvider;
