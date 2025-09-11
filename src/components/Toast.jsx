// Toast notification setup (using react-hot-toast)
import toast, { Toaster } from 'react-hot-toast';

// Custom toast configurations
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#3B82F6',
      color: '#fff',
    },
  });
};

// Toast container component
export const ToastContainer = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      duration: 4000,
      style: {
        background: '#fff',
        color: '#363636',
      },
      success: {
        duration: 3000,
        theme: {
          primary: '#10B981',
          secondary: '#fff',
        },
      },
      error: {
        duration: 4000,
        theme: {
          primary: '#EF4444',
          secondary: '#fff',
        },
      },
    }}
  />
);

export { toast };
export default Toaster;