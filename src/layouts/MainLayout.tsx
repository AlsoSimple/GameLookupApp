import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoCompass, IoSearch, IoHeart } from 'react-icons/io5';
import styles from './MainLayout.module.scss';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: <IoCompass />, label: 'Discover' },
    { path: '/?focus=search', icon: <IoSearch />, label: 'Search' },
    { path: '/?focus=favorites', icon: <IoHeart />, label: 'Favorites' },
  ];

  return (
    <div className={styles.wrapper}>
      <main className={styles.pageContainer}>
        <Outlet />
      </main>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`${styles.navItem} ${location.pathname === item.path || (item.path === '/' && location.pathname === '/') ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
