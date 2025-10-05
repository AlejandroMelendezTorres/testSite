import React from 'react';
import styles from './Sidebar.module.css'; 
import NavLink from './NavLink';
import UserBox from './UserBox';

// Data for the navigation links
const navLinks = [
  { name: 'Dashboard', icon: '🏠', path: '/dashboard', current: true }, 
  { name: 'Chatbot', icon: '🤖', path: '/chatbot', current: false },
  { name: 'Anomalies', icon: '⚠️', path: '/anomalies', current: false },
];

/**
 * A pinned sidebar navigation component.
 */
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      
      {/* A. Logo Section */}
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>AppLogo</h1>
        <span className={styles.tagline}>Product Name</span>
      </div>

      <hr className={styles.divider} />

      {/* B. Navigation Links */}
      <nav className={styles.navLinks}>
        <ul>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              path={link.path}
              icon={link.icon}
              name={link.name}
              isCurrent={link.current}
            />
          ))}
        </ul>
      </nav>

      {/* C. User Info (Pinned to the bottom) */}
      <UserBox />
      
    </aside>
  );
}

export default Sidebar;