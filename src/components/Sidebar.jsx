import React from 'react';
import styles from './Sidebar.module.css'; 
import NavLink from './NavLink';
import UserBox from './UserBox';
import logoImage from '../assets/logo.png'; 

const navLinks = [
  { name: 'Dashboard', icon: '🏠', path: '/dashboard', current: true }, 
  { name: 'Chatbot', icon: '🤖', path: '/chatbot', current: false },
  { name: 'Anomalies', icon: '⚠️', path: '/anomalies', current: false },
];

function Sidebar({ isMobileMenuOpen, toggleMenu }) {
  
  const handleLinkClick = () => {
      if (isMobileMenuOpen) {
          toggleMenu();
      }
  };

  return (
    <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
      
      <div className={styles.logoContainer}>
        <img src={logoImage} alt="App Logo" className={styles.logo} />
      </div>

      <hr className={styles.divider} />

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

      <UserBox />
      
    </aside>
  );
}

export default Sidebar;