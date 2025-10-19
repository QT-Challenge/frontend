'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { User } from '@/types/user';

interface UserChartProps {
  users: User[];
}

export default function UserChart({ users }: UserChartProps) {
  const chartData = useMemo(() => {
    // Get the last 7 days
    const days = 7;
    const now = new Date();
    const data: { date: string; users: number; fullDate: string }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      // Count users created on this date
      const count = users.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return createdAt >= date && createdAt < nextDate;
      }).length;

      const monthDay = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      const fullDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      data.push({
        date: monthDay,
        users: count,
        fullDate,
      });
    }

    return data;
  }, [users]);

  const totalInPeriod = chartData.reduce((sum, day) => sum + day.users, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Users Created (Last 7 Days)</h2>
        <p className="text-sm text-gray-600 mt-1">
          Total: <span className="font-medium text-gray-900">{totalInPeriod}</span> users created in
          this period
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            labelStyle={{ color: '#111827', fontWeight: 600, marginBottom: '4px' }}
            formatter={(value: number) => [value, 'Users']}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullDate;
              }
              return label;
            }}
          />
          <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
