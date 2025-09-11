// Interactive map component using Leaflet
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different issue statuses
const createCustomIcon = (color) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color};" class="w-4 h-4 rounded-full border-2 border-white shadow-lg"></div>`,
    className: 'custom-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

const statusIcons = {
  submitted: createCustomIcon('#3B82F6'),
  acknowledged: createCustomIcon('#F59E0B'),
  in_progress: createCustomIcon('#F97316'),
  resolved: createCustomIcon('#10B981'),
  rejected: createCustomIcon('#EF4444')
};

// Component to handle map events
const MapEvents = ({ onLocationSelect }) => {
  const map = useMap();
  
  useEffect(() => {
    const handleClick = (e) => {
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    };

    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onLocationSelect]);

  return null;
};

// Main map component
const Map = ({ 
  issues = [], 
  center = [28.6139, 77.2090], 
  zoom = 13, 
  height = '400px',
  onLocationSelect,
  selectedLocation
}) => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map click events */}
        <MapEvents onLocationSelect={onLocationSelect} />
        
        {/* Issue markers */}
        {issues.map((issue) => (
          <Marker 
            key={issue.id}
            position={[issue.location.lat, issue.location.lng]}
            icon={statusIcons[issue.status] || statusIcons.submitted}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded">{issue.category}</span>
                  <span className={`px-2 py-1 rounded text-white capitalize ${
                    issue.status === 'resolved' ? 'bg-green-500' :
                    issue.status === 'in_progress' ? 'bg-orange-500' :
                    issue.status === 'acknowledged' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}>
                    {issue.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Reported: {new Date(issue.reportedAt).toLocaleDateString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Selected location marker */}
        {selectedLocation && (
          <Marker 
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={createCustomIcon('#EF4444')}
          >
            <Popup>
              <div className="p-2">
                <p className="text-sm font-medium">Selected Location</p>
                <p className="text-xs text-gray-600">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;