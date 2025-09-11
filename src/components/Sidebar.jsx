// Admin sidebar component for navigation
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  FileText, 
  Users, 
  Settings,
  MapPin 
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const sidebarLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/issues', label: 'All Issues', icon: FileText },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">CivicAdmin</span>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
          <div className="text-sm text-gray-400 text-center">
            Admin Portal v1.0
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;