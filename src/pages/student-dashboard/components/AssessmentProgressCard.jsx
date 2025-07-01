import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentProgressCard = ({ assessmentData }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleContinueAssessment = () => {
    navigate('/branch-assessment-form');
  };

  const handleViewRecommendations = () => {
    navigate('/branch-recommendations');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'in-progress':
        return <Icon name="Clock" size={16} className="text-warning" />;
      case 'pending':
        return <Icon name="Circle" size={16} className="text-secondary-400" />;
      default:
        return <Icon name="Circle" size={16} className="text-secondary-400" />;
    }
  };

  const getStatusText = (status) => {
    if (currentLanguage === 'ar') {
      switch (status) {
        case 'completed':
          return 'مكتمل';
        case 'in-progress':
          return 'قيد التقدم';
        case 'pending':
          return 'في الانتظار';
        default:
          return 'في الانتظار';
      }
    } else {
      switch (status) {
        case 'completed':
          return 'Terminé';
        case 'in-progress':
          return 'En cours';
        case 'pending':
          return 'En attente';
        default:
          return 'En attente';
      }
    }
  };

  const completedCount = assessmentData.sections.filter(s => s.status === 'completed').length;
  const totalCount = assessmentData.sections.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="bg-surface rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary flex items-center">
          <Icon name="ClipboardList" size={20} className="mr-2 text-primary" />
          {currentLanguage === 'ar' ? 'تقدم التقييم' : 'Progression de l\'évaluation'}
        </h2>
        <div className="text-sm font-caption text-text-secondary">
          {completedCount}/{totalCount}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption text-text-secondary">
            {currentLanguage === 'ar' ? 'التقدم الإجمالي' : 'Progression globale'}
          </span>
          <span className="text-sm font-caption font-medium text-text-primary">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Assessment Sections */}
      <div className="space-y-3 mb-6">
        {assessmentData.sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ease-out ${
              section.status === 'completed' 
                ? 'bg-success-50 border-success-200' 
                : section.status === 'in-progress' ?'bg-warning-50 border-warning-200' :'bg-secondary-50 border-secondary-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(section.status)}
              <div>
                <h3 className="text-sm font-caption font-medium text-text-primary">
                  {currentLanguage === 'ar' ? section.titleAr : section.titleFr}
                </h3>
                <p className="text-xs text-text-secondary">
                  {getStatusText(section.status)}
                </p>
              </div>
            </div>
            <div className="text-xs font-caption text-text-muted">
              {currentLanguage === 'ar' ? `الخطوة ${index + 1}` : `Étape ${index + 1}`}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {completedCount < totalCount ? (
          <Button
            variant="primary"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            onClick={handleContinueAssessment}
          >
            {currentLanguage === 'ar' ? 'متابعة التقييم' : 'Continuer l\'évaluation'}
          </Button>
        ) : (
          <Button
            variant="success"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={handleViewRecommendations}
          >
            {currentLanguage === 'ar' ? 'عرض التوصيات' : 'Voir les recommandations'}
          </Button>
        )}
        
        {completedCount > 0 && (
          <Button
            variant="outline"
            fullWidth
            iconName="BarChart3"
            iconPosition="left"
            onClick={handleViewRecommendations}
          >
            {currentLanguage === 'ar' ? 'عرض النتائج الجزئية' : 'Voir les résultats partiels'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessmentProgressCard;