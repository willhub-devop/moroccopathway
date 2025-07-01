import React, { useState, useEffect } from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  showZero = false, 
  variant = 'primary',
  size = 'md',
  position = 'top-right',
  children,
  className = ''
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const shouldShow = count > 0 || showZero;
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'min-w-[16px] h-4 text-xs px-1';
      case 'md':
        return 'min-w-[20px] h-5 text-xs px-1.5';
      case 'lg':
        return 'min-w-[24px] h-6 text-sm px-2';
      default:
        return 'min-w-[20px] h-5 text-xs px-1.5';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return '-top-1 -left-1';
      case 'top-right':
        return '-top-1 -right-1';
      case 'bottom-left':
        return '-bottom-1 -left-1';
      case 'bottom-right':
        return '-bottom-1 -right-1';
      default:
        return '-top-1 -right-1';
    }
  };

  if (!children) {
    // Standalone badge
    return shouldShow ? (
      <span
        className={`inline-flex items-center justify-center rounded-full font-caption font-medium ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      >
        {displayCount}
      </span>
    ) : null;
  }

  // Badge with children (wrapper)
  return (
    <div className="relative inline-flex">
      {children}
      {shouldShow && (
        <span
          className={`absolute flex items-center justify-center rounded-full font-caption font-medium transition-all duration-200 ease-out animate-scale-in ${getSizeClasses()} ${getVariantClasses()} ${getPositionClasses()} ${className}`}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

// Notification Badge Hook for managing notification state
export const useNotifications = () => {
  const [notifications, setNotifications] = useState({
    dashboard: 0,
    assessment: 0,
    recommendations: 0,
    coaching: 0,
    profile: 0
  });

  const updateNotificationCount = (section, count) => {
    setNotifications(prev => ({
      ...prev,
      [section]: count
    }));
  };

  const incrementNotification = (section) => {
    setNotifications(prev => ({
      ...prev,
      [section]: prev[section] + 1
    }));
  };

  const clearNotifications = (section) => {
    setNotifications(prev => ({
      ...prev,
      [section]: 0
    }));
  };

  const getTotalCount = () => {
    return Object.values(notifications).reduce((sum, count) => sum + count, 0);
  };

  return {
    notifications,
    updateNotificationCount,
    incrementNotification,
    clearNotifications,
    getTotalCount
  };
};

// Priority Badge Component for urgent notifications
export const PriorityBadge = ({ priority = 'normal', children, className = '' }) => {
  const getPriorityClasses = () => {
    switch (priority) {
      case 'high':
        return 'bg-error text-error-foreground animate-pulse';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="relative inline-flex">
      {children}
      <span
        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getPriorityClasses()} ${className}`}
      />
    </div>
  );
};

export default NotificationBadge;