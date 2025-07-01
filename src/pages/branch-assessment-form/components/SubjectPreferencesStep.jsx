import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubjectPreferencesStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const subjects = [
    {
      id: 'mathematics',
      labelFr: 'Mathématiques',
      labelAr: 'الرياضيات',
      icon: 'Calculator',
      emoji: '🔢'
    },
    {
      id: 'physics',
      labelFr: 'Physique',
      labelAr: 'الفيزياء',
      icon: 'Zap',
      emoji: '⚡'
    },
    {
      id: 'chemistry',
      labelFr: 'Chimie',
      labelAr: 'الكيمياء',
      icon: 'Flask',
      emoji: '🧪'
    },
    {
      id: 'biology',
      labelFr: 'Sciences de la Vie et de la Terre',
      labelAr: 'علوم الحياة والأرض',
      icon: 'Leaf',
      emoji: '🌱'
    },
    {
      id: 'french',
      labelFr: 'Français',
      labelAr: 'الفرنسية',
      icon: 'BookOpen',
      emoji: '📚'
    },
    {
      id: 'arabic',
      labelFr: 'Arabe',
      labelAr: 'العربية',
      icon: 'Type',
      emoji: '📝'
    },
    {
      id: 'english',
      labelFr: 'Anglais',
      labelAr: 'الإنجليزية',
      icon: 'Globe',
      emoji: '🌍'
    },
    {
      id: 'history',
      labelFr: 'Histoire',
      labelAr: 'التاريخ',
      icon: 'Clock',
      emoji: '🏛️'
    },
    {
      id: 'geography',
      labelFr: 'Géographie',
      labelAr: 'الجغرافيا',
      icon: 'Map',
      emoji: '🗺️'
    },
    {
      id: 'philosophy',
      labelFr: 'Philosophie',
      labelAr: 'الفلسفة',
      icon: 'Brain',
      emoji: '🤔'
    },
    {
      id: 'economics',
      labelFr: 'Économie',
      labelAr: 'الاقتصاد',
      icon: 'TrendingUp',
      emoji: '📈'
    },
    {
      id: 'informatics',
      labelFr: 'Informatique',
      labelAr: 'المعلوماتية',
      icon: 'Monitor',
      emoji: '💻'
    }
  ];

  const ratingLabels = {
    1: { fr: 'Pas du tout intéressé', ar: 'غير مهتم على الإطلاق', emoji: '😞' },
    2: { fr: 'Peu intéressé', ar: 'مهتم قليلاً', emoji: '😐' },
    3: { fr: 'Moyennement intéressé', ar: 'مهتم متوسط', emoji: '🙂' },
    4: { fr: 'Très intéressé', ar: 'مهتم جداً', emoji: '😊' },
    5: { fr: 'Passionné', ar: 'شغوف', emoji: '🤩' }
  };

  const handleRatingChange = (subjectId, rating) => {
    const currentRatings = formData.subjectRatings || {};
    onUpdate({
      subjectRatings: {
        ...currentRatings,
        [subjectId]: rating
      }
    });

    if (errors.subjectRatings) {
      setErrors(prev => ({ ...prev, subjectRatings: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const ratings = formData.subjectRatings || {};
    const ratedSubjects = Object.keys(ratings).filter(key => ratings[key] > 0);
    
    if (ratedSubjects.length < 5) {
      newErrors.subjectRatings = currentLanguage === 'ar' ?'يرجى تقييم 5 مواد على الأقل' :'Veuillez évaluer au moins 5 matières';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getLabel = (subject) => {
    return currentLanguage === 'ar' ? subject.labelAr : subject.labelFr;
  };

  const getRatingLabel = (rating) => {
    const label = ratingLabels[rating];
    return currentLanguage === 'ar' ? label.ar : label.fr;
  };

  const getRatedCount = () => {
    const ratings = formData.subjectRatings || {};
    return Object.keys(ratings).filter(key => ratings[key] > 0).length;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface rounded-lg shadow-soft">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ? 'تفضيلات المواد' : 'Préférences de Matières'}
        </h3>
        <p className="text-text-secondary font-body mb-4">
          {currentLanguage === 'ar' ?'قيم مستوى اهتمامك بكل مادة من 1 إلى 5 (يرجى تقييم 5 مواد على الأقل)' :'Évaluez votre niveau d\'intérêt pour chaque matière de 1 à 5 (veuillez évaluer au moins 5 matières)'
          }
        </p>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Info" size={16} />
          <span>
            {currentLanguage === 'ar' 
              ? `تم تقييم ${getRatedCount()} من ${subjects.length} مواد`
              : `${getRatedCount()} sur ${subjects.length} matières évaluées`
            }
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {subjects.map((subject) => {
          const currentRating = formData.subjectRatings?.[subject.id] || 0;
          
          return (
            <div key={subject.id} className="p-4 bg-secondary-50 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{subject.emoji}</span>
                  <div>
                    <h4 className="font-caption font-semibold text-text-primary">
                      {getLabel(subject)}
                    </h4>
                    {currentRating > 0 && (
                      <p className="text-sm text-text-secondary">
                        {getRatingLabel(currentRating)} {ratingLabels[currentRating].emoji}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  {currentLanguage === 'ar' ? 'غير مهتم' : 'Pas intéressé'}
                </span>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(subject.id, rating)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-out hover:scale-110 ${
                        currentRating >= rating
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-surface border-secondary-300 text-text-secondary hover:border-primary'
                      }`}
                    >
                      <span className="text-sm font-medium">{rating}</span>
                    </button>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {currentLanguage === 'ar' ? 'شغوف' : 'Passionné'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {errors.subjectRatings && (
        <div className="mb-6 p-3 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-2" />
            {errors.subjectRatings}
          </p>
        </div>
      )}

      {/* Top Rated Subjects Summary */}
      {getRatedCount() >= 3 && (
        <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
          <h4 className="font-caption font-semibold text-success mb-2">
            {currentLanguage === 'ar' ? 'أعلى المواد تقييماً:' : 'Matières les mieux notées:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(formData.subjectRatings || {})
              .filter(([_, rating]) => rating >= 4)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([subjectId, rating]) => {
                const subject = subjects.find(s => s.id === subjectId);
                return (
                  <span
                    key={subjectId}
                    className="inline-flex items-center px-3 py-1 bg-success text-success-foreground rounded-full text-sm font-caption"
                  >
                    <span className="mr-1">{subject.emoji}</span>
                    {getLabel(subject)}
                    <span className="ml-1 font-semibold">({rating}/5)</span>
                  </span>
                );
              })}
          </div>
        </div>
      )}

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

export default SubjectPreferencesStep;