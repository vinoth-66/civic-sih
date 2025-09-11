// Dummy data for the Civic Issue Reporting System
import { ISSUE_STATUS, ISSUE_CATEGORIES } from './constants';

export const dummyIssues = [
  {
    id: 1,
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues near the city center',
    category: 'Road & Infrastructure',
    status: ISSUE_STATUS.IN_PROGRESS,
    location: { lat: 28.6139, lng: 77.2090, address: 'Main Street, New Delhi' },
    reportedBy: 'John Doe',
    reportedAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    assignedTo: 'Road Maintenance Team',
    priority: 'high',
    photos: ['https://images.pexels.com/photos/163016/highway-the-band-road-street-163016.jpeg']
  },
  {
    id: 2,
    title: 'Street Light Not Working',
    description: 'Street light has been out for 3 days on Oak Avenue',
    category: 'Electricity',
    status: ISSUE_STATUS.ACKNOWLEDGED,
    location: { lat: 28.6129, lng: 77.2295, address: 'Oak Avenue, New Delhi' },
    reportedBy: 'Jane Smith',
    reportedAt: '2024-01-14T18:45:00Z',
    updatedAt: '2024-01-15T09:10:00Z',
    assignedTo: 'Electrical Department',
    priority: 'medium',
    photos: ['https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg']
  },
  {
    id: 3,
    title: 'Water Leak in Park',
    description: 'Major water pipe leak in Central Park causing flooding',
    category: 'Water Supply',
    status: ISSUE_STATUS.RESOLVED,
    location: { lat: 28.6219, lng: 77.2085, address: 'Central Park, New Delhi' },
    reportedBy: 'Mike Johnson',
    reportedAt: '2024-01-12T08:20:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    assignedTo: 'Water Department',
    priority: 'high',
    photos: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg']
  },
  {
    id: 4,
    title: 'Garbage Collection Missed',
    description: 'Garbage has not been collected for 5 days in Residential Area',
    category: 'Waste Management',
    status: ISSUE_STATUS.SUBMITTED,
    location: { lat: 28.6339, lng: 77.2190, address: 'Residential Area, New Delhi' },
    reportedBy: 'Sarah Wilson',
    reportedAt: '2024-01-16T07:15:00Z',
    updatedAt: '2024-01-16T07:15:00Z',
    assignedTo: null,
    priority: 'medium',
    photos: ['https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg']
  },
  {
    id: 5,
    title: 'Traffic Signal Malfunction',
    description: 'Traffic light stuck on red at busy intersection',
    category: 'Transportation',
    status: ISSUE_STATUS.IN_PROGRESS,
    location: { lat: 28.6289, lng: 77.2065, address: 'Mall Road Intersection, New Delhi' },
    reportedBy: 'David Brown',
    reportedAt: '2024-01-15T16:00:00Z',
    updatedAt: '2024-01-16T12:45:00Z',
    assignedTo: 'Traffic Control Unit',
    priority: 'high',
    photos: ['https://images.pexels.com/photos/280193/pexels-photo-280193.jpeg']
  }
];

export const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'citizen',
    phone: '+91-9876543210',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@city.gov',
    role: 'admin',
    phone: '+91-9876543211',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const dummyAnalytics = {
  totalIssues: 250,
  resolvedIssues: 180,
  pendingIssues: 70,
  avgResolutionTime: 4.2,
  categoryBreakdown: [
    { name: 'Road & Infrastructure', value: 45, color: '#8884d8' },
    { name: 'Water Supply', value: 35, color: '#82ca9d' },
    { name: 'Electricity', value: 30, color: '#ffc658' },
    { name: 'Waste Management', value: 25, color: '#ff7c7c' },
    { name: 'Transportation', value: 20, color: '#8dd1e1' },
    { name: 'Other', value: 95, color: '#d084d0' }
  ],
  monthlyData: [
    { month: 'Jan', reported: 45, resolved: 38 },
    { month: 'Feb', reported: 52, resolved: 41 },
    { month: 'Mar', reported: 38, resolved: 35 },
    { month: 'Apr', reported: 41, resolved: 39 },
    { month: 'May', reported: 35, resolved: 42 },
    { month: 'Jun', reported: 39, resolved: 35 }
  ]
};