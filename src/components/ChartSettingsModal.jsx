import React, { useState, useEffect } from 'react';
import styles from '../pages/Dashboard.module.css';

// 💥 IMPORT: Fetch function from the API layer
import { fetchMetricTypes } from '../api/metrics';

/**
 * ChartSettingsModal
 * ------------------
 * Simple modal used to change a chart's metric/type. 
 */
function ChartSettingsModal({ initialConfig, onClose }) {
    
    // The modal manages its own state for the form inputs
    const [config, setConfig] = useState({
        title: initialConfig.chartTitle,
        // EDITED: initialType is the string representation of the index
        type: initialConfig.initialType, 
    });

    // EDITED: State for fetched metrics
    const [availableMetrics, setAvailableMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // EDITED: Effect to fetch metric types on component mount
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
                // Fallback list of names
                setAvailableMetrics(['Revenue', 'Users', 'Sessions', 'Alerts', 'Cost', 'Latency']); 
            });
        
        return () => { mounted = false; };
    }, []);


    const handleVariableChange = (e) => {
        const { value: selectedIndexString } = e.target;
        const selectedIndex = parseInt(selectedIndexString, 10);
        
        // Use the index to look up the actual metric name
        const newMetricName = availableMetrics[selectedIndex] || `Metric Index ${selectedIndex}`;

        setConfig(prev => ({
            ...prev,
            type: selectedIndexString, // Keep index as string for the select input
            // 💥 EDITED: Set title to the metric name
            title: newMetricName,      
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onClose(e, config); 
    };
    
    // Get the name of the currently selected metric for the modal header
    const currentMetricName = availableMetrics[parseInt(config.type, 10)] || initialConfig.chartTitle;

    return (
        // Modal overlay is fixed to viewport
        <div 
            className={styles.settingsModalOverlay} 
            // Close when clicking the backdrop
            onClick={(e) => onClose(e, null)} 
        >
            <div className={styles.settingsMenu} onClick={(e) => e.stopPropagation()}> 
                {/* 💥 EDITED: Show the currently selected metric name in the header */}
                <h4>Edit Chart Variables: {currentMetricName}</h4>
                
                <form onSubmit={handleSave}>
                    {/* Metric Selection */}
                    <label>
                        Metric:
                        <select 
                            name="type" 
                            value={config.type} 
                            onChange={handleVariableChange}
                            disabled={isLoading}
                        >
                            {/* Loading state options */}
                            {isLoading && <option value="-1">Loading metrics...</option>}
                            {!isLoading && availableMetrics.length === 0 && (
                                <option value="-1">No metrics available</option>
                            )}
                            
                            {/* Map over the fetched metric types, using index as value */}
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