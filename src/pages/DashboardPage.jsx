import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar';
import ChartCard from '../components/ChartCard'; 
import ChartSettingsModal from '../components/ChartSettingsModal'; 
import DateRangePickerCard from '../components/DateRangePickerCard'; 
import { MenuButton } from '../components/MenuButton';
// 💥 NEW IMPORT: UserBox (to simulate importing its static data)
import UserBox from '../components/UserBox';

// Static Data based on previous structure
const CHART_COLORS = [
  "var(--chart-color-1)", 
  "var(--chart-color-2)", 
  "var(--chart-color-3)", 
  "var(--chart-color-4)"
];
const MOCK_DATA = [
  { xData: [5000, 6500, 7200, 8100, 7800, 9500], yData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  { xData: [1200, 1450, 1600, 1850, 1700, 2000], yData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  { xData: [80, 110, 150, 140, 180, 210], yData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  { xData: [5, 2, 8, 1, 4, 10], yData: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'] },
];

// Helper to define the initial state using indices 0, 1, 2, 3
const getInitialMetricIndices = () => [0, 1, 2, 3];


function DashboardPage() {

  const [viewMode, setViewMode] = useState('live'); 
  const [activeChartId, setActiveChartId] = useState(null); 
  const [editingChart, setEditingChart] = useState(null); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);
  const [timeState, setTimeState] = useState({
    startDate: '2025-08-09',    
    finishDate: '2025-12-31',   
  });

  // Helper to initialize charts using the preferred metrics indices
  const initialCharts = getInitialMetricIndices().map((metricIndex, i) => ({
    id: `chart-${i}`, 
    chartTitle: `Chart ${i + 1}`, // Placeholder title, will be determined in ChartCard
    type: metricIndex, // Stores the index
    initialColor: CHART_COLORS[i],
    ...MOCK_DATA[i % MOCK_DATA.length] // Assign mock data circularly
  }));

  // 💥 EDITED: Initialize charts using the list of indices
  const [charts, setCharts] = useState(initialCharts);

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeState(prev => ({
        ...prev,
        [name]: value
    }));
  };

  const findChartConfig = (id) => charts.find(c => c.id === id);

  const handleModalClose = (e, newConfig) => {
    if (e && e.stopPropagation) e.stopPropagation(); 

    if (newConfig && activeChartId) {
        // newConfig.type is the new index (as a string)
        const newMetricIndex = parseInt(newConfig.type, 10);
        
        setCharts(prevCharts => prevCharts.map(chart => {
            if (chart.id === activeChartId) {
                return {
                    ...chart,
                    // Title is determined in ChartCard now
                    type: newMetricIndex,       // Update the metric index
                };
            }
            return chart;
        }));
    }

    setActiveChartId(null);
    setEditingChart(null);
    setIsMobileMenuOpen(false);
  };

  const handleEditToggle = (e, id) => {
    e.stopPropagation(); 
    
    if (activeChartId !== id) {
        setActiveChartId(id);
        const config = findChartConfig(id);
        // Pass the current metric INDEX as initialType (must be converted to string for select default value)
        setEditingChart({ ...config, initialType: String(config.type) }); 
    } else {
        setActiveChartId(null);
        setEditingChart(null);
    }
  };
  
  // 💥 NEW: Convert viewMode string to isLive boolean
  const isLive = viewMode === 'live';

  return (
    <>
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      
      <main className={styles.mainContent} onClick={handleModalClose}> 
        
        {/* PAGE HEADER COMPONENT */}
        <div className={styles.pageHeader}>
          <div className={styles.headerInner}>
            <header className={styles.dashboardHeader}>
              <div className={styles.titleContainer}>
                <MenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
                <h1>Dashboard Metrics Overview 📊</h1>
              </div>

              <div className={styles.modeToggleGroup}>
                <h5 
                  className={`${styles.modeToggle} ${isLive ? styles.activeLive : ''}`}
                  onClick={() => setViewMode('live')}
                >
                  Live Metrics
                </h5>
                <h5 
                  className={`${styles.modeToggle} ${!isLive ? styles.activeCustom : ''}`}
                  onClick={() => setViewMode('custom')}
                >
                  Start Date - End Date
                </h5>
              </div>
            </header>
          </div>
        </div>
        
        {/* Date Picker Card */}
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
            {charts.map(config => (
              <ChartCard 
                key={config.id}
                chartId={config.id} 
                // 💥 NEW/EDITED PROPS
                metricIndex={config.type} // Pass the index
                isLive={isLive}
                startDate={timeState.startDate}
                finishDate={timeState.finishDate}
                chartColor={config.initialColor} // Renamed for clarity in ChartCard
                // Existing props
                xData={config.xData}
                yData={config.yData}
                isMenuOpen={activeChartId === config.id} 
                onToggle={handleEditToggle} 
              />
            ))}
          </section>
        </div>

        <div className={styles.pageFooter}>
            <div className={styles.footerInner}>
                <span>&copy; {new Date().getFullYear()} AppLogo Dashboard</span>
                <span>Data last refreshed: {new Date().toLocaleTimeString()}</span>
            </div>
        </div>
        
      </main>
      
      {editingChart && (
          <ChartSettingsModal
              initialConfig={editingChart}
              onClose={handleModalClose}
          />
      )}
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default DashboardPage;