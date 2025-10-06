import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import styles from '../pages/Dashboard.module.css';
// 💥 NEW IMPORT
import { fetchMetricTypes } from '../api/metrics';

// Register necessary Chart.js components and plugins (including Filler for area fills)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

/**
 * Helper function to resolve a CSS variable to its actual computed color value.
 */
const resolveCssColor = (cssVar) => {
    if (typeof document === 'undefined' || !cssVar.startsWith('var(')) {
        return cssVar;
    }
    const varName = cssVar.substring(4, cssVar.length - 1).trim();
    const resolved = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return resolved || cssVar; 
};


/**
 * ChartCard
 * ---------
 * Renders a single line chart inside a styled card. Now dynamically sets
 * title and labels based on the passed metric index and fetched types.
 */
function ChartCard({ chartId, metricIndex, isLive, startDate, finishDate, chartColor, xData, yData, isMenuOpen, onToggle }) {
  
  // 💥 NEW STATE: To hold the fetched list of available metric types
  const [metricTypes, setMetricTypes] = useState([]);
  const [resolvedChartColor, setResolvedChartColor] = useState(resolveCssColor(chartColor));

  // 💥 NEW EFFECT: Fetch metric types once to map index to name
  useEffect(() => {
    let mounted = true;
    fetchMetricTypes()
      .then(data => {
          if (!mounted) return;
          setMetricTypes(data);
      })
      .catch(err => {
          if (!mounted) return;
          console.error('Failed to fetch metric types in ChartCard:', err);
          // Fallback list
          setMetricTypes(['Revenue', 'Users', 'Sessions', 'Alerts', 'Cost']); 
      });
    return () => { mounted = false; };
  }, []); // Run once on mount


  // Resolve the CSS color variable
  useEffect(() => {
    setResolvedChartColor(resolveCssColor(chartColor));
  }, [chartColor]);

  // 💥 NEW LOGIC: Derive names based on the index and fetched list
  const currentMetricName = metricTypes[metricIndex] || `Metric Index ${metricIndex}`;
  const chartTitle = currentMetricName;
  const xLabel = "Timestamp";
  const yLabel = currentMetricName;


  // Define Chart.js data object using props
  const data = {
    labels: yData, 
    datasets: [
        {
            // 💥 EDITED: Legend is the metric name
            label: currentMetricName, 
            data: xData, 
            borderColor: resolvedChartColor, 
            backgroundColor: resolvedChartColor + '40', 
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
      // 💥 EDITED: Title is the metric name
      title: { display: true, text: chartTitle }, 
      subtitle: {
        display: !isLive, // Show subtitle if not live mode
        text: `Showing data from ${startDate} to ${finishDate}`,
        font: { size: 10, style: 'italic' },
        padding: { top: 0, bottom: 5 }
      }
    },
    scales: { 
        x: {
            title: {
                display: true,
                // 💥 EDITED: X label is fixed to Timestamp
                text: xLabel, 
            },
        },
        y: { 
            beginAtZero: true,
            title: {
                display: true,
                // 💥 EDITED: Y label is the metric name
                text: yLabel, 
            },
        },
    },
  };


  return (
    <div 
        className={`${styles.chartCard} ${styles.clickableCard} ${isMenuOpen ? styles.editing : ''}`} 
        onClick={(e) => onToggle(e, chartId)}
        title="Click anywhere on the card to change chart variables"
    >
      {/* Card header: title and configuration icon */}
      <h4 className={styles.cardHeader}>
        {/* 💥 EDITED: Title is the metric name */}
        {chartTitle}
        <span className={styles.configIcon}>⚙️</span>
      </h4>
      
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
      
    </div>
  );
}

export default ChartCard;