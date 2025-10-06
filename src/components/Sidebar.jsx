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
 * Sidebar
 * -------
 * Pinned navigation on the left. On wide screens it is always visible; on
 * narrow screens it becomes a slide-in panel controlled by `isMobileMenuOpen`.
 *
 * Props:
 * - isMobileMenuOpen: boolean to indicate mobile menu visibility
 * - toggleMenu: function to toggle the mobile menu state
 */
function Sidebar({ isMobileMenuOpen, toggleMenu }) {
  
  // Close the menu if a link is clicked on mobile (optional, but good UX)
  const handleLinkClick = () => {
      if (isMobileMenuOpen) {
          toggleMenu();
      }
  };

  return (
    // Apply a class that the CSS module can use to control visibility
    <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
      
      {/* A. Logo Section */}
      <div className={styles.logoContainer}>
        <img src="../assets/logo.png" alt="App Logo" className={styles.logo} />
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
              onClick={handleLinkClick}
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