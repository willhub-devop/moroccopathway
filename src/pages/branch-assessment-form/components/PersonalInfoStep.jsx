import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInfoStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = currentLanguage === 'ar' ? 'الاسم الأول مطلوب' : 'Le prénom est requis';
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = currentLanguage === 'ar' ? 'اسم العائلة مطلوب' : 'Le nom de famille est requis';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = currentLanguage === 'ar' ? 'البريد الإلكتروني مطلوب' : 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = currentLanguage === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Format d\'email invalide';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = currentLanguage === 'ar' ? 'تاريخ الميلاد مطلوب' : 'La date de naissance est requise';
    }
    
    if (!formData.city?.trim()) {
      newErrors.city = currentLanguage === 'ar' ? 'المدينة مطلوبة' : 'La ville est requise';
    }
    
    if (!formData.currentLevel) {
      newErrors.currentLevel = currentLanguage === 'ar' ? 'المستوى الحالي مطلوب' : 'Le niveau actuel est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const educationLevels = [
    { value: 'premiere', labelFr: 'Première année Baccalauréat', labelAr: 'السنة الأولى بكالوريا' },
    { value: 'terminale', labelFr: 'Deuxième année Baccalauréat', labelAr: 'السنة الثانية بكالوريا' },
    { value: 'post_bac', labelFr: 'Post-Baccalauréat', labelAr: 'ما بعد البكالوريا' }
  ];

  const moroccanCities = [
    'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Agadir', 'Tanger', 'Meknès', 'Oujda', 
    'Kenitra', 'Tétouan', 'Safi', 'Mohammedia', 'Khouribga', 'Beni Mellal', 'El Jadida'
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-surface rounded-lg shadow-soft">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ? 'المعلومات الشخصية' : 'Informations Personnelles'}
        </h3>
        <p className="text-text-secondary font-body">
          {currentLanguage === 'ar' ?'يرجى تقديم معلوماتك الأساسية لبدء التقييم' :'Veuillez fournir vos informations de base pour commencer l\'évaluation'
          }
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'الاسم الأول' : 'Prénom'} *
            </label>
            <Input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'أدخل اسمك الأول' : 'Entrez votre prénom'}
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-error' : ''}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'اسم العائلة' : 'Nom de famille'} *
            </label>
            <Input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'أدخل اسم عائلتك' : 'Entrez votre nom de famille'}
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-error' : ''}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Adresse email'} *
          </label>
          <Input
            type="email"
            placeholder={currentLanguage === 'ar' ? 'exemple@email.com' : 'exemple@email.com'}
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Birth Date and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'تاريخ الميلاد' : 'Date de naissance'} *
            </label>
            <Input
              type="date"
              value={formData.birthDate || ''}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className={errors.birthDate ? 'border-error' : ''}
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.birthDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'المدينة' : 'Ville'} *
            </label>
            <select
              value={formData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg font-body text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.city ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">
                {currentLanguage === 'ar' ? 'اختر مدينتك' : 'Sélectionnez votre ville'}
              </option>
              {moroccanCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'المستوى التعليمي الحالي' : 'Niveau d\'éducation actuel'} *
          </label>
          <div className="space-y-2">
            {educationLevels.map(level => (
              <label key={level.value} className="flex items-center p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer transition-colors duration-200">
                <input
                  type="radio"
                  name="currentLevel"
                  value={level.value}
                  checked={formData.currentLevel === level.value}
                  onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="font-body text-text-primary">
                  {currentLanguage === 'ar' ? level.labelAr : level.labelFr}
                </span>
              </label>
            ))}
          </div>
          {errors.currentLevel && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.currentLevel}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="secondary"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          disabled
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

export default PersonalInfoStep;