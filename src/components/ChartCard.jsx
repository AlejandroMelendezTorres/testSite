import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../pages/Dashboard.module.css';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock options for the variables menu
const availableMetrics = ['Revenue', 'Users', 'Sessions', 'Alerts', 'Cost'];
const availablePeriods = ['Last 6 Months', 'Last 12 Months', 'Year-to-Date'];

/**
 * Generates mock data for a line chart.
 */
const generateChartData = (label, color) => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label,
      data: [
        Math.floor(Math.random() * 50) + 50, 
        Math.floor(Math.random() * 50) + 100, 
        Math.floor(Math.random() * 50) + 80, 
        Math.floor(Math.random() * 50) + 150, 
        Math.floor(Math.random() * 50) + 120, 
        Math.floor(Math.random() * 50) + 180, 
        Math.floor(Math.random() * 50) + 160
      ],
      borderColor: color, 
      backgroundColor: color + '40', 
      fill: true,
      tension: 0.3,
    },
  ],
});

/**
 * Component for a single Line Chart visualization with interactive settings.
 */
function ChartCard({ initialTitle, initialType, initialColor }) {
  const [chartConfig, setChartConfig] = useState({
    title: initialTitle,
    type: initialType,
    color: initialColor,
    period: availablePeriods[0],
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Generate data based on the current configuration
  const data = generateChartData(chartConfig.type, chartConfig.color);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // CRITICAL FIX: Allows chart to flex and ignore its aspect ratio
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: chartConfig.title },
    },
    scales: { y: { beginAtZero: true } },
  };

  const handleApplyChanges = (e) => {
      e.preventDefault();
      setIsMenuOpen(false);
  };
  
  const handleVariableChange = (e) => {
      const { name, value } = e.target;
      setChartConfig(prev => ({
          ...prev,
          [name]: value
      }));
  };

  return (
    <div 
        className={`${styles.chartCard} ${styles.clickableCard}`} 
        onClick={() => setIsMenuOpen(true)}
        title="Click anywhere on the card to change chart variables"
    >
      
      {/* Chart Header */}
      <h4 className={styles.cardHeader}>
        {chartConfig.title} Trend 
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
          onClick={(e) => {
            if (e.target.className.includes('settingsModalOverlay')) {
                setIsMenuOpen(false);
            }
          }}
        >
          <div className={styles.settingsMenu} onClick={(e) => e.stopPropagation()}>
            <h4>Edit Chart Variables: {chartConfig.title}</h4>
            
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
                
                {/* Period Selection */}
                <label>
                    Time Period:
                    <select 
                        name="period" 
                        value={chartConfig.period} 
                        onChange={handleVariableChange}
                    >
                        {availablePeriods.map(period => (
                            <option key={period} value={period}>{period}</option>
                        ))}
                    </select>
                </label>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.applyButton}>Apply Changes</button>
                    <button type="button" onClick={() => setIsMenuOpen(false)} className={styles.cancelButton}>
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