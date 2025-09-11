// Citizen dashboard showing their reported issues
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dummyIssues } from '../../utils/dummyData';
import { STATUS_COLORS } from '../../utils/constants';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  MapPin, 
  Eye,
  Clock
} from 'lucide-react';
import Loader from '../../components/Loader';

const MyReports = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch user's issues
    const fetchUserIssues = async () => {
      setLoading(true);
      try {
        // In a real app, this would filter by user ID
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIssues(dummyIssues);
        setFilteredIssues(dummyIssues);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIssues();
  }, [user]);

  useEffect(() => {
    let filtered = issues;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    setFilteredIssues(filtered);
  }, [issues, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    const statusText = status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1);
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${STATUS_COLORS[status]}`}>
        {statusText}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <Loader size="large" text="Loading your reports..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
            <p className="mt-2 text-gray-600">
              Track and manage your reported issues
            </p>
          </div>
          <Link
            to="/citizen/report"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Report New Issue
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Reports', value: issues.length, color: 'bg-blue-500' },
            { label: 'Pending', value: issues.filter(i => ['submitted', 'acknowledged'].includes(i.status)).length, color: 'bg-yellow-500' },
            { label: 'In Progress', value: issues.filter(i => i.status === 'in_progress').length, color: 'bg-orange-500' },
            { label: 'Resolved', value: issues.filter(i => i.status === 'resolved').length, color: 'bg-green-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Issues List */}
        {filteredIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600 mb-6">
              {issues.length === 0 
                ? "You haven't reported any issues yet." 
                : "No issues match your current filters."
              }
            </p>
            {issues.length === 0 && (
              <Link
                to="/citizen/report"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Report Your First Issue
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                        {getStatusBadge(issue.status)}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(issue.reportedAt)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {issue.location.address}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {issue.category}
                        </div>
                      </div>
                    </div>
                    
                    {issue.photos && issue.photos.length > 0 && (
                      <div className="ml-6">
                        <img
                          src={issue.photos[0]}
                          alt="Issue"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {issue.assignedTo ? (
                        <span>Assigned to: <span className="font-medium">{issue.assignedTo}</span></span>
                      ) : (
                        <span>Not yet assigned</span>
                      )}
                    </div>
                    
                    <Link
                      to={`/citizen/track/${issue.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;