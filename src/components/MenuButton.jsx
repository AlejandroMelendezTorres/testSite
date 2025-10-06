import React from 'react';
import styles from '../pages/Dashboard.module.css';


export function MenuButton({ isOpen, onClick }) {
    return (
        <div 
            className={styles.menuButton} 
            onClick={(e) => { e.stopPropagation(); onClick && onClick(e); }}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
        >
            <span className={styles.menuIcon}>{isOpen ? '✕' : '☰'}</span>
        </div>
    );
}