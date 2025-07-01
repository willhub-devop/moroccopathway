import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const RegistrationHeader = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'ar' : 'fr';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleLogoClick = () => {
    navigate('/student-login');
  };

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} className="text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-text-primary">
                MoroccoPathway
              </h1>
              <p className="text-xs font-caption text-text-secondary -mt-1">
                {currentLanguage === 'ar' ? 'إرشاد أكاديمي' : 'Guidance Académique'}
              </p>
            </div>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-secondary-50 transition-colors duration-200"
          >
            <Icon name="Globe" size={18} className="text-text-secondary" />
            <span className="font-caption font-medium text-text-primary">
              {currentLanguage === 'fr' ? 'العربية' : 'Français'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;