// Analytics page with charts and statistics
import React, { useState, useEffect } from 'react';
import { dummyAnalytics } from '../../utils/dummyData';
import { 
  SummaryCards, 
  CategoryChart, 
  TrendChart, 
  StatusDistributionChart 
} from '../../components/Charts';
import { 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAnalyticsData(dummyAnalytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  const handleExportReport = () => {
    // Simulate report generation
    toast.success('Analytics report exported successfully!');
  };

  const calculateResolutionRate = () => {
    if (!analyticsData) return 0;
    return ((analyticsData.resolvedIssues / analyticsData.totalIssues) * 100).toFixed(1);
  };

  const getEfficiencyTrend = () => {
    // Mock calculation for demonstration
    const currentRate = parseFloat(calculateResolutionRate());
    const previousRate = 68.5; // Mock previous period rate
    
    return {
      value: (currentRate - previousRate).toFixed(1),
      isPositive: currentRate > previousRate
    };
  };

  if (loading) {
    return <Loader size="large" text="Loading analytics..." />;
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Analytics</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const statusDistribution = [
    { name: 'Submitted', value: 30, color: '#3B82F6' },
    { name: 'Acknowledged', value: 25, color: '#F59E0B' },
    { name: 'In Progress', value: 15, color: '#F97316' },
    { name: 'Resolved', value: 180, color: '#10B981' },
    { name: 'Rejected', value: 5, color: '#EF4444' }
  ];

  const efficiencyTrend = getEfficiencyTrend();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-600">Insights and performance metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Date Range Selector */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportReport}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <SummaryCards analytics={analyticsData} />

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-bold text-gray-900">{calculateResolutionRate()}%</p>
              </div>
              <div className={`flex items-center text-sm ${efficiencyTrend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {efficiencyTrend.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(efficiencyTrend.value)}%
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3 days</p>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                0.5 days
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Citizen Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">4.2/5</p>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                0.3 pts
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Issue Status Distribution */}
          <StatusDistributionChart data={statusDistribution} />

          {/* Category Breakdown */}
          <CategoryChart data={analyticsData.categoryBreakdown} />
        </div>

        {/* Monthly Trends */}
        <div className="mb-8">
          <TrendChart data={analyticsData.monthlyData} />
        </div>

        {/* Detailed Metrics Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Metrics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Resolution Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.categoryBreakdown.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(category.value * 0.75)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(Math.random() * 5 + 2).toFixed(1)} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {(75 + Math.random() * 20).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;