import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const CareerGoalsStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const careerFields = [
    {
      id: 'engineering',
      labelFr: 'Ingénierie et Technologies',
      labelAr: 'الهندسة والتكنولوجيا',
      icon: 'Cog',
      careers: ['Ingénieur informatique', 'Ingénieur civil', 'Ingénieur électrique']
    },
    {
      id: 'medicine',
      labelFr: 'Médecine et Santé',
      labelAr: 'الطب والصحة',
      icon: 'Heart',
      careers: ['Médecin', 'Pharmacien', 'Infirmier']
    },
    {
      id: 'business',
      labelFr: 'Commerce et Gestion',
      labelAr: 'التجارة والإدارة',
      icon: 'Briefcase',
      careers: ['Manager', 'Entrepreneur', 'Consultant']
    },
    {
      id: 'education',
      labelFr: 'Éducation et Formation',
      labelAr: 'التعليم والتدريب',
      icon: 'GraduationCap',
      careers: ['Professeur', 'Formateur', 'Conseiller pédagogique']
    },
    {
      id: 'arts',
      labelFr: 'Arts et Créativité',
      labelAr: 'الفنون والإبداع',
      icon: 'Palette',
      careers: ['Designer', 'Architecte', 'Artiste']
    },
    {
      id: 'law',
      labelFr: 'Droit et Justice',
      labelAr: 'القانون والعدالة',
      icon: 'Scale',
      careers: ['Avocat', 'Juge', 'Notaire']
    },
    {
      id: 'science',
      labelFr: 'Sciences et Recherche',
      labelAr: 'العلوم والبحث',
      icon: 'Microscope',
      careers: ['Chercheur', 'Scientifique', 'Analyste']
    },
    {
      id: 'media',
      labelFr: 'Médias et Communication',
      labelAr: 'الإعلام والاتصال',
      icon: 'Megaphone',
      careers: ['Journaliste', 'Communicant', 'Réalisateur']
    }
  ];

  const timeHorizons = [
    {
      id: 'short',
      labelFr: 'Court terme (1-2 ans)',
      labelAr: 'قصير المدى (1-2 سنوات)',
      icon: 'Clock'
    },
    {
      id: 'medium',
      labelFr: 'Moyen terme (3-5 ans)',
      labelAr: 'متوسط المدى (3-5 سنوات)',
      icon: 'Calendar'
    },
    {
      id: 'long',
      labelFr: 'Long terme (5+ ans)',
      labelAr: 'طويل المدى (5+ سنوات)',
      icon: 'Target'
    }
  ];

  const workEnvironments = [
    {
      id: 'office',
      labelFr: 'Bureau traditionnel',
      labelAr: 'مكتب تقليدي',
      icon: 'Building'
    },
    {
      id: 'remote',
      labelFr: 'Travail à distance',
      labelAr: 'عمل عن بُعد',
      icon: 'Home'
    },
    {
      id: 'field',
      labelFr: 'Travail sur le terrain',
      labelAr: 'عمل ميداني',
      icon: 'MapPin'
    },
    {
      id: 'laboratory',
      labelFr: 'Laboratoire',
      labelAr: 'مختبر',
      icon: 'Flask'
    },
    {
      id: 'creative',
      labelFr: 'Espace créatif',
      labelAr: 'مساحة إبداعية',
      icon: 'Lightbulb'
    },
    {
      id: 'mixed',
      labelFr: 'Environnement mixte',
      labelAr: 'بيئة مختلطة',
      icon: 'Shuffle'
    }
  ];

  const handleCareerFieldToggle = (fieldId) => {
    const currentFields = formData.careerFields || [];
    const updatedFields = currentFields.includes(fieldId)
      ? currentFields.filter(id => id !== fieldId)
      : [...currentFields, fieldId];
    
    onUpdate({ careerFields: updatedFields });
    if (errors.careerFields) {
      setErrors(prev => ({ ...prev, careerFields: '' }));
    }
  };

  const handleTimeHorizonChange = (horizonId) => {
    onUpdate({ timeHorizon: horizonId });
    if (errors.timeHorizon) {
      setErrors(prev => ({ ...prev, timeHorizon: '' }));
    }
  };

  const handleWorkEnvironmentToggle = (envId) => {
    const currentEnvs = formData.workEnvironments || [];
    const updatedEnvs = currentEnvs.includes(envId)
      ? currentEnvs.filter(id => id !== envId)
      : [...currentEnvs, envId];
    
    onUpdate({ workEnvironments: updatedEnvs });
    if (errors.workEnvironments) {
      setErrors(prev => ({ ...prev, workEnvironments: '' }));
    }
  };

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.careerFields || formData.careerFields.length === 0) {
      newErrors.careerFields = currentLanguage === 'ar' ?'يرجى اختيار مجال مهني واحد على الأقل' :'Veuillez sélectionner au moins un domaine de carrière';
    }
    
    if (!formData.timeHorizon) {
      newErrors.timeHorizon = currentLanguage === 'ar' ?'يرجى اختيار الأفق الزمني' :'Veuillez sélectionner votre horizon temporel';
    }
    
    if (!formData.workEnvironments || formData.workEnvironments.length === 0) {
      newErrors.workEnvironments = currentLanguage === 'ar' ?'يرجى اختيار بيئة عمل واحدة على الأقل' :'Veuillez sélectionner au moins un environnement de travail';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getLabel = (item) => {
    return currentLanguage === 'ar' ? item.labelAr : item.labelFr;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface rounded-lg shadow-soft">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ? 'أهداف المهنة' : 'Objectifs de Carrière'}
        </h3>
        <p className="text-text-secondary font-body">
          {currentLanguage === 'ar' ?'شاركنا تطلعاتك المهنية وأهدافك المستقبلية' :'Partagez vos aspirations professionnelles et vos objectifs futurs'
          }
        </p>
      </div>

      {/* Career Fields */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'المجالات المهنية المهتم بها' : 'Domaines de carrière d\'intérêt'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerFields.map((field) => {
            const isSelected = formData.careerFields?.includes(field.id);
            
            return (
              <button
                key={field.id}
                onClick={() => handleCareerFieldToggle(field.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ease-out text-left hover:scale-105 ${
                  isSelected
                    ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary-100'}`}>
                    <Icon 
                      name={field.icon} 
                      size={20} 
                      className={isSelected ? 'text-current' : 'text-text-secondary'} 
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-caption font-semibold mb-1 ${
                      isSelected ? 'text-current' : 'text-text-primary'
                    }`}>
                      {getLabel(field)}
                    </h5>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-current flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.careerFields && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.careerFields}
          </p>
        )}
      </div>

      {/* Career Goals Text */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'أهدافك المهنية المحددة' : 'Vos objectifs de carrière spécifiques'}
        </h4>
        <textarea
          placeholder={currentLanguage === 'ar' ?'اكتب عن أهدافك المهنية وتطلعاتك المستقبلية...' :'Décrivez vos objectifs de carrière et vos aspirations futures...'
          }
          value={formData.careerGoals || ''}
          onChange={(e) => handleInputChange('careerGoals', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg font-body text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      {/* Time Horizon */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'الأفق الزمني لأهدافك' : 'Horizon temporel de vos objectifs'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeHorizons.map((horizon) => {
            const isSelected = formData.timeHorizon === horizon.id;
            
            return (
              <button
                key={horizon.id}
                onClick={() => handleTimeHorizonChange(horizon.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ease-out hover:scale-105 ${
                  isSelected
                    ? 'bg-accent-50 border-accent text-accent-700' :'bg-surface border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon 
                    name={horizon.icon} 
                    size={24} 
                    className={isSelected ? 'text-current' : 'text-text-secondary'} 
                  />
                  <span className={`text-sm font-caption text-center ${
                    isSelected ? 'text-current' : 'text-text-primary'
                  }`}>
                    {getLabel(horizon)}
                  </span>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-current" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.timeHorizon && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.timeHorizon}
          </p>
        )}
      </div>

      {/* Work Environment Preferences */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'بيئة العمل المفضلة' : 'Environnement de travail préféré'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workEnvironments.map((env) => {
            const isSelected = formData.workEnvironments?.includes(env.id);
            
            return (
              <button
                key={env.id}
                onClick={() => handleWorkEnvironmentToggle(env.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ease-out hover:scale-105 ${
                  isSelected
                    ? 'bg-success-50 border-success text-success-700' :'bg-surface border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon 
                    name={env.icon} 
                    size={20} 
                    className={isSelected ? 'text-current' : 'text-text-secondary'} 
                  />
                  <span className={`text-sm font-caption text-center ${
                    isSelected ? 'text-current' : 'text-text-primary'
                  }`}>
                    {getLabel(env)}
                  </span>
                  {isSelected && (
                    <Icon name="Check" size={14} className="text-current" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.workEnvironments && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.workEnvironments}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="secondary"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          {currentLanguage === 'ar' ? 'السابق' : 'Précédent'}
        </Button>

        <Button
          variant="primary"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          {currentLanguage === 'ar' ? 'إنهاء التقييم' : 'Terminer l\'évaluation'}
        </Button>
      </div>
    </div>
  );
};

export default CareerGoalsStep;