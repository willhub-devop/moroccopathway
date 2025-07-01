import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FormSidebar = ({ currentStep, totalSteps, completedSteps, formData, onSave }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const steps = [
    {
      id: 1,
      labelFr: 'Informations personnelles',
      labelAr: 'المعلومات الشخصية',
      icon: 'User',
      fields: ['firstName', 'lastName', 'email', 'birthDate', 'city', 'currentLevel']
    },
    {
      id: 2,
      labelFr: 'Intérêts académiques',
      labelAr: 'الاهتمامات الأكاديمية',
      icon: 'BookOpen',
      fields: ['academicInterests']
    },
    {
      id: 3,
      labelFr: 'Préférences de matières',
      labelAr: 'تفضيلات المواد',
      icon: 'GraduationCap',
      fields: ['subjectRatings']
    },
    {
      id: 4,
      labelFr: 'Style d\'apprentissage',
      labelAr: 'أسلوب التعلم',
      icon: 'Brain',
      fields: ['learningStyle', 'studyPreferences', 'workPace']
    },
    {
      id: 5,
      labelFr: 'Objectifs de carrière',
      labelAr: 'أهداف المهنة',
      icon: 'Target',
      fields: ['careerFields', 'careerGoals', 'timeHorizon', 'workEnvironments']
    }
  ];

  const getStepCompletion = (step) => {
    const requiredFields = step.fields;
    const completedFields = requiredFields.filter(field => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length > 0;
      return value && value.toString().trim() !== '';
    });
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'completed';
    return 'upcoming';
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getLabel = (step) => {
    return currentLanguage === 'ar' ? step.labelAr : step.labelFr;
  };

  const formatLastSaved = () => {
    if (!lastSaved) return '';
    const now = new Date();
    const diffMinutes = Math.floor((now - lastSaved) / (1000 * 60));
    
    if (diffMinutes < 1) {
      return currentLanguage === 'ar' ? 'الآن' : 'À l\'instant';
    } else if (diffMinutes < 60) {
      return currentLanguage === 'ar' 
        ? `منذ ${diffMinutes} دقيقة`
        : `Il y a ${diffMinutes} min`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return currentLanguage === 'ar' 
        ? `منذ ${diffHours} ساعة`
        : `Il y a ${diffHours}h`;
    }
  };

  const overallProgress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="hidden lg:block w-80 bg-surface border-r border-border h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'تقدم التقييم' : 'Progression de l\'évaluation'}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={16} />
            <span>
              {currentLanguage === 'ar' 
                ? `الخطوة ${currentStep} من ${totalSteps}`
                : `Étape ${currentStep} sur ${totalSteps}`
              }
            </span>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-text-secondary">
              {currentLanguage === 'ar' ? 'التقدم الإجمالي' : 'Progression globale'}
            </span>
            <span className="text-sm font-caption font-semibold text-primary">
              {overallProgress}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4 mb-6">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const completion = getStepCompletion(step);
            
            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  status === 'current' ?'bg-primary-50 border-primary'
                    : status === 'completed' ?'bg-success-50 border-success' :'bg-secondary-50 border-border'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status === 'completed'
                      ? 'bg-success text-success-foreground'
                      : status === 'current' ?'bg-primary text-primary-foreground' :'bg-secondary-300 text-text-secondary'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-caption font-semibold ${
                      status === 'current' ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {getLabel(step)}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-secondary-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-300 ${
                            status === 'completed' ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">
                        {completion}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Section */}
        <div className="border-t border-border pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary-600 transition-colors duration-200 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span className="font-caption">
                  {currentLanguage === 'ar' ? 'جاري الحفظ...' : 'Sauvegarde...'}
                </span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span className="font-caption">
                  {currentLanguage === 'ar' ? 'حفظ التقدم' : 'Sauvegarder'}
                </span>
              </>
            )}
          </button>
          
          {lastSaved && (
            <p className="text-xs text-text-secondary mt-2 text-center">
              {currentLanguage === 'ar' ? 'آخر حفظ: ' : 'Dernière sauvegarde: '}
              {formatLastSaved()}
            </p>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div>
              <h4 className="text-sm font-caption font-semibold text-accent mb-1">
                {currentLanguage === 'ar' ? 'نصيحة' : 'Conseil'}
              </h4>
              <p className="text-xs text-accent-700">
                {currentLanguage === 'ar' ?'أجب بصدق على جميع الأسئلة للحصول على توصيات دقيقة' :'Répondez honnêtement à toutes les questions pour obtenir des recommandations précises'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSidebar;