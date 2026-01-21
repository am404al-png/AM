import { supabase } from './supabase';
import { PlatformMetric, ReviewPipelineItem, BrandPartnership, ActivityLog } from '../types';

export const fetchMetrics = async (): Promise<PlatformMetric[]> => {
  const { data, error } = await supabase
    .from('platform_metrics')
    .select('*');

  if (error) throw error;
  return data || [];
};

export const updateMetric = async (metricType: string, value: number): Promise<void> => {
  const { error } = await supabase
    .from('platform_metrics')
    .update({ current_value: value, updated_at: new Date().toISOString() })
    .eq('metric_type', metricType);

  if (error) throw error;
};

export const fetchReviewPipeline = async (): Promise<ReviewPipelineItem[]> => {
  const { data, error } = await supabase
    .from('review_pipeline')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateReviewItem = async (id: string, updates: Partial<ReviewPipelineItem>): Promise<void> => {
  const { error } = await supabase
    .from('review_pipeline')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};

export const fetchBrandPartnerships = async (): Promise<BrandPartnership[]> => {
  const { data, error } = await supabase
    .from('brand_partnerships')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const addActivityLog = async (message: string): Promise<void> => {
  const { error } = await supabase
    .from('activity_logs')
    .insert({ message });

  if (error) throw error;
};

export const fetchActivityLogs = async (limit: number = 50): Promise<ActivityLog[]> => {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

export const addAudienceMessage = async (message: string): Promise<void> => {
  const { error } = await supabase
    .from('audience_messages')
    .insert({ message });

  if (error) throw error;
};
