import { ChartDataPoint } from '../types';

interface LineChartProps {
  data: ChartDataPoint[];
  color?: string;
}

export const LineChart = ({ data, color = '#3b82f6' }: LineChartProps) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  const width = 800;
  const height = 300;
  const padding = 40;

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
    return { x, y, ...point };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const areaPathData = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="relative">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const value = minValue + range * ratio;
          const y = height - padding - ratio * (height - 2 * padding);
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#9ca3af"
              >
                {value.toFixed(0)}
              </text>
            </g>
          );
        })}

        <path
          d={areaPathData}
          fill="url(#areaGradient)"
        />

        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke={color}
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            >
              <title>{`${point.time}: ${point.value.toFixed(2)} (${point.change > 0 ? '+' : ''}${point.change.toFixed(2)})`}</title>
            </circle>
          </g>
        ))}

        {[0, Math.floor(data.length / 4), Math.floor(data.length / 2), Math.floor(3 * data.length / 4), data.length - 1].map((i) => {
          if (i >= data.length) return null;
          const point = points[i];
          return (
            <text
              key={i}
              x={point.x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
            >
              {point.time}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
