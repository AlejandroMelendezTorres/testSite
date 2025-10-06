import React, { useState, useEffect } from 'react';
import styles from '../pages/Dashboard.module.css';
import { fetchMetricTypes } from '../api/metrics';

function ChartSettingsModal({ initialConfig, onClose }) {
    
    const [config, setConfig] = useState({
        title: initialConfig.chartTitle,
        type: initialConfig.initialType, 
    });

    const [availableMetrics, setAvailableMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetchMetricTypes()
            .then(data => {
                if (!mounted) return;
                setAvailableMetrics(data);
                setIsLoading(false);
            })
            .catch(err => {
                if (!mounted) return;
                console.error('Failed to fetch metric types:', err);
                setIsLoading(false);
                setAvailableMetrics(['Revenue', 'Users', 'Sessions', 'Alerts', 'Cost', 'Latency']); 
            });
        
        return () => { mounted = false; };
    }, []);


    const handleVariableChange = (e) => {
        const { value: selectedIndexString } = e.target;
        const selectedIndex = parseInt(selectedIndexString, 10);
        
        const newMetricName = availableMetrics[selectedIndex] || `Metric Index ${selectedIndex}`;

        setConfig(prev => ({
            ...prev,
            type: selectedIndexString,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onClose(e, config); 
    };
    
    const currentMetricName = availableMetrics[parseInt(config.type, 10)] || initialConfig.chartTitle;

    return (
        <div 
            className={styles.settingsModalOverlay} 
            onClick={(e) => onClose(e, null)} 
        >
            <div className={styles.settingsMenu} onClick={(e) => e.stopPropagation()}> 
                <h4>Edit Chart Variables: {currentMetricName}</h4>
                
                <form onSubmit={handleSave}>
                    <label>
                        Metric:
                        <select 
                            name="type" 
                            value={config.type} 
                            onChange={handleVariableChange}
                            disabled={isLoading}
                        >
                            {isLoading && <option value="-1">Loading metrics...</option>}
                            {!isLoading && availableMetrics.length === 0 && (
                                <option value="-1">No metrics available</option>
                            )}
                            
                            {availableMetrics.map((metric, index) => (
                                <option key={index} value={String(index)}>{metric}</option>
                            ))}
                        </select>
                    </label>
                    
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.applyButton} disabled={isLoading || availableMetrics.length === 0}>Apply Changes</button>
                        <button type="button" onClick={(e) => onClose(e, null)} className={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChartSettingsModal;