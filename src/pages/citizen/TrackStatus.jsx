// Track issue status with timeline
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyIssues } from '../../utils/dummyData';
import { STATUS_COLORS } from '../../utils/constants';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Map from '../../components/Map';
import Loader from '../../components/Loader';

const TrackStatus = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundIssue = dummyIssues.find(issue => issue.id === parseInt(id));
        setIssue(foundIssue);
      } catch (error) {
        console.error('Error fetching issue:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIssue();
    }
  }, [id]);

  const getStatusTimeline = (issue) => {
    const timeline = [
      {
        status: 'submitted',
        title: 'Issue Submitted',
        description: 'Your issue has been received and is in the queue for review',
        date: issue.reportedAt,
        completed: true
      },
      {
        status: 'acknowledged',
        title: 'Issue Acknowledged',
        description: 'The issue has been reviewed and acknowledged by the authorities',
        date: issue.status === 'submitted' ? null : issue.updatedAt,
        completed: ['acknowledged', 'in_progress', 'resolved'].includes(issue.status)
      },
      {
        status: 'in_progress',
        title: 'Work in Progress',
        description: 'The issue is being actively worked on by the assigned team',
        date: issue.status === 'in_progress' ? issue.updatedAt : null,
        completed: ['in_progress', 'resolved'].includes(issue.status)
      },
      {
        status: 'resolved',
        title: 'Issue Resolved',
        description: 'The issue has been successfully resolved',
        date: issue.status === 'resolved' ? issue.updatedAt : null,
        completed: issue.status === 'resolved'
      }
    ];

    return timeline;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (status === 'in_progress') {
      return <Clock className="w-6 h-6 text-orange-500" />;
    } else {
      return <AlertCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  if (loading) {
    return <Loader size="large" text="Loading issue details..." />;
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue Not Found</h2>
          <p className="text-gray-600 mb-4">The requested issue could not be found.</p>
          <Link
            to="/citizen/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const timeline = getStatusTimeline(issue);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/citizen/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to My Reports
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{issue.title}</h1>
            <p className="mt-1 text-gray-600">Issue #{issue.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Issue Details */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Current Status</h2>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-white ${STATUS_COLORS[issue.status]}`}>
                  {issue.status.replace('_', ' ').charAt(0).toUpperCase() + issue.status.replace('_', ' ').slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Reported: {formatDate(issue.reportedAt)}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    Assigned to: {issue.assignedTo || 'Not assigned yet'}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{issue.location.address}</span>
                </div>
              </div>
            </div>

            {/* Issue Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Issue Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Description</h3>
                  <p className="text-gray-600">{issue.description}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Category</h3>
                  <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {issue.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Priority</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm capitalize ${
                    issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                    issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Photos */}
            {issue.photos && issue.photos.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                <div className="grid grid-cols-2 gap-4">
                  {issue.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Issue photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(photo, '_blank')}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timeline and Map */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Status Timeline</h2>
              <div className="space-y-6">
                {timeline.map((step, index) => (
                  <div key={step.status} className="flex items-start">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status, step.completed)}
                    </div>
                    <div className={`ml-4 flex-1 ${index < timeline.length - 1 ? 'pb-6 border-l-2 border-gray-200 -mb-6 ml-7 pl-1' : ''}`}>
                      <div className="ml-3">
                        <h3 className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm mt-1 ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatDate(step.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <Map
                issues={[issue]}
                center={[issue.location.lat, issue.location.lng]}
                zoom={15}
                height="300px"
              />
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">{issue.location.address}</p>
                <p>Coordinates: {issue.location.lat.toFixed(6)}, {issue.location.lng.toFixed(6)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackStatus;