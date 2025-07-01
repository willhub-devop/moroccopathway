import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationItems = [
    {
      id: 'dashboard',
      path: '/student-dashboard',
      labelFr: 'Tableau de Bord',
      labelAr: 'لوحة التحكم',
      icon: 'LayoutDashboard',
      tooltip: 'Accédez à votre tableau de bord principal'
    },
    {
      id: 'assessment',
      path: '/branch-assessment-form',
      labelFr: 'Évaluation',
      labelAr: 'التقييم',
      icon: 'ClipboardList',
      tooltip: 'Complétez votre évaluation de branche'
    },
    {
      id: 'recommendations',
      path: '/branch-recommendations',
      labelFr: 'Recommandations',
      labelAr: 'التوصيات',
      icon: 'Target',
      tooltip: 'Consultez vos recommandations personnalisées'
    },
    {
      id: 'coaching',
      path: '/coaching-session-scheduler',
      labelFr: 'Coaching',
      labelAr: 'التدريب',
      icon: 'Calendar',
      tooltip: 'Planifiez vos sessions de coaching'
    }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeItem = navigationItems.find(item => item.path === currentPath);
    return activeItem?.id || 'dashboard';
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const getLabel = (item) => {
    return currentLanguage === 'ar' ? item.labelAr : item.labelFr;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = getActiveTab() === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path)}
                className={`flex flex-col items-center justify-center min-h-[64px] px-3 py-2 rounded-lg transition-all duration-200 ease-out ${
                  isActive
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
                }`}
                title={item.tooltip}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  className={`mb-1 ${isActive ? 'text-primary' : 'text-current'}`}
                />
                <span className="text-xs font-caption font-medium leading-tight text-center">
                  {getLabel(item)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Header Navigation */}
      <nav className="hidden md:flex items-center space-x-1 bg-surface border-b border-border px-6 py-3">
        {navigationItems.map((item) => {
          const isActive = getActiveTab() === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ease-out font-caption font-medium ${
                isActive
                  ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
              }`}
              title={item.tooltip}
            >
              <Icon
                name={item.icon}
                size={18}
                className={isActive ? 'text-primary' : 'text-current'}
              />
              <span>{getLabel(item)}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default TabNavigation;