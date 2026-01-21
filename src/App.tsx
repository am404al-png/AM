import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorldMap } from './components/WorldMap';
import { RevenueCard } from './components/RevenueCard';
import { AudienceCard } from './components/AudienceCard';
import { ReviewPipeline } from './components/ReviewPipeline';
import { BrandPartnerships } from './components/BrandPartnerships';
import { ActivityTicker } from './components/ActivityTicker';
import { AnalyticsOverlay } from './components/AnalyticsOverlay';
import { EditReviewModal } from './components/EditReviewModal';
import { ReviewDetailModal } from './components/ReviewDetailModal';
import { AudienceMessageModal } from './components/AudienceMessageModal';
import { useLiveMetrics } from './hooks/useLiveMetrics';
import { generateChartData } from './lib/storage';
import { ReviewPipelineItem } from './types';
import 'leaflet/dist/leaflet.css';

function App() {
  const { metrics, isLoading } = useLiveMetrics();
  const [analyticsView, setAnalyticsView] = useState<{
    isOpen: boolean;
    title: string;
    data: any[];
    color?: string;
  }>({ isOpen: false, title: '', data: [], color: '#3b82f6' });

  const [editReviewModal, setEditReviewModal] = useState<{
    isOpen: boolean;
    item: ReviewPipelineItem | null;
  }>({ isOpen: false, item: null });

  const [reviewDetailModal, setReviewDetailModal] = useState<{
    isOpen: boolean;
    item: ReviewPipelineItem | null;
  }>({ isOpen: false, item: null });

  const [audienceMessageModal, setAudienceMessageModal] = useState(false);
  const [isAdminMode] = useState(false);

  const openAnalytics = (title: string, currentValue: number, color?: string) => {
    setAnalyticsView({
      isOpen: true,
      title,
      data: generateChartData(currentValue, 30),
      color: color || '#3b82f6'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading platform data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Hero />

        <WorldMap />

        <div className="mb-12">
          <RevenueCard
            revenue={metrics.revenue}
            onClick={() => openAnalytics('Influencer Revenue Analytics', metrics.revenue, '#10b981')}
          />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AudienceCard
              platform="LinkedIn"
              count={metrics.linkedinFollowers}
              subtitle="Professional Network"
              icon="linkedin"
              views={metrics.linkedinViews}
              onClick={() => openAnalytics('LinkedIn Followers', metrics.linkedinFollowers, '#0A66C2')}
            />
            <AudienceCard
              platform="Facebook"
              count={metrics.facebookFollowers}
              subtitle="Social Media"
              icon="facebook"
              onClick={() => openAnalytics('Facebook Followers', metrics.facebookFollowers, '#1877F2')}
            />
            <AudienceCard
              platform="Discord"
              count={metrics.discordMembers}
              subtitle="Community Hub"
              icon="discord"
              views={metrics.discordActivity}
              onClick={() => openAnalytics('Discord Members', metrics.discordMembers, '#5865F2')}
            />
          </div>
        </div>

        <ReviewPipeline
          isAdminMode={isAdminMode}
          onEditItem={(item) => setEditReviewModal({ isOpen: true, item })}
          onItemClick={(item) => setReviewDetailModal({ isOpen: true, item })}
        />

        <BrandPartnerships />
      </main>

      <ActivityTicker />

      <AnalyticsOverlay
        isOpen={analyticsView.isOpen}
        onClose={() => setAnalyticsView({ ...analyticsView, isOpen: false })}
        title={analyticsView.title}
        data={analyticsView.data}
        color={analyticsView.color}
      />

      <EditReviewModal
        isOpen={editReviewModal.isOpen}
        onClose={() => setEditReviewModal({ isOpen: false, item: null })}
        item={editReviewModal.item}
        onSave={() => {
          setEditReviewModal({ isOpen: false, item: null });
        }}
      />

      <ReviewDetailModal
        isOpen={reviewDetailModal.isOpen}
        onClose={() => setReviewDetailModal({ isOpen: false, item: null })}
        item={reviewDetailModal.item}
      />

      <AudienceMessageModal
        isOpen={audienceMessageModal}
        onClose={() => setAudienceMessageModal(false)}
      />
    </div>
  );
}

export default App;
