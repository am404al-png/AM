import { useEffect, useState } from 'react';
import { Briefcase, MessageSquare, MonitorPlay, Edit2 } from 'lucide-react';
import { ReviewPipelineItem } from '../types';
import { fetchReviewPipeline } from '../lib/database';

interface ReviewPipelineProps {
  isAdminMode: boolean;
  onEditItem: (item: ReviewPipelineItem) => void;
  onItemClick: (item: ReviewPipelineItem) => void;
}

export const ReviewPipeline = ({ isAdminMode, onEditItem, onItemClick }: ReviewPipelineProps) => {
  const [items, setItems] = useState<ReviewPipelineItem[]>([]);

  useEffect(() => {
    loadPipeline();
  }, []);

  const loadPipeline = async () => {
    try {
      const data = await fetchReviewPipeline();
      setItems(data);
    } catch (error) {
      console.error('Failed to load review pipeline:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Review':
        return <Briefcase className="w-5 h-5" />;
      case 'Interview':
        return <MessageSquare className="w-5 h-5" />;
      case 'Demo':
        return <MonitorPlay className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Reviews & Interviews</h2>
        <p className="text-gray-600">Live review pipeline updated during the event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-gray-300 relative group"
          >
            {isAdminMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditItem(item);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            )}

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                {item.logo_url ? (
                  <img src={item.logo_url} alt={item.company_name} className="w-12 h-12 object-contain" />
                ) : (
                  getTypeIcon(item.type)
                )}
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.company_name}</h3>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  {getTypeIcon(item.type)}
                  <span>{item.type}</span>
                </div>

                <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
