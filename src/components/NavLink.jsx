import React from 'react';
import styles from './Sidebar.module.css'; 

/**
 * Component for a single navigation link.
 */
function NavLink({ path, icon, name, isCurrent }) {
  return (
    <li>
      <a 
        href={path} 
        className={`${styles.navLink} ${isCurrent ? styles.current : ''}`}
        aria-current={isCurrent ? 'page' : undefined}
      >
        <span className={styles.icon}>{icon}</span>
        {name}
        {isCurrent && <span className={styles.currentPageBadge}>•</span>}
      </a>
    </li>
  );
}

export default NavLink;