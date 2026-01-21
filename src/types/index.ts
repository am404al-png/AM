export interface PlatformMetric {
  id: string;
  metric_type: string;
  current_value: number;
  updated_at: string;
}

export interface ReviewPipelineItem {
  id: string;
  company_name: string;
  logo_url: string;
  type: 'Review' | 'Interview' | 'Demo';
  status: 'Pending' | 'Confirmed' | 'Completed';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface BrandPartnership {
  id: string;
  brand_name: string;
  logo_url: string;
  is_completed: boolean;
  order_index: number;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  message: string;
  created_at: string;
}

export interface AudienceMessage {
  id: string;
  message: string;
  created_at: string;
}

export interface MetricData {
  revenue: number;
  linkedinFollowers: number;
  facebookFollowers: number;
  discordMembers: number;
  linkedinViews: number;
  discordActivity: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  change: number;
}
