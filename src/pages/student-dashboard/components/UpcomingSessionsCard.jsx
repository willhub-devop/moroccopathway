import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingSessionsCard = ({ sessions }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-MA' : 'fr-FR', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-MA' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilSession = (sessionDate) => {
    const now = new Date();
    const diffMs = sessionDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return currentLanguage === 'ar' 
        ? `في ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`
        : `Dans ${diffDays} ${diffDays === 1 ? 'jour' : 'jours'}`;
    } else if (diffHours > 0) {
      return currentLanguage === 'ar'
        ? `في ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`
        : `Dans ${diffHours} ${diffHours === 1 ? 'heure' : 'heures'}`;
    } else {
      return currentLanguage === 'ar' ? 'قريباً' : 'Bientôt';
    }
  };

  const handleScheduleNew = () => {
    navigate('/coaching-session-scheduler');
  };

  const handleJoinSession = (sessionId) => {
    // Mock join session functionality
    console.log('Joining session:', sessionId);
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          {currentLanguage === 'ar' ? 'الجلسات القادمة' : 'Sessions à venir'}
        </h2>
        <Button
          variant="ghost"
          iconName="Plus"
          iconSize={16}
          onClick={handleScheduleNew}
          className="text-primary hover:bg-primary-50"
        >
          {currentLanguage === 'ar' ? 'جدولة' : 'Planifier'}
        </Button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CalendarX" size={24} className="text-secondary-500" />
          </div>
          <p className="text-text-secondary font-caption mb-4">
            {currentLanguage === 'ar' ?'لا توجد جلسات مجدولة' :'Aucune session programmée'
            }
          </p>
          <Button
            variant="primary"
            iconName="Calendar"
            iconPosition="left"
            onClick={handleScheduleNew}
          >
            {currentLanguage === 'ar' ? 'جدولة جلسة' : 'Planifier une session'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.slice(0, 2).map((session) => (
            <div
              key={session.id}
              className="border border-border rounded-lg p-4 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 ease-out"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={session.coach.avatar}
                    alt={`Photo de ${session.coach.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-caption font-medium text-text-primary truncate">
                        {session.coach.name}
                      </h3>
                      <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-caption">
                        {session.coach.specialization}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary font-caption mb-2">
                      {session.topic}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <span className="flex items-center">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {formatDate(session.date)}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {formatTime(session.date)}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Timer" size={12} className="mr-1" />
                        {session.duration} min
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <span className="text-xs font-caption text-primary bg-primary-50 px-2 py-1 rounded-full">
                    {getTimeUntilSession(session.date)}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Video"
                    iconSize={14}
                    onClick={() => handleJoinSession(session.id)}
                  >
                    {currentLanguage === 'ar' ? 'انضمام' : 'Rejoindre'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {sessions.length > 2 && (
            <Button
              variant="ghost"
              fullWidth
              iconName="ChevronDown"
              iconPosition="right"
              onClick={handleScheduleNew}
              className="text-primary hover:bg-primary-50"
            >
              {currentLanguage === 'ar' 
                ? `عرض ${sessions.length - 2} جلسات أخرى` 
                : `Voir ${sessions.length - 2} autres sessions`
              }
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingSessionsCard;