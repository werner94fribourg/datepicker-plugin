import styles from './Option.module.scss';

const Option = props => {
  const { className, activeValue, scrollerDisplayed, onClick, children } =
    props;

  const dataTestId = props['data-testid'];
  return (
    <div
      data-testid={dataTestId}
      className={`${styles['select-label']} ${styles[className]}`}
      onClick={onClick}
      data-hidden={scrollerDisplayed}
      data-active={activeValue}
    >
      <span>{activeValue}</span>
      <div
        className={`${styles.select}${
          scrollerDisplayed ? ` ${styles.active}` : ''
        } ${styles[`${className}-select`]}`}
      >
        <div className={styles.options}>{children}</div>
      </div>
      <i className={styles.icons}></i>
    </div>
  );
};

export default Option;
