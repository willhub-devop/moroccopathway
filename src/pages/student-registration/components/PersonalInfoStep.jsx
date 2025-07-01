import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalInfoStep = ({ formData, onUpdateData, onNext, errors = {} }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [localData, setLocalData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdateData(updatedData);
  };

  const handleNext = () => {
    onNext();
  };

  const isFormValid = () => {
    return localData.firstName.trim() && 
           localData.lastName.trim() && 
           localData.email.trim() && 
           localData.phone.trim() &&
           Object.keys(errors).length === 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ?'المعلومات الشخصية' :'Informations Personnelles'
          }
        </h3>
        <p className="text-sm font-caption text-text-secondary">
          {currentLanguage === 'ar' ?'أدخل معلوماتك الأساسية للمتابعة' :'Entrez vos informations de base pour continuer'
          }
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'الاسم الأول' : 'Prénom'} *
            </label>
            <Input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'أدخل اسمك الأول' : 'Entrez votre prénom'}
              value={localData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-error' : ''}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-error font-caption">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'اسم العائلة' : 'Nom de famille'} *
            </label>
            <Input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'أدخل اسم عائلتك' : 'Entrez votre nom de famille'}
              value={localData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-error' : ''}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-error font-caption">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Adresse e-mail'} *
          </label>
          <Input
            type="email"
            placeholder={currentLanguage === 'ar' ? 'exemple@email.com' : 'exemple@email.com'}
            value={localData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-error font-caption">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'} *
          </label>
          <Input
            type="tel"
            placeholder={currentLanguage === 'ar' ? '+212 6XX XXX XXX' : '+212 6XX XXX XXX'}
            value={localData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-error' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-error font-caption">{errors.phone}</p>
          )}
          <p className="mt-1 text-xs text-text-muted font-caption">
            {currentLanguage === 'ar' ?'سنستخدم هذا الرقم لإرسال تحديثات مهمة' :'Nous utiliserons ce numéro pour envoyer des mises à jour importantes'
            }
          </p>
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isFormValid()}
          className="w-full"
          size="lg"
        >
          {currentLanguage === 'ar' ? 'التالي' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;