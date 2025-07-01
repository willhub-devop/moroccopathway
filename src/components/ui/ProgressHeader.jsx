import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressHeader = ({ currentStep = 1, totalSteps = 4, completedSteps = [], onStepClick }) => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const shouldShowProgress = location.pathname === '/branch-assessment-form';

  if (!shouldShowProgress) return null;

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
      labelFr: 'Intérêts académiques',
      labelAr: 'الاهتمامات الأكاديمية',
      shortLabelFr: 'Intérêts',
      shortLabelAr: 'اهتمامات'
    },
    {
      id: 3,
      labelFr: 'Compétences et aptitudes',
      labelAr: 'المهارات والقدرات',
      shortLabelFr: 'Compétences',
      shortLabelAr: 'مهارات'
    },
    {
      id: 4,
      labelFr: 'Objectifs de carrière',
      labelAr: 'أهداف المهنة',
      shortLabelFr: 'Objectifs',
      shortLabelAr: 'أهداف'
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
    if (stepId < currentStep) return 'completed';
    return 'upcoming';
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const handleStepClick = (stepId) => {
    if (onStepClick && (completedSteps.includes(stepId) || stepId <= currentStep)) {
      onStepClick(stepId);
    }
  };

  return (
    <div className="bg-surface border-b border-border sticky top-0 z-90">
      {/* Desktop Progress Header */}
      <div className="hidden md:block px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              {currentLanguage === 'ar' ? 'تقييم الفرع الأكاديمي' : 'Évaluation de Branche Académique'}
            </h2>
            <div className="text-sm font-caption text-text-secondary">
              {currentLanguage === 'ar' 
                ? `الخطوة ${currentStep} من ${totalSteps}` 
                : `Étape ${currentStep} sur ${totalSteps}`
              }
            </div>
          </div>
          
          <div className="relative">
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
                const isClickable = completedSteps.includes(step.id) || step.id <= currentStep;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center space-y-2 transition-all duration-200 ease-out ${
                      isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'
                    }`}
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
                    <span className={`text-xs font-caption text-center max-w-20 leading-tight ${
                      status === 'current' ? 'text-primary font-medium' : 'text-text-secondary'
                    }`}>
                      {getLabel(step, true)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Progress Header */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-heading font-semibold text-text-primary">
            {currentLanguage === 'ar' ? 'تقييم الفرع' : 'Évaluation'}
          </h2>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-sm font-caption text-text-secondary"
          >
            <span>
              {currentLanguage === 'ar' 
                ? `${currentStep}/${totalSteps}` 
                : `${currentStep}/${totalSteps}`
              }
            </span>
            <Icon 
              name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-secondary-200 rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Current Step Info */}
        <div className="text-sm font-caption text-text-primary">
          {getLabel(steps.find(s => s.id === currentStep))}
        </div>

        {/* Dropdown Steps */}
        {isDropdownOpen && (
          <div className="mt-3 bg-secondary-50 rounded-lg p-3 animate-slide-down">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              const isClickable = completedSteps.includes(step.id) || step.id <= currentStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    handleStepClick(step.id);
                    setIsDropdownOpen(false);
                  }}
                  disabled={!isClickable}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    status === 'current' ? 'bg-primary-50 text-primary' : 'text-text-secondary'
                  } ${isClickable ? 'hover:bg-secondary-100' : 'opacity-50'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    status === 'completed'
                      ? 'bg-success text-success-foreground'
                      : status === 'current' ?'bg-primary text-primary-foreground' :'bg-secondary-300 text-text-secondary'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={12} />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="text-sm font-caption">{getLabel(step)}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressHeader;