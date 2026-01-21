import { useEffect, useState } from 'react';
import { fetchActivityLogs } from '../lib/database';
import { ActivityLog } from '../types';

export const ActivityTicker = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const logs = await fetchActivityLogs(20);
        setActivities(logs);
      } catch (error) {
        console.error('Failed to load activity logs:', error);
      }
    };

    loadActivities();
    const interval = setInterval(loadActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  const defaultMessages = [
    'New followers detected',
    'Revenue updated',
    'LinkedIn reach fluctuated',
    'Discord activity spike',
    'Review pipeline updated',
    'Engagement metrics refreshed',
    'Platform analytics synchronized',
  ];

  const displayMessages = activities.length > 0
    ? activities.map(a => a.message)
    : defaultMessages;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 overflow-hidden border-t border-gray-700">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...displayMessages, ...displayMessages, ...displayMessages].map((message, index) => (
          <span key={index} className="inline-flex items-center mx-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            {message}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
