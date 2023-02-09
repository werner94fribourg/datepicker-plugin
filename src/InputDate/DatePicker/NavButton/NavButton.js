import PropTypes from 'prop-types';

import styles from './NavButton.module.scss';

/**
 * Component representing a navigation button within the datepicker
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const NavButton = props => {
  const { className, onClick } = props;
  const dataTestId = props['data-testid'];

  return (
    <button
      data-testid={dataTestId}
      type="button"
      className={`${styles.icons} ${styles['nav-btn']} ${styles[className]}`}
      onClick={onClick}
    ></button>
  );
};

NavButton.propTypes = {
  /** The class name of the displayed button (prev-btn, next-btn, ...) */
  className: PropTypes.string.isRequired,
  /** A function handler that will be called when we click on the button */
  onClick: PropTypes.func.isRequired,
};

export default NavButton;
