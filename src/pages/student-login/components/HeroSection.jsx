import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const getText = (key) => {
    const texts = {
      welcomeBack: {
        fr: 'Bon retour !',
        ar: 'مرحباً بعودتك!'
      },
      subtitle: {
        fr: 'Continuez votre parcours vers l\'excellence académique',
        ar: 'تابع رحلتك نحو التميز الأكاديمي'
      },
      description: {
        fr: 'Accédez à votre tableau de bord personnalisé, consultez vos recommandations et planifiez vos sessions de coaching.',
        ar: 'ادخل إلى لوحة التحكم الشخصية، اطلع على توصياتك وخطط لجلسات التدريب.'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.fr || '';
  };

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      alt: "Étudiants marocains étudiant ensemble"
    },
    {
      src: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?w=800&h=600&fit=crop",
      alt: "Étudiant utilisant un ordinateur portable"
    },
    {
      src: "https://images.pixabay.com/photo/2016/11/29/06/15/student-1867431_1280.jpg?w=800&h=600&fit=crop",
      alt: "Étudiants dans une bibliothèque"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 py-16">
        {/* Hero Image */}
        <div className="mb-8 relative">
          <div className="w-full h-64 rounded-2xl overflow-hidden shadow-large">
            <Image
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover transition-all duration-1000 ease-out"
            />
          </div>
          
          {/* Image Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-secondary-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
              {getText('welcomeBack')}
            </h2>
            <p className="text-xl font-body text-primary font-medium">
              {getText('subtitle')}
            </p>
          </div>

          <p className="text-text-secondary font-body leading-relaxed">
            {getText('description')}
          </p>

          {/* Success Stats */}
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary">15,000+</div>
              <div className="text-sm font-caption text-text-secondary">
                {currentLanguage === 'ar' ? 'طالب مسجل' : 'Étudiants inscrits'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-success">92%</div>
              <div className="text-sm font-caption text-text-secondary">
                {currentLanguage === 'ar' ? 'معدل النجاح' : 'Taux de réussite'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;