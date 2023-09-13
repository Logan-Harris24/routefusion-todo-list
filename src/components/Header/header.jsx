import todofusionLogo from '../../assets/routefusion-dark.svg';
import styles from './header.module.css';

export function Header({ }) {
  return (
    <header className={styles.header}>
      <a href="https://routefusion.com">
        <img className={styles.headerLogo} src={todofusionLogo} />
      </a>
    </header>
  )
}