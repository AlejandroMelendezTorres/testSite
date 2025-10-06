import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import styles from '../pages/Dashboard.module.css';
import { fetchMetricTypes } from '../api/metrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const resolveCssColor = (cssVar) => {
    if (typeof document === 'undefined' || !cssVar.startsWith('var(')) {
        return cssVar;
    }
    const varName = cssVar.substring(4, cssVar.length - 1).trim();
    const resolved = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return resolved || cssVar; 
};

function ChartCard({ chartId, metricIndex, isLive, startDate, finishDate, chartColor, xData, yData, isMenuOpen, onToggle }) {
  
  const [metricTypes, setMetricTypes] = useState([]);
  const [resolvedChartColor, setResolvedChartColor] = useState(resolveCssColor(chartColor));

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
          setMetricTypes(['Revenue', 'Users', 'Sessions', 'Alerts', 'Cost']); 
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setResolvedChartColor(resolveCssColor(chartColor));
  }, [chartColor]);

  const currentMetricName = metricTypes[metricIndex] || `Metric Index ${metricIndex}`;
  const chartTitle = currentMetricName;
  const xLabel = "Timestamp";
  const yLabel = currentMetricName;

  const data = {
    labels: yData, 
    datasets: [
        {
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
      title: { display: true, text: chartTitle }, 
      subtitle: {
        display: !isLive,
        text: `Showing data from ${startDate} to ${finishDate}`,
        font: { size: 10, style: 'italic' },
        padding: { top: 0, bottom: 5 }
      }
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


  return (
    <div 
        className={`${styles.chartCard} ${styles.clickableCard} ${isMenuOpen ? styles.editing : ''}`} 
        onClick={(e) => onToggle(e, chartId)}
        title="Click anywhere on the card to change chart variables"
    >
      <h4 className={styles.cardHeader}>
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