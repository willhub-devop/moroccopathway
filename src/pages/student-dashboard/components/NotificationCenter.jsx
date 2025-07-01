import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'session':
        return 'Calendar';
      case 'assessment':
        return 'ClipboardList';
      case 'recommendation':
        return 'Target';
      case 'message':
        return 'MessageCircle';
      case 'reminder':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    switch (type) {
      case 'session':
        return 'text-primary';
      case 'assessment':
        return 'text-accent';
      case 'recommendation':
        return 'text-success';
      case 'message':
        return 'text-secondary-600';
      default:
        return 'text-secondary-600';
    }
  };

  const formatNotificationTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return currentLanguage === 'ar' ? 'الآن' : 'Maintenant';
    } else if (diffMinutes < 60) {
      return currentLanguage === 'ar' 
        ? `منذ ${diffMinutes} دقيقة` 
        : `Il y a ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return currentLanguage === 'ar' 
        ? `منذ ${diffHours} ساعة` 
        : `Il y a ${diffHours}h`;
    } else {
      return currentLanguage === 'ar' 
        ? `منذ ${diffDays} يوم` 
        : `Il y a ${diffDays}j`;
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    // Handle navigation based on notification type
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <NotificationBadge count={unreadCount} size="sm">
          <Icon name="Bell" size={20} className="text-text-secondary" />
        </NotificationBadge>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-xl shadow-large z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-text-primary">
                  {currentLanguage === 'ar' ? 'الإشعارات' : 'Notifications'}
                </h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={onMarkAllAsRead}
                    className="text-primary hover:bg-primary-50"
                  >
                    {currentLanguage === 'ar' ? 'تعيين الكل كمقروء' : 'Tout marquer lu'}
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Bell" size={20} className="text-secondary-500" />
                  </div>
                  <p className="text-text-secondary font-caption">
                    {currentLanguage === 'ar' ? 'لا توجد إشعارات' : 'Aucune notification'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-secondary-50 cursor-pointer transition-colors duration-200 ease-out ${
                        !notification.isRead ? 'bg-primary-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          !notification.isRead ? 'bg-primary-100' : 'bg-secondary-100'
                        }`}>
                          <Icon 
                            name={getNotificationIcon(notification.type)} 
                            size={16} 
                            className={getNotificationColor(notification.type, notification.priority)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-caption font-medium ${
                              !notification.isRead ? 'text-text-primary' : 'text-text-secondary'
                            }`}>
                              {currentLanguage === 'ar' ? notification.titleAr : notification.titleFr}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-text-muted font-caption mt-1 line-clamp-2">
                            {currentLanguage === 'ar' ? notification.messageAr : notification.messageFr}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-text-muted font-caption">
                              {formatNotificationTime(notification.createdAt)}
                            </span>
                            {notification.priority === 'high' && (
                              <span className="text-xs bg-error-100 text-error-700 px-2 py-0.5 rounded-full font-caption">
                                {currentLanguage === 'ar' ? 'عاجل' : 'Urgent'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="text-primary hover:bg-primary-50"
                >
                  {currentLanguage === 'ar' ? 'عرض جميع الإشعارات' : 'Voir toutes les notifications'}
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;