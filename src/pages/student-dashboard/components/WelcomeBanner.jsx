import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';

const WelcomeBanner = ({ student, progressData }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (currentLanguage === 'ar') {
      if (hour < 12) return 'صباح الخير';
      if (hour < 17) return 'مساء الخير';
      return 'مساء الخير';
    } else {
      if (hour < 12) return 'Bonjour';
      if (hour < 17) return 'Bon après-midi';
      return 'Bonsoir';
    }
  };

  const getProgressText = () => {
    if (currentLanguage === 'ar') {
      return `${progressData.completedSteps} من ${progressData.totalSteps} مكتملة`;
    }
    return `${progressData.completedSteps} sur ${progressData.totalSteps} complétées`;
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary-700 rounded-xl p-6 text-white shadow-large mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Image
                src={student.avatar}
                alt={`Photo de ${student.name}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-caption opacity-90">
                {getGreeting()}
              </p>
              <h1 className="text-xl font-heading font-semibold">
                {student.name}
              </h1>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-caption opacity-90">
                {currentLanguage === 'ar' ? 'تقدم التقييم' : 'Progression de l\'évaluation'}
              </span>
              <span className="font-medium">
                {getProgressText()}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(progressData.completedSteps / progressData.totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4 ml-6">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold">
              {progressData.recommendationsCount}
            </div>
            <div className="text-xs font-caption opacity-90">
              {currentLanguage === 'ar' ? 'توصيات' : 'Recommandations'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold">
              {progressData.sessionsCount}
            </div>
            <div className="text-xs font-caption opacity-90">
              {currentLanguage === 'ar' ? 'جلسات' : 'Sessions'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;