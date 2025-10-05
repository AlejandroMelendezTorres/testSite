import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../pages/Dashboard.module.css';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock options for the metrics variable menu
const availableMetrics = ['Revenue', 'Users', 'Sessions', 'Alerts', 'Cost'];

/**
 * Helper function to resolve a CSS variable to its actual computed color value.
 * This is crucial for passing colors correctly to Chart.js.
 */
const resolveCssColor = (cssVar) => {
    if (typeof document === 'undefined' || !cssVar.startsWith('var(')) {
        return cssVar;
    }
    
    // Extract the variable name, e.g., '--chart-color-1'
    const varName = cssVar.substring(4, cssVar.length - 1).trim();
    
    // Get the computed style of the root element (where variables are defined)
    const resolved = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    
    // Return the resolved value (e.g., '#3498db' or 'rgb(52, 152, 219)')
    return resolved || cssVar; 
};


/**
 * Component for a single Line Chart visualization with interactive settings.
 */
function ChartCard({ chartId, chartTitle, xData, yData, xLabel, yLabel, initialType, initialColor, isMenuOpen, onToggle }) {
  
  // State to store the actual color value once resolved from the CSS variable
  const [resolvedColor, setResolvedColor] = useState(resolveCssColor(initialColor));

  // 💥 FIX: Initialize chartConfig using the resolved color
  const [chartConfig, setChartConfig] = useState({
    title: chartTitle,
    type: initialType,
    color: resolvedColor, 
  });
  
  // Effect to handle color changes if props were dynamic (good practice, though not strictly needed for constant props)
  useEffect(() => {
    setResolvedColor(resolveCssColor(initialColor));
    setChartConfig(prev => ({ ...prev, color: resolveCssColor(initialColor) }));
  }, [initialColor]);


  // Define Chart.js data object using props
  const data = {
    labels: xData,
    datasets: [
        {
            label: chartTitle, 
            // 💥 FIX: Use the resolved color from state for chart rendering
            data: yData,
            borderColor: chartConfig.color, 
            backgroundColor: chartConfig.color + '40', 
            fill: true,
            tension: 0.3,
        },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: chartTitle }, 
    },
    scales: { 
        x: {
            title: {
                display: true,
                text: xLabel, 
            },
        },
        y: { 
            beginAtZero: true,
            title: {
                display: true,
                text: yLabel, 
            },
        },
    },
  };

  const handleApplyChanges = (e) => {
      e.preventDefault();
      onToggle(e, null); 
  };
  
  const handleVariableChange = (e) => {
      const { value } = e.target;
      
      // Update config. In a real app, this would trigger a data refetch.
      setChartConfig(prev => ({
          ...prev,
          type: value,
          title: value, 
      }));
  };

  return (
    <div 
        className={`${styles.chartCard} ${styles.clickableCard}`} 
        onClick={(e) => onToggle(e, chartId)}
        title="Click anywhere on the card to change chart variables"
    >
      
      {/* Chart Header */}
      <h4 className={styles.cardHeader}>
        {chartTitle} Trend 
        <span className={styles.configIcon}>⚙️</span>
      </h4>
      
      {/* Chart Visualization */}
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>

      {/* Chart Settings Menu (Modal) */}
      {isMenuOpen && ( 
        <div 
          className={styles.settingsModalOverlay} 
          onClick={(e) => onToggle(e, null)}
        >
          <div className={styles.settingsMenu} onClick={(e) => e.stopPropagation()}> 
            <h4>Edit Chart Variables: {chartTitle}</h4>
            
            <form onSubmit={handleApplyChanges}>
                {/* Metric Selection */}
                <label>
                    Metric:
                    <select 
                        name="type" 
                        value={chartConfig.type} 
                        onChange={handleVariableChange}
                    >
                        {availableMetrics.map(metric => (
                            <option key={metric} value={metric}>{metric}</option>
                        ))}
                    </select>
                </label>
                
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.applyButton}>Apply Changes</button>
                    <button type="button" onClick={(e) => onToggle(e, null)} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default ChartCard;