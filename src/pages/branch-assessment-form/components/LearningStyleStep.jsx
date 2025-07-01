import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LearningStyleStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const learningStyles = [
    {
      id: 'visual',
      labelFr: 'Apprenant Visuel',
      labelAr: 'متعلم بصري',
      descriptionFr: 'J\'apprends mieux avec des diagrammes, des graphiques et des images',
      descriptionAr: 'أتعلم بشكل أفضل مع الرسوم البيانية والصور',
      icon: 'Eye',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'auditory',
      labelFr: 'Apprenant Auditif',
      labelAr: 'متعلم سمعي',
      descriptionFr: 'J\'apprends mieux en écoutant des explications et des discussions',
      descriptionAr: 'أتعلم بشكل أفضل من خلال الاستماع للشروحات والمناقشات',
      icon: 'Headphones',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'kinesthetic',
      labelFr: 'Apprenant Kinesthésique',
      labelAr: 'متعلم حركي',
      descriptionFr: 'J\'apprends mieux en pratiquant et en manipulant des objets',
      descriptionAr: 'أتعلم بشكل أفضل من خلال الممارسة والتطبيق العملي',
      icon: 'Hand',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'reading',
      labelFr: 'Apprenant par Lecture/Écriture',
      labelAr: 'متعلم بالقراءة والكتابة',
      descriptionFr: 'J\'apprends mieux en lisant et en prenant des notes',
      descriptionAr: 'أتعلم بشكل أفضل من خلال القراءة وتدوين الملاحظات',
      icon: 'BookOpen',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const studyPreferences = [
    {
      id: 'individual',
      labelFr: 'Étude individuelle',
      labelAr: 'الدراسة الفردية',
      icon: 'User'
    },
    {
      id: 'group',
      labelFr: 'Étude en groupe',
      labelAr: 'الدراسة الجماعية',
      icon: 'Users'
    },
    {
      id: 'structured',
      labelFr: 'Environnement structuré',
      labelAr: 'بيئة منظمة',
      icon: 'Layout'
    },
    {
      id: 'flexible',
      labelFr: 'Environnement flexible',
      labelAr: 'بيئة مرنة',
      icon: 'Shuffle'
    }
  ];

  const workPace = [
    {
      id: 'fast',
      labelFr: 'Rythme rapide',
      labelAr: 'إيقاع سريع',
      descriptionFr: 'Je préfère avancer rapidement dans mes études',
      descriptionAr: 'أفضل التقدم بسرعة في دراستي'
    },
    {
      id: 'moderate',
      labelFr: 'Rythme modéré',
      labelAr: 'إيقاع متوسط',
      descriptionFr: 'Je préfère un rythme équilibré d\'apprentissage',
      descriptionAr: 'أفضل إيقاع تعلم متوازن'
    },
    {
      id: 'slow',
      labelFr: 'Rythme lent',
      labelAr: 'إيقاع بطيء',
      descriptionFr: 'Je préfère prendre mon temps pour bien comprendre',
      descriptionAr: 'أفضل أخذ وقتي لفهم جيد'
    }
  ];

  const handleLearningStyleChange = (styleId) => {
    onUpdate({ learningStyle: styleId });
    if (errors.learningStyle) {
      setErrors(prev => ({ ...prev, learningStyle: '' }));
    }
  };

  const handleStudyPreferenceToggle = (prefId) => {
    const currentPrefs = formData.studyPreferences || [];
    const updatedPrefs = currentPrefs.includes(prefId)
      ? currentPrefs.filter(id => id !== prefId)
      : [...currentPrefs, prefId];
    
    onUpdate({ studyPreferences: updatedPrefs });
    if (errors.studyPreferences) {
      setErrors(prev => ({ ...prev, studyPreferences: '' }));
    }
  };

  const handleWorkPaceChange = (paceId) => {
    onUpdate({ workPace: paceId });
    if (errors.workPace) {
      setErrors(prev => ({ ...prev, workPace: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.learningStyle) {
      newErrors.learningStyle = currentLanguage === 'ar' ?'يرجى اختيار أسلوب التعلم المفضل' :'Veuillez sélectionner votre style d\'apprentissage préféré';
    }
    
    if (!formData.studyPreferences || formData.studyPreferences.length === 0) {
      newErrors.studyPreferences = currentLanguage === 'ar' ?'يرجى اختيار تفضيل دراسي واحد على الأقل' :'Veuillez sélectionner au moins une préférence d\'étude';
    }
    
    if (!formData.workPace) {
      newErrors.workPace = currentLanguage === 'ar' ?'يرجى اختيار إيقاع العمل المفضل' :'Veuillez sélectionner votre rythme de travail préféré';
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

  const getDescription = (item) => {
    return currentLanguage === 'ar' ? item.descriptionAr : item.descriptionFr;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface rounded-lg shadow-soft">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ? 'أسلوب التعلم' : 'Style d\'Apprentissage'}
        </h3>
        <p className="text-text-secondary font-body">
          {currentLanguage === 'ar' ?'ساعدنا في فهم كيفية تعلمك بشكل أفضل لتخصيص التوصيات' :'Aidez-nous à comprendre comment vous apprenez le mieux pour personnaliser nos recommandations'
          }
        </p>
      </div>

      {/* Learning Style Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'أسلوب التعلم المفضل' : 'Style d\'apprentissage préféré'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningStyles.map((style) => {
            const isSelected = formData.learningStyle === style.id;
            
            return (
              <button
                key={style.id}
                onClick={() => handleLearningStyleChange(style.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ease-out text-left hover:scale-105 ${
                  isSelected
                    ? `${style.color} border-current shadow-medium`
                    : 'bg-surface border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white bg-opacity-50' : 'bg-secondary-100'}`}>
                    <Icon 
                      name={style.icon} 
                      size={20} 
                      className={isSelected ? 'text-current' : 'text-text-secondary'} 
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-caption font-semibold mb-1 ${
                      isSelected ? 'text-current' : 'text-text-primary'
                    }`}>
                      {getLabel(style)}
                    </h5>
                    <p className={`text-sm ${
                      isSelected ? 'text-current opacity-80' : 'text-text-secondary'
                    }`}>
                      {getDescription(style)}
                    </p>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-current flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.learningStyle && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.learningStyle}
          </p>
        )}
      </div>

      {/* Study Preferences */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'تفضيلات الدراسة' : 'Préférences d\'étude'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {studyPreferences.map((pref) => {
            const isSelected = formData.studyPreferences?.includes(pref.id);
            
            return (
              <button
                key={pref.id}
                onClick={() => handleStudyPreferenceToggle(pref.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ease-out hover:scale-105 ${
                  isSelected
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-surface border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon 
                    name={pref.icon} 
                    size={20} 
                    className={isSelected ? 'text-current' : 'text-text-secondary'} 
                  />
                  <span className={`text-sm font-caption text-center ${
                    isSelected ? 'text-current' : 'text-text-primary'
                  }`}>
                    {getLabel(pref)}
                  </span>
                  {isSelected && (
                    <Icon name="Check" size={14} className="text-current" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.studyPreferences && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.studyPreferences}
          </p>
        )}
      </div>

      {/* Work Pace */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {currentLanguage === 'ar' ? 'إيقاع العمل المفضل' : 'Rythme de travail préféré'}
        </h4>
        <div className="space-y-3">
          {workPace.map((pace) => {
            const isSelected = formData.workPace === pace.id;
            
            return (
              <button
                key={pace.id}
                onClick={() => handleWorkPaceChange(pace.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ease-out text-left hover:scale-105 ${
                  isSelected
                    ? 'bg-accent-50 border-accent text-accent-700' :'bg-surface border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className={`font-caption font-semibold mb-1 ${
                      isSelected ? 'text-current' : 'text-text-primary'
                    }`}>
                      {getLabel(pace)}
                    </h5>
                    <p className={`text-sm ${
                      isSelected ? 'text-current opacity-80' : 'text-text-secondary'
                    }`}>
                      {getDescription(pace)}
                    </p>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={20} className="text-current" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.workPace && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.workPace}
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
          {currentLanguage === 'ar' ? 'التالي' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};

export default LearningStyleStep;