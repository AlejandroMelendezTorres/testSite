import React from 'react';
import styles from '../pages/Dashboard.module.css';

/**
 * DateRangePickerCard
 * -------------------
 * Small presentational component that renders two native date inputs
 * (startDate & finishDate). It is controlled by the parent via props and
 * notifies changes using `onChange`.
 *
 * Props:
 * - startDate: string (YYYY-MM-DD)
 * - finishDate: string (YYYY-MM-DD)
 * - onChange: change handler for inputs
 */
function DateRangePickerCard({ startDate, finishDate, onChange }) {
  return (
    <div className={styles.datePickerCard}>
      <h3 className={styles.pickerHeader}>Custom Time Range</h3>
      
      <div className={styles.datePickerGroup}>
        <label className={styles.dateLabel}>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={onChange}
            className={styles.dateInput}
          />
        </label>
        
        <label className={styles.dateLabel}>
          Finish Date:
          <input
            type="date"
            name="finishDate"
            value={finishDate}
            onChange={onChange}
            className={styles.dateInput}
          />
        </label>
      </div>
      
      <p className={styles.timeInfo}>
          Charts will reflect data between **{startDate || 'Start'}** and **{finishDate || 'End'}**.
      </p>
    </div>
  );
}

export default DateRangePickerCard;