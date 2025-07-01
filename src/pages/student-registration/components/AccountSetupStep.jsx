import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSetupStep = ({ formData, onUpdateData, onPrevious, onSubmit, errors = {}, isLoading = false }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [localData, setLocalData] = useState({
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
    acceptTerms: formData.acceptTerms || false,
    acceptNewsletter: formData.acceptNewsletter || false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdateData(updatedData);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;

    const labels = {
      fr: ['', 'Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'],
      ar: ['', 'ضعيف جداً', 'ضعيف', 'متوسط', 'قوي', 'قوي جداً']
    };

    return {
      strength,
      label: labels[currentLanguage][strength],
      checks
    };
  };

  const passwordStrength = getPasswordStrength(localData.password);

  const isFormValid = () => {
    return localData.password && 
           localData.confirmPassword && 
           localData.password === localData.confirmPassword &&
           localData.acceptTerms &&
           passwordStrength.strength >= 3 &&
           Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ?'إعداد الحساب' :'Configuration du Compte'
          }
        </h3>
        <p className="text-sm font-caption text-text-secondary">
          {currentLanguage === 'ar' ?'أنشئ كلمة مرور آمنة لحسابك' :'Créez un mot de passe sécurisé pour votre compte'
          }
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'كلمة المرور' : 'Mot de passe'} *
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={currentLanguage === 'ar' ? 'أدخل كلمة مرور قوية' : 'Entrez un mot de passe fort'}
              value={localData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`pr-12 ${errors.password ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors duration-200"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
          
          {localData.password && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-secondary-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.strength <= 2 ? 'bg-error' :
                      passwordStrength.strength === 3 ? 'bg-warning' :
                      passwordStrength.strength === 4 ? 'bg-success': 'bg-success'
                    }`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-caption text-text-secondary min-w-16">
                  {passwordStrength.label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs font-caption">
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.length ? 'text-success' : 'text-text-muted'}`}>
                  <Icon name={passwordStrength.checks.length ? 'Check' : 'X'} size={12} />
                  <span>{currentLanguage === 'ar' ? '8+ أحرف' : '8+ caractères'}</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.uppercase ? 'text-success' : 'text-text-muted'}`}>
                  <Icon name={passwordStrength.checks.uppercase ? 'Check' : 'X'} size={12} />
                  <span>{currentLanguage === 'ar' ? 'حرف كبير' : 'Majuscule'}</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.lowercase ? 'text-success' : 'text-text-muted'}`}>
                  <Icon name={passwordStrength.checks.lowercase ? 'Check' : 'X'} size={12} />
                  <span>{currentLanguage === 'ar' ? 'حرف صغير' : 'Minuscule'}</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.checks.numbers ? 'text-success' : 'text-text-muted'}`}>
                  <Icon name={passwordStrength.checks.numbers ? 'Check' : 'X'} size={12} />
                  <span>{currentLanguage === 'ar' ? 'رقم' : 'Chiffre'}</span>
                </div>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-xs text-error font-caption">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'} *
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={currentLanguage === 'ar' ? 'أعد إدخال كلمة المرور' : 'Ressaisissez le mot de passe'}
              value={localData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`pr-12 ${errors.confirmPassword ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors duration-200"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
          
          {localData.confirmPassword && localData.password !== localData.confirmPassword && (
            <p className="mt-1 text-xs text-error font-caption">
              {currentLanguage === 'ar' ?'كلمات المرور غير متطابقة' :'Les mots de passe ne correspondent pas'
              }
            </p>
          )}
          
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-error font-caption">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Input
              type="checkbox"
              checked={localData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="text-sm font-caption text-text-primary">
                {currentLanguage === 'ar' ?'أوافق على ' :'J\'accepte les '
                }
                <button className="text-primary hover:underline font-medium">
                  {currentLanguage === 'ar' ?'الشروط والأحكام' :'conditions d\'utilisation'
                  }
                </button>
                {currentLanguage === 'ar' ? ' و' : ' et la '}
                <button className="text-primary hover:underline font-medium">
                  {currentLanguage === 'ar' ?'سياسة الخصوصية' :'politique de confidentialité'
                  }
                </button>
                {currentLanguage === 'ar' ? '' : ' *'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Input
              type="checkbox"
              checked={localData.acceptNewsletter}
              onChange={(e) => handleInputChange('acceptNewsletter', e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="text-sm font-caption text-text-secondary">
                {currentLanguage === 'ar' ?'أرغب في تلقي النشرة الإخبارية والتحديثات حول الفرص التعليمية' :'Je souhaite recevoir la newsletter et les mises à jour sur les opportunités éducatives'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isLoading}
          className="w-full sm:w-auto"
          size="lg"
        >
          {currentLanguage === 'ar' ? 'السابق' : 'Précédent'}
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          loading={isLoading}
          className="w-full sm:flex-1"
          size="lg"
        >
          {currentLanguage === 'ar' ? 'إنشاء الحساب' : 'Créer le Compte'}
        </Button>
      </div>
    </div>
  );
};

export default AccountSetupStep;