import { useState, useEffect, useCallback } from 'react';
import { MetricData } from '../types';
import { saveMetrics, loadMetrics } from '../lib/storage';
import { fetchMetrics, updateMetric, addActivityLog } from '../lib/database';

const INITIAL_METRICS: MetricData = {
  revenue: 1.0,
  linkedinFollowers: 7000,
  facebookFollowers: 5000,
  discordMembers: 50000,
  linkedinViews: 15000,
  discordActivity: 8000,
};

export const useLiveMetrics = () => {
  const [metrics, setMetrics] = useState<MetricData>(INITIAL_METRICS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialMetrics = async () => {
      try {
        const stored = loadMetrics();
        if (stored) {
          setMetrics(stored);
        } else {
          const dbMetrics = await fetchMetrics();
          const metricsData: MetricData = {
            revenue: dbMetrics.find(m => m.metric_type === 'revenue')?.current_value || 1.0,
            linkedinFollowers: dbMetrics.find(m => m.metric_type === 'linkedin_followers')?.current_value || 7000,
            facebookFollowers: dbMetrics.find(m => m.metric_type === 'facebook_followers')?.current_value || 5000,
            discordMembers: dbMetrics.find(m => m.metric_type === 'discord_members')?.current_value || 50000,
            linkedinViews: dbMetrics.find(m => m.metric_type === 'linkedin_views')?.current_value || 15000,
            discordActivity: dbMetrics.find(m => m.metric_type === 'discord_activity')?.current_value || 8000,
          };
          setMetrics(metricsData);
          saveMetrics(metricsData);
        }
      } catch (error) {
        console.error('Failed to load metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialMetrics();
  }, []);

  const updateMetrics = useCallback((updates: Partial<MetricData>) => {
    setMetrics(prev => {
      const newMetrics = { ...prev, ...updates };
      saveMetrics(newMetrics);
      return newMetrics;
    });
  }, []);

  const syncToDatabase = useCallback(async (metricType: string, value: number) => {
    try {
      await updateMetric(metricType, value);
    } catch (error) {
      console.error('Failed to sync metric to database:', error);
    }
  }, []);

  useEffect(() => {
    const revenueInterval = setInterval(() => {
      const random = Math.random();
      if (random > 0.15) {
        const increase = Math.random() * 0.05;
        setMetrics(prev => {
          const newRevenue = Math.min(prev.revenue + increase, 5000);
          const newMetrics = { ...prev, revenue: Number(newRevenue.toFixed(2)) };
          saveMetrics(newMetrics);
          syncToDatabase('revenue', newRevenue);

          if (Math.random() > 0.7) {
            addActivityLog('Revenue updated');
          }
          return newMetrics;
        });
      } else if (random < 0.05) {
        setMetrics(prev => {
          const newRevenue = Math.max(prev.revenue - Math.random() * 0.03, 1.0);
          const newMetrics = { ...prev, revenue: Number(newRevenue.toFixed(2)) };
          saveMetrics(newMetrics);
          return newMetrics;
        });
      }
    }, Math.random() * 7000 + 5000);

    const linkedinInterval = setInterval(() => {
      const random = Math.random();
      setMetrics(prev => {
        let change = 0;
        if (random > 0.2) {
          change = Math.random() > 0.5 ? 2 : 1;
        } else if (random < 0.05) {
          change = -1;
        }
        const newFollowers = Math.max(prev.linkedinFollowers + change, 7000);
        const newMetrics = { ...prev, linkedinFollowers: newFollowers };
        saveMetrics(newMetrics);

        if (change !== 0) {
          syncToDatabase('linkedin_followers', newFollowers);
          if (Math.random() > 0.6) {
            addActivityLog(`LinkedIn ${change > 0 ? 'followers increased' : 'followers fluctuated'}`);
          }
        }
        return newMetrics;
      });
    }, Math.random() * 10000 + 15000);

    const facebookInterval = setInterval(() => {
      const random = Math.random();
      setMetrics(prev => {
        let change = 0;
        if (random > 0.15) {
          change = Math.random() > 0.4 ? 2 : 1;
        } else if (random < 0.08) {
          change = -1;
        }
        const newFollowers = Math.max(prev.facebookFollowers + change, 5000);
        const newMetrics = { ...prev, facebookFollowers: newFollowers };
        saveMetrics(newMetrics);

        if (change !== 0) {
          syncToDatabase('facebook_followers', newFollowers);
        }
        return newMetrics;
      });
    }, Math.random() * 8000 + 12000);

    const discordInterval = setInterval(() => {
      const random = Math.random();
      setMetrics(prev => {
        let change = 0;
        if (random > 0.25) {
          change = Math.floor(Math.random() * 10) + 1;
          if (Math.random() > 0.7) {
            change += Math.floor(Math.random() * 5);
          }
        } else if (random < 0.1) {
          change = -Math.floor(Math.random() * 3) - 1;
        }
        const newMembers = Math.max(prev.discordMembers + change, 50000);
        const newMetrics = { ...prev, discordMembers: newMembers };
        saveMetrics(newMetrics);

        if (Math.abs(change) > 5) {
          syncToDatabase('discord_members', newMembers);
          addActivityLog('Discord activity spike detected');
        }
        return newMetrics;
      });
    }, Math.random() * 12000 + 18000);

    const viewsInterval = setInterval(() => {
      setMetrics(prev => {
        const linkedinChange = Math.floor(Math.random() * 20) - 5;
        const discordChange = Math.floor(Math.random() * 30) - 10;
        const newMetrics = {
          ...prev,
          linkedinViews: Math.max(prev.linkedinViews + linkedinChange, 15000),
          discordActivity: Math.max(prev.discordActivity + discordChange, 8000),
        };
        saveMetrics(newMetrics);

        if (Math.random() > 0.5) {
          syncToDatabase('linkedin_views', newMetrics.linkedinViews);
          addActivityLog('LinkedIn reach fluctuated');
        }
        return newMetrics;
      });
    }, Math.random() * 15000 + 20000);

    return () => {
      clearInterval(revenueInterval);
      clearInterval(linkedinInterval);
      clearInterval(facebookInterval);
      clearInterval(discordInterval);
      clearInterval(viewsInterval);
    };
  }, [syncToDatabase]);

  return { metrics, isLoading, updateMetrics };
};
