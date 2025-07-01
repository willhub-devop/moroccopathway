import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ 
  branch, 
  isTopRecommendation = false, 
  onCompare, 
  onScheduleCoaching, 
  onLearnMore,
  isSelected = false,
  onSelect 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getMatchColor = (percentage) => {
    if (percentage >= 85) return 'text-success bg-success-50 border-success-200';
    if (percentage >= 70) return 'text-accent bg-accent-50 border-accent-200';
    if (percentage >= 55) return 'text-warning bg-warning-50 border-warning-200';
    return 'text-error bg-error-50 border-error-200';
  };

  const getMatchIcon = (percentage) => {
    if (percentage >= 85) return 'CheckCircle';
    if (percentage >= 70) return 'Star';
    if (percentage >= 55) return 'AlertTriangle';
    return 'AlertCircle';
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Facile': return 'text-success bg-success-50';
      case 'Modéré': return 'text-warning bg-warning-50';
      case 'Difficile': return 'text-error bg-error-50';
      default: return 'text-secondary bg-secondary-50';
    }
  };

  return (
    <div className={`bg-surface rounded-lg border transition-all duration-200 ease-out hover:shadow-medium ${
      isTopRecommendation 
        ? 'border-primary-200 shadow-medium ring-1 ring-primary-100' 
        : isSelected 
          ? 'border-primary-300 shadow-soft ring-1 ring-primary-200'
          : 'border-border hover:border-primary-200'
    }`}>
      {/* Top Recommendation Badge */}
      {isTopRecommendation && (
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-t-lg">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Crown" size={16} />
            <span className="text-sm font-caption font-medium">
              Recommandation Principale
            </span>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg md:text-xl font-heading font-semibold text-text-primary">
                {branch.name}
              </h3>
              {onSelect && (
                <button
                  onClick={() => onSelect(branch.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-secondary-300 hover:border-primary'
                  }`}
                >
                  {isSelected && <Icon name="Check" size={12} />}
                </button>
              )}
            </div>
            <p className="text-sm text-text-secondary mb-3">{branch.description}</p>
          </div>
        </div>

        {/* Match Percentage */}
        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border mb-4 ${getMatchColor(branch.matchPercentage)}`}>
          <Icon name={getMatchIcon(branch.matchPercentage)} size={16} />
          <span className="font-caption font-semibold">{branch.matchPercentage}% de compatibilité</span>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Subjects */}
          <div>
            <h4 className="text-sm font-caption font-medium text-text-primary mb-2">
              Matières Principales
            </h4>
            <div className="flex flex-wrap gap-2">
              {branch.keySubjects.slice(0, 3).map((subject, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-caption rounded"
                >
                  {subject}
                </span>
              ))}
              {branch.keySubjects.length > 3 && (
                <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-caption rounded">
                  +{branch.keySubjects.length - 3} autres
                </span>
              )}
            </div>
          </div>

          {/* Difficulty & Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-caption text-text-secondary">Difficulté:</span>
              <span className={`px-2 py-1 text-xs font-caption rounded ${getDifficultyColor(branch.difficulty)}`}>
                {branch.difficulty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-caption text-text-secondary">Durée:</span>
              <span className="text-sm font-caption text-text-primary">{branch.duration}</span>
            </div>
          </div>
        </div>

        {/* Career Prospects Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-caption font-medium text-text-primary mb-2">
            Perspectives de Carrière
          </h4>
          <div className="flex flex-wrap gap-2">
            {branch.careerProspects.slice(0, 2).map((career, index) => (
              <div key={index} className="flex items-center space-x-2 bg-accent-50 px-3 py-1 rounded-lg">
                <Icon name="Briefcase" size={14} className="text-accent" />
                <span className="text-sm font-caption text-accent-700">{career}</span>
              </div>
            ))}
            {branch.careerProspects.length > 2 && (
              <span className="text-sm font-caption text-text-secondary">
                +{branch.careerProspects.length - 2} autres métiers
              </span>
            )}
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="border-t border-border-muted pt-4 mb-4 animate-slide-down">
            {/* Required Grades */}
            <div className="mb-4">
              <h4 className="text-sm font-caption font-medium text-text-primary mb-2">
                Notes Requises
              </h4>
              <div className="bg-secondary-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-caption text-text-secondary">Moyenne Générale:</span>
                  <span className="text-sm font-caption font-medium text-text-primary">
                    {branch.requiredGrades.average}/20
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-caption text-text-secondary">Matières Clés:</span>
                  <span className="text-sm font-caption font-medium text-text-primary">
                    {branch.requiredGrades.keySubjects}/20
                  </span>
                </div>
              </div>
            </div>

            {/* University Pathways */}
            <div className="mb-4">
              <h4 className="text-sm font-caption font-medium text-text-primary mb-2">
                Parcours Universitaires
              </h4>
              <div className="space-y-2">
                {branch.universityPathways.map((pathway, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="GraduationCap" size={14} className="text-primary" />
                    <span className="text-sm font-caption text-text-primary">{pathway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Market Stats */}
            <div>
              <h4 className="text-sm font-caption font-medium text-text-primary mb-2">
                Statistiques du Marché
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-success-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="TrendingUp" size={14} className="text-success" />
                    <span className="text-xs font-caption text-success-700">Demande</span>
                  </div>
                  <span className="text-sm font-caption font-semibold text-success-800">
                    {branch.jobMarket.demand}
                  </span>
                </div>
                <div className="bg-accent-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="DollarSign" size={14} className="text-accent" />
                    <span className="text-xs font-caption text-accent-700">Salaire Moyen</span>
                  </div>
                  <span className="text-sm font-caption font-semibold text-accent-800">
                    {branch.jobMarket.averageSalary}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="flex-1"
          >
            {isExpanded ? 'Voir Moins' : 'En Savoir Plus'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onScheduleCoaching(branch.id)}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Programmer Coaching
          </Button>
          
          {isTopRecommendation && (
            <Button
              variant="primary"
              onClick={() => onLearnMore(branch.id)}
              iconName="ArrowRight"
              iconPosition="right"
              className="flex-1"
            >
              Profil Complet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;