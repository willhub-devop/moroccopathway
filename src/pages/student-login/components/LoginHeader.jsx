import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LanguageSelector from './LanguageSelector';

const LoginHeader = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const getText = (key) => {
    const texts = {
      appName: {
        fr: 'MoroccoPathway',
        ar: 'مسار المغرب'
      },
      tagline: {
        fr: 'Votre guide vers l\'excellence académique',
        ar: 'دليلك نحو التميز الأكاديمي'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  const handleLogoClick = () => {
    navigate('/student-dashboard');
  };

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            {/* Logo SVG */}
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-text-primary">
                {getText('appName')}
              </h1>
              <p className="text-xs font-caption text-text-secondary -mt-1">
                {getText('tagline')}
              </p>
            </div>
          </button>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;