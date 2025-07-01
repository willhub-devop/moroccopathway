import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isVisible = false, 
  onToggle 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const filterOptions = {
    interestAreas: [
      'Sciences et Technologie',
      'Littérature et Langues',
      'Sciences Économiques',
      'Sciences Humaines',
      'Arts et Design',
      'Sciences de la Santé',
      'Ingénierie',
      'Commerce et Gestion'
    ],
    difficultyLevels: [
      'Facile',
      'Modéré',
      'Difficile'
    ],
    jobMarketDemand: [
      'Très Élevée',
      'Élevée',
      'Modérée',
      'Faible'
    ],
    duration: [
      '2 ans',
      '3 ans',
      '4 ans',
      '5+ ans'
    ]
  };

  const handleFilterChange = (category, value, isChecked) => {
    const updatedFilters = { ...localFilters };
    
    if (isChecked) {
      updatedFilters[category] = [...(updatedFilters[category] || []), value];
    } else {
      updatedFilters[category] = (updatedFilters[category] || []).filter(item => item !== value);
    }
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleMatchPercentageChange = (field, value) => {
    const updatedFilters = {
      ...localFilters,
      matchPercentage: {
        ...localFilters.matchPercentage,
        [field]: parseInt(value) || 0
      }
    };
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      interestAreas: [],
      difficultyLevels: [],
      jobMarketDemand: [],
      duration: [],
      matchPercentage: { min: 0, max: 100 }
    };
    
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.keys(localFilters).forEach(key => {
      if (key === 'matchPercentage') {
        if (localFilters[key]?.min > 0 || localFilters[key]?.max < 100) count++;
      } else if (Array.isArray(localFilters[key])) {
        count += localFilters[key].length;
      }
    });
    return count;
  };

  if (!isVisible) return null;

  return (
    <div className="bg-surface border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-muted">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Filtres
          </h3>
          <button
            onClick={onToggle}
            className="text-text-muted hover:text-text-primary transition-colors duration-200 md:hidden"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption text-text-secondary">
              {getActiveFiltersCount()} filtre(s) actif(s)
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              iconName="X"
            >
              Effacer
            </Button>
          </div>
        )}
      </div>

      {/* Filters Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Match Percentage Range */}
        <div>
          <h4 className="text-sm font-caption font-medium text-text-primary mb-3">
            Pourcentage de Compatibilité
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.matchPercentage?.min || 0}
                onChange={(e) => handleMatchPercentageChange('min', e.target.value)}
                className="flex-1"
                min="0"
                max="100"
              />
              <span className="text-text-muted">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.matchPercentage?.max || 100}
                onChange={(e) => handleMatchPercentageChange('max', e.target.value)}
                className="flex-1"
                min="0"
                max="100"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-caption text-text-secondary">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Interest Areas */}
        <div>
          <h4 className="text-sm font-caption font-medium text-text-primary mb-3">
            Domaines d'Intérêt
          </h4>
          <div className="space-y-2">
            {filterOptions.interestAreas.map((area) => (
              <label key={area} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.interestAreas || []).includes(area)}
                  onChange={(e) => handleFilterChange('interestAreas', area, e.target.checked)}
                  className="w-4 h-4 text-primary border-secondary-300 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-caption text-text-primary">{area}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Levels */}
        <div>
          <h4 className="text-sm font-caption font-medium text-text-primary mb-3">
            Niveau de Difficulté
          </h4>
          <div className="space-y-2">
            {filterOptions.difficultyLevels.map((level) => (
              <label key={level} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.difficultyLevels || []).includes(level)}
                  onChange={(e) => handleFilterChange('difficultyLevels', level, e.target.checked)}
                  className="w-4 h-4 text-primary border-secondary-300 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-caption text-text-primary">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Market Demand */}
        <div>
          <h4 className="text-sm font-caption font-medium text-text-primary mb-3">
            Demande du Marché
          </h4>
          <div className="space-y-2">
            {filterOptions.jobMarketDemand.map((demand) => (
              <label key={demand} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.jobMarketDemand || []).includes(demand)}
                  onChange={(e) => handleFilterChange('jobMarketDemand', demand, e.target.checked)}
                  className="w-4 h-4 text-primary border-secondary-300 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-caption text-text-primary">{demand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="text-sm font-caption font-medium text-text-primary mb-3">
            Durée d'Études
          </h4>
          <div className="space-y-2">
            {filterOptions.duration.map((dur) => (
              <label key={dur} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.duration || []).includes(dur)}
                  onChange={(e) => handleFilterChange('duration', dur, e.target.checked)}
                  className="w-4 h-4 text-primary border-secondary-300 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-caption text-text-primary">{dur}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border-muted">
        <Button
          variant="outline"
          onClick={handleClearAll}
          iconName="RotateCcw"
          fullWidth
        >
          Réinitialiser les Filtres
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;