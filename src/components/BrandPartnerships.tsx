import { useEffect, useState } from 'react';
import { CheckCircle, Building2 } from 'lucide-react';
import { BrandPartnership } from '../types';
import { fetchBrandPartnerships } from '../lib/database';

export const BrandPartnerships = () => {
  const [partnerships, setPartnerships] = useState<BrandPartnership[]>([]);

  useEffect(() => {
    loadPartnerships();
  }, []);

  const loadPartnerships = async () => {
    try {
      const data = await fetchBrandPartnerships();
      setPartnerships(data);
    } catch (error) {
      console.error('Failed to load brand partnerships:', error);
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Reviews & Partnerships</h2>
        <p className="text-gray-600">Completed collaborations with leading brands</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {partnerships.map((partnership) => (
          <div
            key={partnership.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group relative overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 flex items-center justify-center mb-3 transition-all duration-300">
                {partnership.logo_url ? (
                  <img
                    src={partnership.logo_url}
                    alt={partnership.brand_name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-colors" />
                )}
              </div>

              <h3 className="font-semibold text-gray-900 text-sm text-center">{partnership.brand_name}</h3>

              {partnership.is_completed && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
