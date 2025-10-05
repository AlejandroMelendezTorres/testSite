import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar';
import ChartCard from '../components/ChartCard'; 
import DateRangePickerCard from '../components/DateRangePickerCard'; 

/**
 * The full Dashboard Page component, featuring the fixed Sidebar and four line charts.
 */
function DashboardPage() {
  
  const [viewMode, setViewMode] = useState('live'); 
  const [activeChartId, setActiveChartId] = useState(null);

  const [timeState, setTimeState] = useState({
    startDate: '2023-01-01',    
    finishDate: '2023-12-31',   
  });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeState(prev => ({
        ...prev,
        [name]: value
    }));
  };

  const handleEditToggle = (e, id) => {
    e.stopPropagation(); 
    setActiveChartId(activeChartId === id ? null : id);
  };
  
  // 💥 MODIFIED: Updated chartConfigs to include all required data props
  const chartConfigs = [
    { 
        id: 'rev', 
        chartTitle: "Monthly Revenue", 
        xLabel: "Month", 
        yLabel: "Revenue ($)", 
        initialColor: "var(--chart-color-1)",
        xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        yData: [10000, 6500, 7200, 8100, 7800, 9500],
    },
    { 
        id: 'users', 
        chartTitle: "Active Users", 
        xLabel: "Month", 
        yLabel: "Users (Count)", 
        initialColor: "var(--chart-color-2)",
        xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        yData: [1200, 1450, 1600, 1, 1700, 2000],
    },
    { 
        id: 'chat', 
        chartTitle: "Chatbot Engagement", 
        xLabel: "Month", 
        yLabel: "Sessions", 
        initialColor: "var(--chart-color-3)",
        xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        yData: [80, 110, 150, 140, 180, 210],
    },
    { 
        id: 'anom', 
        chartTitle: "Anomaly Alerts", 
        xLabel: "Day", 
        yLabel: "Alerts (Count)", 
        initialColor: "var(--chart-color-4)",
        xData: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        yData: [5, 2, 8, 1, 4, 10],
    },
  ];

  return (
    <>
      <Sidebar />
      
      <main className={styles.mainContent} onClick={() => setActiveChartId(null)}> 
        
        {/* PAGE HEADER COMPONENT */}
        <div className={styles.pageHeader}>
          <div className={styles.headerInner}>
            <header className={styles.dashboardHeader}>
              <h1>Dashboard Metrics Overview 📊</h1>
              
              <div className={styles.modeToggleGroup}>
                <h5 
                  className={`${styles.modeToggle} ${viewMode === 'live' ? styles.activeLive : ''}`}
                  onClick={() => setViewMode('live')}
                >
                  Live Metrics
                </h5>
                <h5 
                  className={`${styles.modeToggle} ${viewMode === 'custom' ? styles.activeCustom : ''}`}
                  onClick={() => setViewMode('custom')}
                >
                  Start Date - End Date
                </h5>
              </div>
              
            </header>
          </div>
        </div>
        
        {/* Date Picker Card (Visible when Custom is active) */}
        {viewMode === 'custom' && (
            <section className={styles.datePickerSection}>
                <DateRangePickerCard 
                    startDate={timeState.startDate}
                    finishDate={timeState.finishDate}
                    onChange={handleTimeChange}
                />
            </section>
        )}
        
        <div className={styles.dashboardContainer}>
          <section className={styles.chartsGrid}>
            {chartConfigs.map(config => (
              <ChartCard 
                key={config.id}
                chartId={config.id} 
                
                // 💥 NEW/MODIFIED PROP PASSING
                chartTitle={config.chartTitle}
                xLabel={config.xLabel}
                yLabel={config.yLabel}
                xData={config.xData}
                yData={config.yData}
                
                initialType={config.chartTitle} // Using title as initial type in mock for edit modal consistency
                initialColor={config.initialColor}
                isMenuOpen={activeChartId === config.id} 
                onToggle={handleEditToggle} 
              />
            ))}
          </section>
        </div>

        {/* PAGE FOOTER COMPONENT */}
        <div className={styles.pageFooter}>
            <div className={styles.footerInner}>
                <span>&copy; {new Date().getFullYear()} AppLogo Dashboard</span>
                <span>Data last refreshed: {new Date().toLocaleTimeString()}</span>
            </div>
        </div>
        
      </main>
    </>
  );
}

export default DashboardPage;