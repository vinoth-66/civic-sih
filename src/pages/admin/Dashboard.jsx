// Admin dashboard with issue management
import React, { useState, useEffect } from 'react';
import { dummyIssues } from '../../utils/dummyData';
import { STATUS_COLORS, ISSUE_CATEGORIES } from '../../utils/constants';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MapPin,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import Map from '../../components/Map';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    priority: 'all'
  });

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIssues(dummyIssues);
        setFilteredIssues(dummyIssues);
      } catch (error) {
        console.error('Error fetching issues:', error);
        toast.error('Failed to load issues');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = issues;

    if (filters.search) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(issue => issue.priority === filters.priority);
    }

    setFilteredIssues(filtered);
  }, [issues, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStatusUpdate = async (issueId, newStatus, assignedTo = null) => {
    try {
      const updatedIssues = issues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              status: newStatus, 
              updatedAt: new Date().toISOString(),
              assignedTo: assignedTo || issue.assignedTo
            }
          : issue
      );
      
      setIssues(updatedIssues);
      toast.success('Issue status updated successfully');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to update issue status');
    }
  };

  const getStatusBadge = (status) => {
    const statusText = status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1);
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${STATUS_COLORS[status]}`}>
        {statusText}
      </span>
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return <Loader size="large" text="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage and track civic issues across the city</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Issues', 
              value: issues.length, 
              icon: AlertTriangle,
              color: 'bg-blue-500' 
            },
            { 
              label: 'In Progress', 
              value: issues.filter(i => i.status === 'in_progress').length, 
              icon: Clock,
              color: 'bg-orange-500' 
            },
            { 
              label: 'Resolved Today', 
              value: issues.filter(i => i.status === 'resolved').length, 
              icon: CheckCircle,
              color: 'bg-green-500' 
            },
            { 
              label: 'High Priority', 
              value: issues.filter(i => i.priority === 'high').length, 
              icon: AlertTriangle,
              color: 'bg-red-500' 
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issues List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search issues..."
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {ISSUE_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Issues List */}
            <div className="space-y-4">
              {filteredIssues.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
                  <p className="text-gray-600">No issues match your current filters.</p>
                </div>
              ) : (
                filteredIssues.map((issue) => (
                  <div key={issue.id} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                          {getStatusBadge(issue.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{issue.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {issue.reportedBy}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(issue.reportedAt)}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {issue.location.address}
                          </div>
                        </div>
                        
                        {issue.assignedTo && (
                          <div className="mt-2 text-sm text-blue-600">
                            Assigned to: {issue.assignedTo}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedIssue(issue);
                            setShowModal(true);
                          }}
                          className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Manage
                        </button>
                        <button className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Issue Locations</h2>
            <Map
              issues={filteredIssues}
              center={[28.6139, 77.2090]}
              zoom={11}
              height="600px"
            />
          </div>
        </div>

        {/* Issue Management Modal */}
        {showModal && selectedIssue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Manage Issue</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedIssue.title}</h4>
                  <p className="text-sm text-gray-600">{selectedIssue.description}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <div className="space-y-2">
                    {['submitted', 'acknowledged', 'in_progress', 'resolved'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedIssue.id, status)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedIssue.status === status 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;