import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSteps = [] }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const steps = [
    {
      id: 1,
      labelFr: 'Informations personnelles',
      labelAr: 'المعلومات الشخصية',
      shortLabelFr: 'Personnel',
      shortLabelAr: 'شخصي'
    },
    {
      id: 2,
      labelFr: 'Détails académiques',
      labelAr: 'التفاصيل الأكاديمية',
      shortLabelFr: 'Académique',
      shortLabelAr: 'أكاديمي'
    },
    {
      id: 3,
      labelFr: 'Configuration du compte',
      labelAr: 'إعداد الحساب',
      shortLabelFr: 'Compte',
      shortLabelAr: 'حساب'
    }
  ];

  const getLabel = (step, isShort = false) => {
    if (currentLanguage === 'ar') {
      return isShort ? step.shortLabelAr : step.labelAr;
    }
    return isShort ? step.shortLabelFr : step.labelFr;
  };

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            {currentLanguage === 'ar' ? 'إنشاء حساب' : 'Créer un Compte'}
          </h2>
          <span className="text-sm font-caption text-text-secondary">
            {currentLanguage === 'ar' 
              ? `الخطوة ${currentStep} من ${totalSteps}` 
              : `Étape ${currentStep} sur ${totalSteps}`
            }
          </span>
        </div>
        
        <div className="w-full bg-secondary-200 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <p className="text-sm font-caption text-text-primary">
          {getLabel(steps.find(s => s.id === currentStep))}
        </p>
      </div>

      {/* Desktop Progress */}
      <div className="hidden md:block">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'إنشاء حساب جديد' : 'Créer un Nouveau Compte'}
          </h2>
          <p className="text-text-secondary font-caption">
            {currentLanguage === 'ar' ?'ابدأ رحلتك الأكاديمية معنا' :'Commencez votre parcours académique avec nous'
            }
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary-200">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Steps */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    status === 'completed'
                      ? 'bg-success border-success text-success-foreground'
                      : status === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-surface border-secondary-300 text-text-secondary'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span className={`text-xs font-caption text-center max-w-24 leading-tight ${
                    status === 'current' ? 'text-primary font-medium' : 'text-text-secondary'
                  }`}>
                    {getLabel(step, true)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;