import PropTypes from 'prop-types';

import styles from './Option.module.scss';

/**
 * Component representing an option selector within the datepicker (month or year)
 *
 * @version 1.0.0
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Option = props => {
  const { type, activeValue, scrollerDisplayed, onClick, children } = props;

  const dataTestId = props['data-testid'];
  return (
    <div
      data-testid={dataTestId}
      className={`${styles['select-label']} ${styles[type]}`}
      onClick={onClick}
      data-hidden={scrollerDisplayed}
      data-active={activeValue}
    >
      <span>{activeValue}</span>
      <div
        className={`${styles.select}${
          scrollerDisplayed ? ` ${styles.active}` : ''
        } ${styles[`${type}-select`]}`}
      >
        <div className={styles.options}>{children}</div>
      </div>
      <i className={styles.icons}></i>
    </div>
  );
};

Option.propTypes = {
  /** The related type for the option - the values can be month or year */
  type: PropTypes.string.isRequired,
  /** The active month/year to display in the option selector */
  activeValue: PropTypes.string.isRequired,
  /** A boolean informing us that the list of options is displayed or not */
  scrollerDisplayed: PropTypes.bool.isRequired,
  /** A click handler function that will be called when the user clicks on the option selector */
  onClick: PropTypes.func.isRequired,
  /** The children components wrapped by the option selector - a list of YearOption or MonthOption components */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Option;
