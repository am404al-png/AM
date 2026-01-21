import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ReviewPipelineItem } from '../types';
import { updateReviewItem } from '../lib/database';

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ReviewPipelineItem | null;
  onSave: () => void;
}

export const EditReviewModal = ({ isOpen, onClose, item, onSave }: EditReviewModalProps) => {
  const [companyName, setCompanyName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [type, setType] = useState<'Review' | 'Interview' | 'Demo'>('Review');
  const [status, setStatus] = useState<'Pending' | 'Confirmed' | 'Completed'>('Pending');

  useEffect(() => {
    if (item) {
      setCompanyName(item.company_name);
      setLogoUrl(item.logo_url || '');
      setType(item.type);
      setStatus(item.status);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSave = async () => {
    try {
      await updateReviewItem(item.id, {
        company_name: companyName,
        logo_url: logoUrl,
        type,
        status,
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to update review item:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Edit Review Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'Review' | 'Interview' | 'Demo')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Review">Review</option>
              <option value="Interview">Interview</option>
              <option value="Demo">Demo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Pending' | 'Confirmed' | 'Completed')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
