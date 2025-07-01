import React, { useState, useEffect } from 'react';

import Icon from '../../../components/AppIcon';

const SocialLoginSection = ({ onSocialLogin, isLoading }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  const getText = (key) => {
    const texts = {
      continueWith: {
        fr: 'Continuer avec',
        ar: 'المتابعة مع'
      },
      orDivider: {
        fr: 'ou',
        ar: 'أو'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  return (
    <div className="space-y-4">
      {/* Social Login Buttons */}
      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200 ease-out hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed ${provider.bgColor} ${provider.textColor} ${provider.borderColor}`}
          >
            <Icon 
              name={provider.icon} 
              size={20} 
              className="flex-shrink-0"
            />
            <span className="font-caption font-medium">
              {getText('continueWith')} {provider.name}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary font-caption">
            {getText('orDivider')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginSection;