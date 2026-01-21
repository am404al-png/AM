import { MetricData } from '../types';

const STORAGE_KEY = 'influencer_platform_metrics';

export const saveMetrics = (metrics: MetricData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  } catch (error) {
    console.error('Failed to save metrics to localStorage:', error);
  }
};

export const loadMetrics = (): MetricData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load metrics from localStorage:', error);
    return null;
  }
};

export const generateChartData = (currentValue: number, count: number = 20): Array<{ time: string; value: number; change: number }> => {
  const data = [];
  let value = currentValue * 0.7;
  const now = Date.now();

  for (let i = count - 1; i >= 0; i--) {
    const change = (Math.random() - 0.4) * (value * 0.05);
    value += change;
    value = Math.max(0, value);

    const time = new Date(now - i * 60000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    data.push({
      time,
      value: Number(value.toFixed(2)),
      change: Number(change.toFixed(2))
    });
  }

  return data;
};
