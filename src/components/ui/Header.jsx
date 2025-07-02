import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';
import NotificationCenter from './NotificationBadge';

const Header = ({ 
  student = null, 
  notifications = [], 
  onMarkNotificationAsRead = () => {}, 
  onMarkAllNotificationsAsRead = () => {},
  showAuthButtons = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    // Check authentication status
    const userSession = localStorage.getItem('userSession');
    setIsAuthenticated(!!userSession);
  }, []);

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'fr' ? 'ar' : 'fr';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage } 
    }));
  };

  const handleLogin = () => {
    navigate('/student-login');
  };

  const handleSignup = () => {
    navigate('/student-registration');
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('language');
    setIsAuthenticated(false);
    navigate('/student-login');
  };

  const handleProfileClick = () => {
    // Navigate to profile page (not implemented in this scope)
    console.log('Navigate to profile');
  };

  const getText = (key) => {
    const texts = {
      login: {
        fr: 'Se connecter',
        ar: 'تسجيل الدخول'
      },
      signup: {
        fr: 'S\'inscrire',
        ar: 'التسجيل'
      },
      logout: {
        fr: 'Se déconnecter',
        ar: 'تسجيل الخروج'
      },
      platformSubtitle: {
        fr: 'Plateforme d\'orientation académique',
        ar: 'منصة التوجيه الأكاديمي'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  // Check if we're on auth pages
  const isAuthPage = location.pathname.includes('login') || location.pathname.includes('registration');

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {/* Tawjihyou Logo */}
              <Image
                src="/assets/images/WhatsApp_Image_2025-07-02_at_01.45.08_75c0881b-1751451013807.jpg"
                alt="Tawjihyou Logo"
                className="w-10 h-10 object-contain rounded-lg"
              />
              <div>
                <h1 className="text-lg font-heading font-semibold text-text-primary">
                  Tawjihyou
                </h1>
                <p className="text-xs text-text-secondary font-caption">
                  {getText('platformSubtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Section - Auth Buttons or User Menu */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="text-text-secondary hover:text-primary"
            >
              <Icon name="Languages" size={18} />
              <span className="ml-1 text-xs font-caption">
                {currentLanguage === 'fr' ? 'عربي' : 'FR'}
              </span>
            </Button>
            
            {/* Authentication Section */}
            {showAuthButtons && (
              <>
                {!isAuthenticated || isAuthPage ? (
                  // Show Login/Signup buttons when not authenticated or on auth pages
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogin}
                      className="text-text-secondary hover:text-primary"
                    >
                      <Icon name="LogIn" size={16} className="mr-1" />
                      <span className="text-sm font-caption">
                        {getText('login')}
                      </span>
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSignup}
                      className="px-3 py-1.5"
                    >
                      <Icon name="UserPlus" size={16} className="mr-1" />
                      <span className="text-sm font-caption">
                        {getText('signup')}
                      </span>
                    </Button>
                  </>
                ) : (
                  // Show user menu and logout when authenticated
                  <>
                    {/* Notifications - only show when authenticated and not on auth pages */}
                    {notifications && notifications.length > 0 && (
                      <NotificationCenter
                        notifications={notifications}
                        onMarkAsRead={onMarkNotificationAsRead}
                        onMarkAllAsRead={onMarkAllNotificationsAsRead}
                      />
                    )}
                    
                    {/* User Profile */}
                    {student && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleProfileClick}
                        className="p-1"
                      >
                        <Image
                          src={student.avatar}
                          alt={`Photo de ${student.name}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </Button>
                    )}
                    
                    {/* Logout Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-text-secondary hover:text-danger"
                    >
                      <Icon name="LogOut" size={16} className="mr-1" />
                      <span className="text-sm font-caption">
                        {getText('logout')}
                      </span>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;