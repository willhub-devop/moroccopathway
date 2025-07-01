import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getText = (key) => {
    const texts = {
      email: {
        fr: 'Adresse e-mail',
        ar: 'عنوان البريد الإلكتروني'
      },
      password: {
        fr: 'Mot de passe',
        ar: 'كلمة المرور'
      },
      emailPlaceholder: {
        fr: 'votre.email@exemple.com',
        ar: 'your.email@example.com'
      },
      passwordPlaceholder: {
        fr: 'Entrez votre mot de passe',
        ar: 'أدخل كلمة المرور'
      },
      signIn: {
        fr: 'Se Connecter',
        ar: 'تسجيل الدخول'
      },
      forgotPassword: {
        fr: 'Mot de passe oublié ?',
        ar: 'نسيت كلمة المرور؟'
      },
      emailRequired: {
        fr: 'L\'adresse e-mail est requise',
        ar: 'عنوان البريد الإلكتروني مطلوب'
      },
      emailInvalid: {
        fr: 'Veuillez entrer une adresse e-mail valide',
        ar: 'يرجى إدخال عنوان بريد إلكتروني صحيح'
      },
      passwordRequired: {
        fr: 'Le mot de passe est requis',
        ar: 'كلمة المرور مطلوبة'
      },
      passwordMinLength: {
        fr: 'Le mot de passe doit contenir au moins 6 caractères',
        ar: 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل'
      },
      invalidCredentials: {
        fr: 'Identifiants incorrects. Veuillez réessayer.',
        ar: 'بيانات اعتماد غير صحيحة. يرجى المحاولة مرة أخرى.'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = getText('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = getText('emailInvalid');
    }

    // Password validation
    if (!formData.password) {
      errors.password = getText('passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = getText('passwordMinLength');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert(currentLanguage === 'ar' ?'سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' :'Un lien de réinitialisation sera envoyé à votre adresse e-mail'
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Global Error Message */}
      {error && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm font-caption text-error">
              {error === 'invalid_credentials' ? getText('invalidCredentials') : error}
            </p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-caption font-medium text-text-primary">
          {getText('email')} <span className="text-error">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder={getText('emailPlaceholder')}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`${validationErrors.email ? 'border-error focus:border-error' : ''}`}
          required
        />
        {validationErrors.email && (
          <p className="text-sm text-error font-caption flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{validationErrors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-caption font-medium text-text-primary">
          {getText('password')} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={getText('passwordPlaceholder')}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`pr-12 ${validationErrors.password ? 'border-error focus:border-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {validationErrors.password && (
          <p className="text-sm text-error font-caption flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{validationErrors.password}</span>
          </p>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-caption text-primary hover:text-primary-700 transition-colors duration-200"
        >
          {getText('forgotPassword')}
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {getText('signIn')}
      </Button>
    </form>
  );
};

export default LoginForm;