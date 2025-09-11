// Loading spinner component
import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

// Full page loader
export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Loader size="large" text={text} />
  </div>
);

// Button loader
export const ButtonLoader = () => (
  <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
);

export default Loader;