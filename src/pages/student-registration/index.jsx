import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import ProgressIndicator from './components/ProgressIndicator';
import SocialRegistration from './components/SocialRegistration';
import PersonalInfoStep from './components/PersonalInfoStep';
import AcademicDetailsStep from './components/AcademicDetailsStep';
import AccountSetupStep from './components/AccountSetupStep';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Academic Details
    gradeLevel: '',
    preferredSubjects: [],
    schoolRegion: '',
    currentSchool: '',
    // Account Setup
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptNewsletter: false
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = currentLanguage === 'ar' ?'الاسم الأول مطلوب' :'Le prénom est requis';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = currentLanguage === 'ar' ?'اسم العائلة مطلوب' :'Le nom de famille est requis';
        }
        if (!formData.email.trim()) {
          newErrors.email = currentLanguage === 'ar' ?'البريد الإلكتروني مطلوب' :'L\'adresse e-mail est requise';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = currentLanguage === 'ar' ?'البريد الإلكتروني غير صحيح' :'Adresse e-mail invalide';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = currentLanguage === 'ar' ?'رقم الهاتف مطلوب' :'Le numéro de téléphone est requis';
        }
        break;

      case 2:
        if (!formData.gradeLevel) {
          newErrors.gradeLevel = currentLanguage === 'ar' ?'المستوى الدراسي مطلوب' :'Le niveau scolaire est requis';
        }
        if (formData.preferredSubjects.length === 0) {
          newErrors.preferredSubjects = currentLanguage === 'ar' ?'اختر مادة واحدة على الأقل' :'Sélectionnez au moins une matière';
        }
        if (!formData.schoolRegion) {
          newErrors.schoolRegion = currentLanguage === 'ar' ?'منطقة المدرسة مطلوبة' :'La région de l\'école est requise';
        }
        break;

      case 3:
        if (!formData.password) {
          newErrors.password = currentLanguage === 'ar' ?'كلمة المرور مطلوبة' :'Le mot de passe est requis';
        } else if (formData.password.length < 8) {
          newErrors.password = currentLanguage === 'ar' ?'كلمة المرور يجب أن تكون 8 أحرف على الأقل' :'Le mot de passe doit contenir au moins 8 caractères';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = currentLanguage === 'ar' ?'كلمات المرور غير متطابقة' :'Les mots de passe ne correspondent pas';
        }
        if (!formData.acceptTerms) {
          newErrors.acceptTerms = currentLanguage === 'ar' ?'يجب الموافقة على الشروط والأحكام' :'Vous devez accepter les conditions d\'utilisation';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setErrors({});
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSocialRegister = async (socialData) => {
    setIsLoading(true);
    try {
      // Mock social registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Auto-fill form with social data
      setFormData(prev => ({
        ...prev,
        firstName: socialData.name.split(' ')[0] || '',
        lastName: socialData.name.split(' ').slice(1).join(' ') || '',
        email: socialData.email || ''
      }));

      // Navigate to dashboard after successful social registration
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      // Mock registration process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Store user data in localStorage (mock)
      const userData = {
        id: Date.now(),
        ...formData,
        registrationDate: new Date().toISOString(),
        isVerified: false
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to dashboard
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        submit: currentLanguage === 'ar' ?'فشل في إنشاء الحساب. حاول مرة أخرى.' :'Échec de la création du compte. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/student-login');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onNext={handleNext}
            errors={errors}
          />
        );
      case 2:
        return (
          <AcademicDetailsStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            errors={errors}
          />
        );
      case 3:
        return (
          <AccountSetupStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            errors={errors}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Form */}
            <div className="w-full">
              <div className="bg-surface rounded-xl shadow-soft border border-border p-6 sm:p-8">
                <ProgressIndicator
                  currentStep={currentStep}
                  totalSteps={3}
                  completedSteps={completedSteps}
                />

                {currentStep === 1 && (
                  <div className="mb-8">
                    <SocialRegistration onSocialRegister={handleSocialRegister} />
                  </div>
                )}

                {renderCurrentStep()}

                {errors.submit && (
                  <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error" />
                      <p className="text-sm font-caption text-error">{errors.submit}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm font-caption text-text-secondary">
                  {currentLanguage === 'ar' ?'لديك حساب بالفعل؟ ' :'Vous avez déjà un compte ? '
                  }
                  <button
                    onClick={handleLoginRedirect}
                    className="text-primary hover:underline font-medium"
                  >
                    {currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Se connecter'}
                  </button>
                </p>
              </div>
            </div>

            {/* Right Column - Decorative Content (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="GraduationCap" size={32} className="text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                      {currentLanguage === 'ar' ?'ابدأ رحلتك الأكاديمية' :'Commencez Votre Parcours Académique'
                      }
                    </h3>
                    <p className="text-text-secondary font-caption">
                      {currentLanguage === 'ar' ?'انضم إلى آلاف الطلاب المغاربة الذين اختاروا مسارهم الأكاديمي بثقة' :'Rejoignez des milliers d\'étudiants marocains qui ont choisi leur parcours académique en toute confiance'
                      }
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={16} className="text-success-foreground" />
                      </div>
                      <span className="font-caption text-text-primary">
                        {currentLanguage === 'ar' ?'تقييم شخصي مجاني' :'Évaluation personnalisée gratuite'
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={16} className="text-success-foreground" />
                      </div>
                      <span className="font-caption text-text-primary">
                        {currentLanguage === 'ar' ?'توصيات مخصصة للفروع' :'Recommandations de branches personnalisées'
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={16} className="text-success-foreground" />
                      </div>
                      <span className="font-caption text-text-primary">
                        {currentLanguage === 'ar' ?'جلسات تدريب مع خبراء' :'Sessions de coaching avec des experts'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&crop=center"
                      alt="Students studying together"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentRegistration;