import React from 'react';
import styles from '../pages/Dashboard.module.css';

/**
 * Component for displaying the Start Date and End Date inputs.
 * @param {object} props
 * @param {string} props.startDate - The currently selected start date.
 * @param {string} props.finishDate - The currently selected finish date.
 * @param {function} props.onChange - Handler function to update the date state.
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