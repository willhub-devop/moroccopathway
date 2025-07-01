import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import HeroSection from './components/HeroSection';
import SocialLoginSection from './components/SocialLoginSection';
import LoginForm from './components/LoginForm';
import RegistrationPrompt from './components/RegistrationPrompt';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Mock credentials for testing
  const mockCredentials = {
    student: {
      email: "etudiant@moroccopathway.ma",
      password: "etudiant123"
    },
    premium: {
      email: "premium@moroccopathway.ma", 
      password: "premium123"
    }
  };

  const getText = (key) => {
    const texts = {
      pageTitle: {
        fr: 'Connexion Étudiant - MoroccoPathway',
        ar: 'تسجيل دخول الطالب - مسار المغرب'
      },
      signInTitle: {
        fr: 'Connexion à votre compte',
        ar: 'تسجيل الدخول إلى حسابك'
      },
      signInSubtitle: {
        fr: 'Accédez à votre parcours académique personnalisé',
        ar: 'ادخل إلى مسارك الأكاديمي الشخصي'
      },
      loading: {
        fr: 'Connexion en cours...',
        ar: 'جاري تسجيل الدخول...'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials).some(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (isValidCredentials) {
        // Store user session
        localStorage.setItem('userSession', JSON.stringify({
          email: formData.email,
          loginTime: new Date().toISOString(),
          userType: formData.email.includes('premium') ? 'premium' : 'student'
        }));

        // Redirect to dashboard
        navigate('/student-dashboard');
      } else {
        setError('invalid_credentials');
      }
    } catch (err) {
      setError(currentLanguage === 'ar' ?'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.' :'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      localStorage.setItem('userSession', JSON.stringify({
        email: `user@${provider}.com`,
        loginTime: new Date().toISOString(),
        userType: 'student',
        provider: provider
      }));

      navigate('/student-dashboard');
    } catch (err) {
      setError(currentLanguage === 'ar'
        ? `فشل في تسجيل الدخول عبر ${provider}. يرجى المحاولة مرة أخرى.`
        : `Échec de la connexion via ${provider}. Veuillez réessayer.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{getText('pageTitle')}</title>
        <meta name="description" content={getText('signInSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <LoginHeader />
        
        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Hero Section - Desktop Only */}
          <HeroSection />

          {/* Login Form Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Form Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
                  {getText('signInTitle')}
                </h1>
                <p className="text-text-secondary font-body">
                  {getText('signInSubtitle')}
                </p>
              </div>

              {/* Mock Credentials Info */}
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                <h3 className="text-sm font-caption font-semibold text-accent-800 mb-2">
                  {currentLanguage === 'ar' ? 'بيانات اعتماد تجريبية:' : 'Identifiants de test :'}
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <strong>{currentLanguage === 'ar' ? 'طالب:' : 'Étudiant:'}</strong>
                    <br />
                    Email: etudiant@moroccopathway.ma
                    <br />
                    {currentLanguage === 'ar' ? 'كلمة المرور:' : 'Mot de passe:'} etudiant123
                  </div>
                  <div>
                    <strong>{currentLanguage === 'ar' ? 'مميز:' : 'Premium:'}</strong>
                    <br />
                    Email: premium@moroccopathway.ma
                    <br />
                    {currentLanguage === 'ar' ? 'كلمة المرور:' : 'Mot de passe:'} premium123
                  </div>
                </div>
              </div>

              {/* Social Login Section */}
              <SocialLoginSection 
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />

              {/* Login Form */}
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />

              {/* Registration Prompt */}
              <RegistrationPrompt />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;