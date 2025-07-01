import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsHeader = ({ 
  totalRecommendations = 0,
  onRetakeAssessment,
  onToggleFilters,
  onToggleComparison,
  onSortChange,
  currentSort = 'match',
  selectedCount = 0,
  showFilters = false,
  showComparison = false
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const sortOptions = [
    { value: 'match', label: 'Compatibilité', icon: 'Target' },
    { value: 'difficulty', label: 'Difficulté', icon: 'BarChart3' },
    { value: 'demand', label: 'Demande Marché', icon: 'TrendingUp' },
    { value: 'duration', label: 'Durée', icon: 'Clock' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : 'Compatibilité';
  };

  return (
    <div className="bg-surface border-b border-border-muted">
      <div className="px-4 md:px-6 py-4">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
              Recommandations Personnalisées
            </h1>
            <p className="text-text-secondary font-caption">
              Basées sur votre évaluation académique • {totalRecommendations} branches recommandées
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={onRetakeAssessment}
              iconName="RotateCcw"
              iconPosition="left"
              size="sm"
            >
              Refaire l'Évaluation
            </Button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "primary" : "outline"}
              onClick={onToggleFilters}
              iconName="Filter"
              iconPosition="left"
              size="sm"
            >
              <span className="hidden sm:inline">Filtres</span>
            </Button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm font-caption text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Trier par {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none" 
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Comparison Toggle */}
            <Button
              variant={showComparison ? "primary" : "outline"}
              onClick={onToggleComparison}
              iconName="GitCompare"
              iconPosition="left"
              size="sm"
            >
              <span className="hidden sm:inline">Comparer</span>
              {selectedCount > 0 && (
                <span className="ml-1 bg-primary-600 text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {selectedCount}
                </span>
              )}
            </Button>

            {/* Export Button */}
            <Button
              variant="ghost"
              iconName="Download"
              size="sm"
              className="hidden md:flex"
            >
              Exporter PDF
            </Button>
          </div>
        </div>

        {/* Mobile Sort Info */}
        <div className="sm:hidden mt-3 flex items-center justify-between text-sm">
          <span className="font-caption text-text-secondary">
            Trié par: {getCurrentSortLabel()}
          </span>
          {selectedCount > 0 && (
            <span className="font-caption text-primary">
              {selectedCount} sélectionné(s)
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-secondary-50 px-4 md:px-6 py-3 border-t border-border-muted">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="font-caption text-text-secondary">
                Excellente compatibilité (85%+)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="font-caption text-text-secondary">
                Bonne compatibilité (70%+)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="font-caption text-text-secondary">
                Compatibilité modérée (55%+)
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-text-muted">
            <Icon name="Info" size={14} />
            <span className="font-caption text-xs">
              Cliquez sur une branche pour plus de détails
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsHeader;