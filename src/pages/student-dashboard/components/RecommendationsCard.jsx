import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsCard = ({ recommendations }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleViewAllRecommendations = () => {
    navigate('/branch-recommendations');
  };

  const getMatchPercentageColor = (percentage) => {
    if (percentage >= 80) return 'text-success bg-success-100';
    if (percentage >= 60) return 'text-warning bg-warning-100';
    return 'text-error bg-error-100';
  };

  const getBranchIcon = (category) => {
    switch (category) {
      case 'sciences':
        return 'Microscope';
      case 'literature':
        return 'BookOpen';
      case 'economics':
        return 'TrendingUp';
      case 'technology':
        return 'Cpu';
      case 'arts':
        return 'Palette';
      default:
        return 'GraduationCap';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          {currentLanguage === 'ar' ? 'التوصيات الحديثة' : 'Recommandations récentes'}
        </h2>
        <Button
          variant="ghost"
          iconName="ArrowRight"
          iconSize={16}
          onClick={handleViewAllRecommendations}
          className="text-primary hover:bg-primary-50"
        >
          {currentLanguage === 'ar' ? 'عرض الكل' : 'Voir tout'}
        </Button>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Target" size={24} className="text-secondary-500" />
          </div>
          <p className="text-text-secondary font-caption mb-4">
            {currentLanguage === 'ar' ?'أكمل التقييم للحصول على توصيات مخصصة' :'Complétez l\'évaluation pour obtenir des recommandations personnalisées'
            }
          </p>
          <Button
            variant="primary"
            iconName="ClipboardList"
            iconPosition="left"
            onClick={() => navigate('/branch-assessment-form')}
          >
            {currentLanguage === 'ar' ? 'بدء التقييم' : 'Commencer l\'évaluation'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.slice(0, 3).map((recommendation, index) => (
            <div
              key={recommendation.id}
              className={`border rounded-lg p-4 transition-all duration-200 ease-out hover:border-primary-200 hover:bg-primary-50/30 ${
                index === 0 ? 'border-primary-200 bg-primary-50/20' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary-100 text-secondary-600'
                  }`}>
                    <Icon name={getBranchIcon(recommendation.category)} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-caption font-medium text-text-primary truncate">
                        {currentLanguage === 'ar' ? recommendation.nameAr : recommendation.nameFr}
                      </h3>
                      {index === 0 && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-caption">
                          {currentLanguage === 'ar' ? 'الأفضل' : 'Meilleur'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary font-caption mb-2 line-clamp-2">
                      {currentLanguage === 'ar' ? recommendation.descriptionAr : recommendation.descriptionFr}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <span className="flex items-center">
                        <Icon name="Users" size={12} className="mr-1" />
                        {recommendation.studentsCount} {currentLanguage === 'ar' ? 'طالب' : 'étudiants'}
                      </span>
                      <span className="flex items-center">
                        <Icon name="TrendingUp" size={12} className="mr-1" />
                        {recommendation.employmentRate}% {currentLanguage === 'ar' ? 'توظيف' : 'emploi'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <span className={`text-xs font-caption px-2 py-1 rounded-full ${getMatchPercentageColor(recommendation.matchPercentage)}`}>
                    {recommendation.matchPercentage}% {currentLanguage === 'ar' ? 'تطابق' : 'match'}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < recommendation.rating ? 'text-accent fill-current' : 'text-secondary-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {recommendations.length > 3 && (
            <Button
              variant="ghost"
              fullWidth
              iconName="ChevronDown"
              iconPosition="right"
              onClick={handleViewAllRecommendations}
              className="text-primary hover:bg-primary-50"
            >
              {currentLanguage === 'ar' 
                ? `عرض ${recommendations.length - 3} توصيات أخرى` 
                : `Voir ${recommendations.length - 3} autres recommandations`
              }
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationsCard;