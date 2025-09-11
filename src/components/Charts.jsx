// Chart components using Recharts
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

// Issue Status Distribution Pie Chart
export const StatusDistributionChart = ({ data }) => {
  const COLORS = ['#3B82F6', '#F59E0B', '#F97316', '#10B981', '#EF4444'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Issue Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Category Breakdown Bar Chart
export const CategoryChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Issues by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Monthly Trends Line Chart
export const TrendChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Monthly Issue Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="reported" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Reported"
          />
          <Line 
            type="monotone" 
            dataKey="resolved" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Resolved"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Analytics Dashboard Summary Cards
export const SummaryCards = ({ analytics }) => {
  const cards = [
    {
      title: 'Total Issues',
      value: analytics.totalIssues,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Resolved Issues',
      value: analytics.resolvedIssues,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Issues',
      value: analytics.pendingIssues,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'Avg. Resolution Time',
      value: `${analytics.avgResolutionTime} days`,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
              <div className="w-6 h-6 bg-white rounded opacity-80"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};