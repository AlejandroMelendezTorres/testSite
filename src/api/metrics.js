import apiClient from './client';

export async function fetchMetricTypes() {
  const resp = await apiClient.get('/firebase/metrics/types');
  // Extract the metric_types array from the response object
  return resp.data.metric_types;
}

/**
 * Generic helper to fetch server metrics (placeholder for later)
 */
export async function getMetrics(params = {}) {
  const resp = await apiClient.get('/api/metricas', { params });
  return resp.data;
}