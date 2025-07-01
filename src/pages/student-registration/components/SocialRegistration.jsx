import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState({ google: false, facebook: false });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSocialLogin = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      // Mock social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUserData = {
        provider,
        name: provider === 'google' ? 'Ahmed Benali' : 'Fatima Zahra',
        email: provider === 'google' ? 'ahmed.benali@gmail.com' : 'fatima.zahra@facebook.com',
        avatar: `https://randomuser.me/api/portraits/${provider === 'google' ? 'men' : 'women'}/32.jpg`
      };
      
      onSocialRegister(mockUserData);
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary font-caption">
            {currentLanguage === 'ar' ? 'أو سجل باستخدام' : 'Ou inscrivez-vous avec'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          loading={isLoading.google}
          disabled={isLoading.facebook}
          className="w-full justify-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="font-caption font-medium">Google</span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleSocialLogin('facebook')}
          loading={isLoading.facebook}
          disabled={isLoading.google}
          className="w-full justify-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-[#1877F2] rounded flex items-center justify-center">
              <Icon name="Facebook" size={14} className="text-white" />
            </div>
            <span className="font-caption font-medium">Facebook</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SocialRegistration;