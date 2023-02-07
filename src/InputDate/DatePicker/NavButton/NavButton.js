import styles from './NavButton.module.scss';

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

export default NavButton;
