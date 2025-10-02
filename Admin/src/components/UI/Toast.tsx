import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const bgColorClass = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];

  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 ${bgColorClass} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-[999]`}
    >
      <span className="text-xl">{icon}</span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-white hover:text-gray-100 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
