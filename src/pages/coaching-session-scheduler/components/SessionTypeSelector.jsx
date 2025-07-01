import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionTypeSelector = ({ onSessionTypeSelect, selectedSessionType, currentLanguage }) => {
  const getLabel = (frText, arText) => {
    return currentLanguage === 'ar' ? arText : frText;
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString('fr-FR')} MAD`;
  };

  const sessionTypes = [
    {
      id: 'branch-guidance',
      titleFr: 'Orientation de Branche',
      titleAr: 'توجيه الفرع',
      descriptionFr: 'Conseils personnalisés pour choisir votre branche académique en fonction de vos intérêts et aptitudes.',
      descriptionAr: 'نصائح شخصية لاختيار فرعك الأكاديمي بناءً على اهتماماتك وقدراتك.',
      duration: 60,
      price: 200,
      icon: 'BookOpen',
      features: [
        { fr: 'Analyse de profil étudiant', ar: 'تحليل الملف الشخصي للطالب' },
        { fr: 'Recommandations personnalisées', ar: 'توصيات شخصية' },
        { fr: 'Plan d\'action détaillé', ar: 'خطة عمل مفصلة' },
        { fr: 'Ressources pédagogiques', ar: 'موارد تعليمية' }
      ],
      popular: true
    },
    {
      id: 'career-counseling',
      titleFr: 'Conseil en Carrière',
      titleAr: 'استشارة مهنية',
      descriptionFr: 'Exploration des opportunités de carrière et planification de votre parcours professionnel.',
      descriptionAr: 'استكشاف الفرص المهنية وتخطيط مسارك المهني.',
      duration: 45,
      price: 150,
      icon: 'Target',
      features: [
        { fr: 'Exploration des métiers', ar: 'استكشاف المهن' },
        { fr: 'Analyse du marché du travail', ar: 'تحليل سوق العمل' },
        { fr: 'Stratégies de développement', ar: 'استراتيجيات التطوير' },
        { fr: 'Réseau professionnel', ar: 'الشبكة المهنية' }
      ],
      popular: false
    },
    {
      id: 'assessment-review',
      titleFr: 'Révision d\'Évaluation',
      titleAr: 'مراجعة التقييم',
      descriptionFr: 'Analyse détaillée de vos résultats d\'évaluation avec recommandations d\'amélioration.',
      descriptionAr: 'تحليل مفصل لنتائج تقييمك مع توصيات للتحسين.',
      duration: 30,
      price: 100,
      icon: 'ClipboardCheck',
      features: [
        { fr: 'Analyse des résultats', ar: 'تحليل النتائج' },
        { fr: 'Points forts et faibles', ar: 'نقاط القوة والضعف' },
        { fr: 'Plan d\'amélioration', ar: 'خطة التحسين' },
        { fr: 'Suivi personnalisé', ar: 'متابعة شخصية' }
      ],
      popular: false
    }
  ];

  const handleSessionSelect = (sessionType) => {
    onSessionTypeSelect(sessionType);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          {getLabel('Type de Session', 'نوع الجلسة')}
        </h3>
        <p className="text-text-secondary font-body">
          {getLabel(
            'Choisissez le type de coaching qui correspond le mieux à vos besoins',
            'اختر نوع التدريب الذي يناسب احتياجاتك بشكل أفضل'
          )}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {sessionTypes.map((sessionType) => (
          <div
            key={sessionType.id}
            className={`relative bg-surface rounded-lg border-2 transition-all duration-200 ease-out cursor-pointer ${
              selectedSessionType?.id === sessionType.id
                ? 'border-primary shadow-medium'
                : 'border-border hover:border-primary-200 hover:shadow-soft'
            }`}
            onClick={() => handleSessionSelect(sessionType)}
          >
            {sessionType.popular && (
              <div className="absolute -top-3 left-4">
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-caption font-medium">
                  {getLabel('Populaire', 'شائع')}
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedSessionType?.id === sessionType.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary-50 text-primary'
                  }`}>
                    <Icon name={sessionType.icon} size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-text-primary">
                      {getLabel(sessionType.titleFr, sessionType.titleAr)}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary font-caption">
                      <Icon name="Clock" size={14} />
                      <span>{sessionType.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-heading font-semibold text-primary">
                    {formatPrice(sessionType.price)}
                  </div>
                  <div className="text-xs text-text-secondary font-caption">
                    {getLabel('par session', 'لكل جلسة')}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary font-body mb-4 leading-relaxed">
                {getLabel(sessionType.descriptionFr, sessionType.descriptionAr)}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {sessionType.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                    <span className="text-sm text-text-secondary font-caption">
                      {getLabel(feature.fr, feature.ar)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Selection Button */}
              <Button
                variant={selectedSessionType?.id === sessionType.id ? "success" : "outline"}
                fullWidth
                onClick={() => handleSessionSelect(sessionType)}
                iconName={selectedSessionType?.id === sessionType.id ? "Check" : "ArrowRight"}
                iconPosition="right"
              >
                {selectedSessionType?.id === sessionType.id
                  ? getLabel('Sélectionné', 'محدد')
                  : getLabel('Choisir', 'اختيار')
                }
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Session Summary */}
      {selectedSessionType && (
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} className="text-primary" />
              <div>
                <span className="font-caption font-medium text-primary">
                  {getLabel('Session sélectionnée:', 'الجلسة المحددة:')}
                </span>
                <span className="ml-2 font-body text-text-primary">
                  {getLabel(selectedSessionType.titleFr, selectedSessionType.titleAr)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-heading font-semibold text-primary">
                {formatPrice(selectedSessionType.price)}
              </div>
              <div className="text-xs text-text-secondary font-caption">
                {selectedSessionType.duration} min
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionTypeSelector;