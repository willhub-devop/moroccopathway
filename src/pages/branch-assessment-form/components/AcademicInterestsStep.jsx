import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AcademicInterestsStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const academicFields = [
    {
      id: 'sciences',
      labelFr: 'Sciences et Mathématiques',
      labelAr: 'العلوم والرياضيات',
      descriptionFr: 'Physique, Chimie, Biologie, Mathématiques',
      descriptionAr: 'الفيزياء، الكيمياء، الأحياء، الرياضيات',
      icon: 'Atom',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 'literature',
      labelFr: 'Littérature et Langues',
      labelAr: 'الأدب واللغات',
      descriptionFr: 'Français, Arabe, Anglais, Littérature',
      descriptionAr: 'الفرنسية، العربية، الإنجليزية، الأدب',
      icon: 'BookOpen',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    {
      id: 'economics',
      labelFr: 'Économie et Gestion',
      labelAr: 'الاقتصاد والإدارة',
      descriptionFr: 'Économie, Comptabilité, Management',
      descriptionAr: 'الاقتصاد، المحاسبة، الإدارة',
      icon: 'TrendingUp',
      color: 'bg-amber-50 border-amber-200 text-amber-700'
    },
    {
      id: 'technology',
      labelFr: 'Sciences et Technologies',
      labelAr: 'العلوم والتكنولوجيا',
      descriptionFr: 'Informatique, Ingénierie, Technologies',
      descriptionAr: 'المعلوماتية، الهندسة، التكنولوجيا',
      icon: 'Cpu',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    {
      id: 'arts',
      labelFr: 'Arts et Design',
      labelAr: 'الفنون والتصميم',
      descriptionFr: 'Arts plastiques, Design, Architecture',
      descriptionAr: 'الفنون التشكيلية، التصميم، العمارة',
      icon: 'Palette',
      color: 'bg-pink-50 border-pink-200 text-pink-700'
    },
    {
      id: 'social',
      labelFr: 'Sciences Humaines et Sociales',
      labelAr: 'العلوم الإنسانية والاجتماعية',
      descriptionFr: 'Histoire, Géographie, Philosophie, Sociologie',
      descriptionAr: 'التاريخ، الجغرافيا، الفلسفة، علم الاجتماع',
      icon: 'Users',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700'
    }
  ];

  const handleFieldToggle = (fieldId) => {
    const currentInterests = formData.academicInterests || [];
    const updatedInterests = currentInterests.includes(fieldId)
      ? currentInterests.filter(id => id !== fieldId)
      : [...currentInterests, fieldId];
    
    onUpdate({ academicInterests: updatedInterests });
    
    if (errors.academicInterests) {
      setErrors(prev => ({ ...prev, academicInterests: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.academicInterests || formData.academicInterests.length === 0) {
      newErrors.academicInterests = currentLanguage === 'ar' ?'يرجى اختيار مجال واحد على الأقل' :'Veuillez sélectionner au moins un domaine d\'intérêt';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getLabel = (field) => {
    return currentLanguage === 'ar' ? field.labelAr : field.labelFr;
  };

  const getDescription = (field) => {
    return currentLanguage === 'ar' ? field.descriptionAr : field.descriptionFr;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface rounded-lg shadow-soft">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ? 'الاهتمامات الأكاديمية' : 'Intérêts Académiques'}
        </h3>
        <p className="text-text-secondary font-body">
          {currentLanguage === 'ar' ?'اختر المجالات الأكاديمية التي تثير اهتمامك أكثر (يمكنك اختيار عدة مجالات)' :'Sélectionnez les domaines académiques qui vous intéressent le plus (vous pouvez choisir plusieurs domaines)'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {academicFields.map((field) => {
          const isSelected = formData.academicInterests?.includes(field.id);
          
          return (
            <button
              key={field.id}
              onClick={() => handleFieldToggle(field.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ease-out text-left hover:scale-105 ${
                isSelected
                  ? `${field.color} border-current shadow-medium`
                  : 'bg-surface border-border hover:border-primary hover:bg-primary-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white bg-opacity-50' : 'bg-secondary-100'}`}>
                  <Icon 
                    name={field.icon} 
                    size={20} 
                    className={isSelected ? 'text-current' : 'text-text-secondary'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-caption font-semibold mb-1 ${
                    isSelected ? 'text-current' : 'text-text-primary'
                  }`}>
                    {getLabel(field)}
                  </h4>
                  <p className={`text-sm ${
                    isSelected ? 'text-current opacity-80' : 'text-text-secondary'
                  }`}>
                    {getDescription(field)}
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

      {errors.academicInterests && (
        <div className="mb-6 p-3 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-2" />
            {errors.academicInterests}
          </p>
        </div>
      )}

      {/* Selected Interests Summary */}
      {formData.academicInterests && formData.academicInterests.length > 0 && (
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <h4 className="font-caption font-semibold text-primary mb-2">
            {currentLanguage === 'ar' ? 'المجالات المختارة:' : 'Domaines sélectionnés:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {formData.academicInterests.map(interestId => {
              const field = academicFields.find(f => f.id === interestId);
              return (
                <span
                  key={interestId}
                  className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-caption"
                >
                  <Icon name={field.icon} size={14} className="mr-1" />
                  {getLabel(field)}
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

export default AcademicInterestsStep;