import styles from './Header.module.scss';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({
  title = "Discover",
  subtitle = "Find your next favorite game"
}: HeaderProps) => {

  return (
    <header className={styles.header}>
      <div className={styles.gradient}></div>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
