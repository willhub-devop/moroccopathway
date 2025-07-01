import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegistrationPrompt = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getText = (key) => {
    const texts = {
      noAccount: {
        fr: 'Vous n\'avez pas encore de compte ?',
        ar: 'ليس لديك حساب بعد؟'
      },
      createAccount: {
        fr: 'Créer un compte',
        ar: 'إنشاء حساب'
      },
      joinDescription: {
        fr: 'Rejoignez des milliers d\'étudiants marocains qui ont trouvé leur voie académique grâce à nos conseils personnalisés.',
        ar: 'انضم إلى آلاف الطلاب المغاربة الذين وجدوا مسارهم الأكاديمي من خلال نصائحنا الشخصية.'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  const handleCreateAccount = () => {
    navigate('/student-registration');
  };

  return (
    <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {getText('noAccount')}
        </h3>
        <p className="text-sm font-body text-text-secondary leading-relaxed">
          {getText('joinDescription')}
        </p>
        <Button
          variant="outline"
          onClick={handleCreateAccount}
          className="w-full sm:w-auto"
        >
          {getText('createAccount')}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationPrompt;