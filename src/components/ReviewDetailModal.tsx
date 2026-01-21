import { X, Calendar, TrendingUp } from 'lucide-react';
import { ReviewPipelineItem } from '../types';
import { LineChart } from './LineChart';
import { generateChartData } from '../lib/storage';

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ReviewPipelineItem | null;
}

export const ReviewDetailModal = ({ isOpen, onClose, item }: ReviewDetailModalProps) => {
  if (!isOpen || !item) return null;

  const engagementData = generateChartData(1000 + Math.random() * 5000, 15);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{item.company_name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            {item.logo_url && (
              <img
                src={item.logo_url}
                alt={item.company_name}
                className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-3"
              />
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {item.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'Confirmed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Added: {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Expected Engagement Curve
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <LineChart data={engagementData} color="#3b82f6" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Expected Reach</p>
              <p className="text-2xl font-bold text-gray-900">
                {(Math.random() * 20000 + 10000).toFixed(0)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Estimated Engagement</p>
              <p className="text-2xl font-bold text-gray-900">
                {(Math.random() * 15 + 5).toFixed(1)}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Priority Level</p>
              <p className="text-2xl font-bold text-gray-900">
                {item.status === 'Confirmed' ? 'High' : item.status === 'Completed' ? 'Done' : 'Medium'}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Review Details</h4>
            <p className="text-gray-700 text-sm">
              This {item.type.toLowerCase()} with {item.company_name} is currently {item.status.toLowerCase()}.
              {item.status === 'Confirmed' && ' The content is scheduled and ready for production.'}
              {item.status === 'Pending' && ' Awaiting confirmation from the brand team.'}
              {item.status === 'Completed' && ' This content has been published and is live.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
