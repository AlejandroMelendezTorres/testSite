import React from 'react';
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar';
import ChartCard from '../components/ChartCard'; 

/**
 * The full Dashboard Page component, featuring the fixed Sidebar and four line charts.
 */
function DashboardPage() {
  return (
    <>
      <Sidebar />
      
      {/* Main content offset by the sidebar width */}
      <main className={styles.mainContent}>
        <div className={styles.dashboardContainer}>
          <h2>Dashboard Metrics Overview 📊</h2>

          {/* This section creates the 2x2 grid */}
          <section className={styles.chartsGrid}>
            <ChartCard 
              initialTitle="Monthly Revenue" 
              initialType="Revenue" 
              initialColor="var(--chart-color-1)" 
            />
            <ChartCard 
              initialTitle="Active Users" 
              initialType="Users" 
              initialColor="var(--chart-color-2)" 
            />
            <ChartCard 
              initialTitle="Chatbot Engagement" 
              initialType="Sessions" 
              initialColor="var(--chart-color-3)" 
            />
            <ChartCard 
              initialTitle="Anomaly Alerts" 
              initialType="Alerts" 
              initialColor="var(--chart-color-4)" 
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;