import apiClient from './client';

export async function fetchMetricTypes() {
  const resp = await apiClient.get('/firebase/metrics/types');
  return resp.data.metric_types;
}

export async function getMetrics(params = {}) {
  const resp = await apiClient.get('/api/metricas', { params });
  return resp.data;
}