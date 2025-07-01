import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷'
    },
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇲🇦'
    }
  ];

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    setIsOpen(false);
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: languageCode } 
    }));
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-secondary-50 transition-colors duration-200 ease-out"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-caption font-medium text-text-primary">
          {currentLang?.name}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-large z-50 animate-slide-down">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-secondary-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage === language.code ? 'bg-primary-50 text-primary' : 'text-text-primary'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-caption font-medium">
                {language.name}
              </span>
              {currentLanguage === language.code && (
                <Icon name="Check" size={16} className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;