import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractionPoint {
  id: number;
  lat: number;
  lng: number;
  platform: 'linkedin' | 'facebook' | 'discord';
  intensity: number;
}

const platformColors = {
  linkedin: '#0A66C2',
  facebook: '#1877F2',
  discord: '#5865F2'
};

export const WorldMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<InteractionPoint[]>([]);

  useEffect(() => {
    const initialPoints: InteractionPoint[] = [
      { id: 1, lat: 30.0444, lng: 31.2357, platform: 'linkedin', intensity: 0.8 },
      { id: 2, lat: 51.5074, lng: -0.1278, platform: 'facebook', intensity: 0.6 },
      { id: 3, lat: 40.7128, lng: -74.0060, platform: 'discord', intensity: 0.9 },
      { id: 4, lat: 35.6762, lng: 139.6503, platform: 'linkedin', intensity: 0.5 },
      { id: 5, lat: 48.8566, lng: 2.3522, platform: 'facebook', intensity: 0.7 },
      { id: 6, lat: -33.8688, lng: 151.2093, platform: 'discord', intensity: 0.4 },
      { id: 7, lat: 55.7558, lng: 37.6173, platform: 'linkedin', intensity: 0.75 },
      { id: 8, lat: 1.3521, lng: 103.8198, platform: 'discord', intensity: 0.65 },
      { id: 9, lat: 25.2048, lng: 55.2708, platform: 'facebook', intensity: 0.85 },
      { id: 10, lat: -23.5505, lng: -46.6333, platform: 'linkedin', intensity: 0.55 },
    ];
    setPoints(initialPoints);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || points.length === 0) return;

    const markers: L.Circle[] = [];

    points.forEach((point) => {
      const color = platformColors[point.platform];

      const pulsingCircle = L.circle([point.lat, point.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.4 + point.intensity * 0.4,
        radius: 200000 * point.intensity,
        weight: 2,
      }).addTo(mapRef.current!);

      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 6,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="text-align: center; font-family: sans-serif;">
          <strong style="color: ${color};">${point.platform.toUpperCase()}</strong><br/>
          <span style="font-size: 12px;">Engagement: ${(point.intensity * 100).toFixed(0)}%</span>
        </div>
      `);

      markers.push(pulsingCircle);
      markers.push(marker as any);
    });

    const interval = setInterval(() => {
      setPoints(prev =>
        prev.map(point => ({
          ...point,
          intensity: Math.max(0.3, Math.min(1, point.intensity + (Math.random() - 0.5) * 0.15))
        }))
      );
    }, 4000);

    return () => {
      clearInterval(interval);
      markers.forEach(m => m.remove());
    };
  }, [points]);

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Audience Interactions</h2>
        <p className="text-gray-600">Real-time engagement across regions - Interactive Map</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div
          ref={mapContainerRef}
          className="w-full h-[500px] rounded-lg overflow-hidden"
          style={{ zIndex: 1 }}
        />

        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900">{points.length}</p>
            </div>
            <p className="text-sm text-gray-600">Active Regions</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platformColors.linkedin }}></div>
              <p className="text-2xl font-bold text-gray-900">
                {points.filter(p => p.platform === 'linkedin').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">LinkedIn</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platformColors.facebook }}></div>
              <p className="text-2xl font-bold text-gray-900">
                {points.filter(p => p.platform === 'facebook').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Facebook</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platformColors.discord }}></div>
              <p className="text-2xl font-bold text-gray-900">
                {points.filter(p => p.platform === 'discord').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Discord</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Click on map markers to see platform details • Zoom and pan to explore global engagement
          </p>
        </div>
      </div>
    </div>
  );
};
