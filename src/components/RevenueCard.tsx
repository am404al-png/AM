import { DollarSign, TrendingUp } from 'lucide-react';

interface RevenueCardProps {
  revenue: number;
  onClick: () => void;
}

export const RevenueCard = ({ revenue, onClick }: RevenueCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-gray-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Influencer Revenue</h3>
            <p className="text-sm text-gray-500">Live</p>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-green-600" />
      </div>

      <div className="mb-2">
        <div className="text-4xl font-bold text-gray-900 animate-pulse">
          ${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Revenue generated from content creation, product reviews, and brand collaborations
      </p>
    </div>
  );
};
