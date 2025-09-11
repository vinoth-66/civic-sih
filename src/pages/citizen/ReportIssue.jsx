// Report new civic issue page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISSUE_CATEGORIES } from '../../utils/constants';
import { MapPin, Camera, Upload, Loader } from 'lucide-react';
import Map from '../../components/Map';
import toast from 'react-hot-toast';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    photos: []
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!selectedLocation) {
      toast.error('Please select a location on the map or use current location');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newIssue = {
        id: Date.now(),
        ...formData,
        location: selectedLocation,
        reportedAt: new Date().toISOString(),
        status: 'submitted'
      };

      console.log('New issue reported:', newIssue);
      toast.success('Issue reported successfully!');
      navigate('/citizen/dashboard');
    } catch (error) {
      toast.error('Failed to submit issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload files to a server
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files.map(file => URL.createObjectURL(file))]
    });
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location'
          });
          toast.success('Location detected successfully!');
          setGettingLocation(false);
        },
        (error) => {
          toast.error('Failed to get current location');
          setGettingLocation(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser');
      setGettingLocation(false);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      photos: newPhotos
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
          <p className="mt-2 text-gray-600">
            Help improve your community by reporting civic issues
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Issue Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Issue Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                      placeholder="Brief description of the issue"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {ISSUE_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Detailed Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                      placeholder="Provide detailed information about the issue..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photos (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          multiple 
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Photo Preview */}
                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={gettingLocation}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {gettingLocation ? (
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4 mr-2" />
                    )}
                    Use Current Location
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    Or click on the map to select location
                  </p>

                  <Map
                    center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [28.6139, 77.2090]}
                    zoom={13}
                    height="400px"
                    onLocationSelect={setSelectedLocation}
                    selectedLocation={selectedLocation}
                  />

                  {selectedLocation && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">
                        <strong>Selected Location:</strong><br />
                        Lat: {selectedLocation.lat.toFixed(6)}<br />
                        Lng: {selectedLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/citizen/dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Issue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;