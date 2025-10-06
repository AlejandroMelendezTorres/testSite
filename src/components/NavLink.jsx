import React from 'react';
import styles from './Sidebar.module.css'; 

function NavLink({ path, icon, name, isCurrent, onClick }) {
  return (
    <li>
      <a 
        href={path} 
        className={`${styles.navLink} ${isCurrent ? styles.current : ''}`}
        aria-current={isCurrent ? 'page' : undefined}
        onClick={onClick}
      >
        <span className={styles.icon}>{icon}</span>
        {name}
        {isCurrent && <span className={styles.currentPageBadge}>•</span>}
      </a>
    </li>
  );
}

export default NavLink;