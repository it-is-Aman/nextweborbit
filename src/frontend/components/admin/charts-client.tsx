'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  name: string;
  views: number;
  visits: number;
  [key: string]: string | number;
}

export function TrafficChart({ data }: { data: ChartData[] }) {
  return (
    <div className="w-full h-[300px] min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
            name="Page Views"
          />
          <Area
            type="monotone"
            dataKey="visits"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.2}
            name="Unique Visitors"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
