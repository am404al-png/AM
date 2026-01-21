import { X } from 'lucide-react';
import { LineChart } from './LineChart';
import { ChartDataPoint } from '../types';

interface AnalyticsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: ChartDataPoint[];
  color?: string;
}

export const AnalyticsOverlay = ({ isOpen, onClose, title, data, color }: AnalyticsOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Over Time</h3>
            <LineChart data={data} color={color} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.length > 0 ? data[data.length - 1].value.toFixed(2) : '0'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Peak Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.length > 0 ? Math.max(...data.map(d => d.value)).toFixed(2) : '0'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Average Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.length > 0
                  ? (data.reduce((sum, d) => sum + d.change, 0) / data.length).toFixed(2)
                  : '0'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {data.slice(-10).reverse().map((point, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{point.time}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">{point.value.toFixed(2)}</span>
                    <span className={`text-sm ${point.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {point.change >= 0 ? '+' : ''}{point.change.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
