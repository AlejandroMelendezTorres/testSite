import React from 'react';
import styles from '../pages/Dashboard.module.css';

/**
 * Hamburger icon (menu button) for toggling the sidebar on mobile.
 */
export function MenuButton({ isOpen, onClick }) {
    // Props:
    // - isOpen: boolean indicating whether the sidebar is open
    // - onClick: click handler to toggle the sidebar
    return (
        <div 
            className={styles.menuButton} 
            onClick={(e) => { e.stopPropagation(); onClick && onClick(e); }}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
        >
            {/* Simple three-line hamburger icon using unicode */}
            <span className={styles.menuIcon}>{isOpen ? '✕' : '☰'}</span>
        </div>
    );
}