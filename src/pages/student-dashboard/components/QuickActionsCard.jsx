import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = ({ assessmentStatus, hasRecommendations }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const quickActions = [
    {
      id: 'assessment',
      titleFr: assessmentStatus === 'completed' ? 'Refaire l\'évaluation' : 'Continuer l\'évaluation',
      titleAr: assessmentStatus === 'completed' ? 'إعادة التقييم' : 'متابعة التقييم',
      descriptionFr: assessmentStatus === 'completed' ?'Mettre à jour vos préférences et intérêts' :'Complétez votre profil pour des recommandations personnalisées',
      descriptionAr: assessmentStatus === 'completed' ?'تحديث تفضيلاتك واهتماماتك' :'أكمل ملفك الشخصي للحصول على توصيات مخصصة',
      icon: 'ClipboardList',
      color: 'primary',
      route: '/branch-assessment-form',
      priority: assessmentStatus !== 'completed' ? 'high' : 'normal'
    },
    {
      id: 'coaching',
      titleFr: 'Planifier une session',
      titleAr: 'جدولة جلسة',
      descriptionFr: 'Réservez un créneau avec un conseiller d\'orientation',
      descriptionAr: 'احجز موعداً مع مستشار التوجيه',
      icon: 'Calendar',
      color: 'accent',
      route: '/coaching-session-scheduler',
      priority: 'normal'
    },
    {
      id: 'recommendations',
      titleFr: 'Explorer les branches',
      titleAr: 'استكشاف الفروع',
      descriptionFr: hasRecommendations 
        ? 'Comparez vos recommandations personnalisées' :'Découvrez les différentes options académiques',
      descriptionAr: hasRecommendations
        ? 'قارن توصياتك المخصصة' :'اكتشف الخيارات الأكاديمية المختلفة',
      icon: 'Target',
      color: 'success',
      route: '/branch-recommendations',
      priority: hasRecommendations ? 'high' : 'normal',
      disabled: !hasRecommendations && assessmentStatus !== 'completed'
    }
  ];

  const handleActionClick = (action) => {
    if (action.disabled) return;
    navigate(action.route);
  };

  const getButtonVariant = (action) => {
    if (action.disabled) return 'outline';
    if (action.priority === 'high') return action.color;
    return 'outline';
  };

  const getActionTitle = (action) => {
    return currentLanguage === 'ar' ? action.titleAr : action.titleFr;
  };

  const getActionDescription = (action) => {
    return currentLanguage === 'ar' ? action.descriptionAr : action.descriptionFr;
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          {currentLanguage === 'ar' ? 'إجراءات سريعة' : 'Actions rapides'}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className={`relative p-4 rounded-lg border transition-all duration-200 ease-out ${
              action.disabled 
                ? 'border-secondary-200 bg-secondary-50 opacity-60' 
                : action.priority === 'high' ?'border-primary-200 bg-primary-50/30 hover:border-primary-300 hover:bg-primary-50/50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
            }`}
          >
            {action.priority === 'high' && !action.disabled && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-error rounded-full animate-pulse" />
            )}
            
            <div className="flex items-start space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action.disabled 
                  ? 'bg-secondary-200 text-secondary-500'
                  : action.priority === 'high'
                  ? `bg-${action.color} text-${action.color}-foreground`
                  : `bg-${action.color}-100 text-${action.color}-600`
              }`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-caption font-medium mb-1 ${
                  action.disabled ? 'text-text-muted' : 'text-text-primary'
                }`}>
                  {getActionTitle(action)}
                </h3>
                <p className={`text-sm font-caption leading-relaxed ${
                  action.disabled ? 'text-text-muted' : 'text-text-secondary'
                }`}>
                  {getActionDescription(action)}
                </p>
              </div>
            </div>
            
            <Button
              variant={getButtonVariant(action)}
              size="sm"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => handleActionClick(action)}
              disabled={action.disabled}
              className={action.priority === 'high' && !action.disabled ? 'shadow-soft' : ''}
            >
              {currentLanguage === 'ar' ? 'ابدأ' : 'Commencer'}
            </Button>
            
            {action.disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface/80 rounded-lg">
                <span className="text-xs font-caption text-text-muted bg-surface px-2 py-1 rounded border">
                  {currentLanguage === 'ar' ? 'أكمل التقييم أولاً' : 'Complétez l\'évaluation d\'abord'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;