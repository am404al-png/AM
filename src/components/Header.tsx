import { Activity, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [activeViewers, setActiveViewers] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => {
        const change = Math.floor(Math.random() * 10) - 4;
        return Math.max(50, Math.min(300, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Users className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Active Viewers</span>
          <span className="ml-1 text-sm font-bold text-green-600 animate-pulse">{activeViewers}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <Activity className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-gray-700">LIVE - Influencer Activity Mode</span>
        </div>
      </div>
    </header>
  );
};
