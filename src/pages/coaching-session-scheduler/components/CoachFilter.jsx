import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CoachFilter = ({ onFilterChange, currentLanguage }) => {
  const [filters, setFilters] = useState({
    search: '',
    specialization: 'all',
    availability: 'all',
    priceRange: 'all',
    rating: 'all',
    experience: 'all'
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const getLabel = (frText, arText) => {
    return currentLanguage === 'ar' ? arText : frText;
  };

  const specializationOptions = [
    { value: 'all', labelFr: 'Toutes spécialisations', labelAr: 'جميع التخصصات' },
    { value: 'sciences', labelFr: 'Sciences', labelAr: 'العلوم' },
    { value: 'literature', labelFr: 'Littérature', labelAr: 'الأدب' },
    { value: 'economics', labelFr: 'Économie', labelAr: 'الاقتصاد' },
    { value: 'technology', labelFr: 'Technologie', labelAr: 'التكنولوجيا' },
    { value: 'arts', labelFr: 'Arts', labelAr: 'الفنون' }
  ];

  const availabilityOptions = [
    { value: 'all', labelFr: 'Toute disponibilité', labelAr: 'جميع الأوقات' },
    { value: 'today', labelFr: 'Aujourd\'hui', labelAr: 'اليوم' },
    { value: 'tomorrow', labelFr: 'Demain', labelAr: 'غداً' },
    { value: 'this-week', labelFr: 'Cette semaine', labelAr: 'هذا الأسبوع' },
    { value: 'next-week', labelFr: 'Semaine prochaine', labelAr: 'الأسبوع القادم' }
  ];

  const priceRangeOptions = [
    { value: 'all', labelFr: 'Tous les prix', labelAr: 'جميع الأسعار' },
    { value: '0-100', labelFr: '0 - 100 MAD', labelAr: '0 - 100 درهم' },
    { value: '100-200', labelFr: '100 - 200 MAD', labelAr: '100 - 200 درهم' },
    { value: '200-300', labelFr: '200 - 300 MAD', labelAr: '200 - 300 درهم' },
    { value: '300+', labelFr: '300+ MAD', labelAr: '300+ درهم' }
  ];

  const ratingOptions = [
    { value: 'all', labelFr: 'Toutes notes', labelAr: 'جميع التقييمات' },
    { value: '4+', labelFr: '4+ étoiles', labelAr: '4+ نجوم' },
    { value: '4.5+', labelFr: '4.5+ étoiles', labelAr: '4.5+ نجوم' },
    { value: '5', labelFr: '5 étoiles', labelAr: '5 نجوم' }
  ];

  const experienceOptions = [
    { value: 'all', labelFr: 'Toute expérience', labelAr: 'جميع الخبرات' },
    { value: '1-3', labelFr: '1-3 ans', labelAr: '1-3 سنوات' },
    { value: '3-5', labelFr: '3-5 ans', labelAr: '3-5 سنوات' },
    { value: '5-10', labelFr: '5-10 ans', labelAr: '5-10 سنوات' },
    { value: '10+', labelFr: '10+ ans', labelAr: '10+ سنوات' }
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      specialization: 'all',
      availability: 'all',
      priceRange: 'all',
      rating: 'all',
      experience: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      key !== 'search' && value !== 'all'
    ).length + (filters.search ? 1 : 0);
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      {/* Mobile Filter Header */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <span className="font-caption font-medium text-text-primary">
            {getLabel('Filtres', 'المرشحات')}
          </span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-caption px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? getLabel('Masquer', 'إخفاء') : getLabel('Afficher', 'عرض')}
        </Button>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder={getLabel('Rechercher un coach...', 'البحث عن مدرب...')}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filter Options */}
      <div className={`space-y-4 ${!isExpanded ? 'hidden md:block' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Specialization */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Spécialisation', 'التخصص')}
            </label>
            <select
              value={filters.specialization}
              onChange={(e) => handleFilterChange('specialization', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg font-caption text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            >
              {specializationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLabel(option.labelFr, option.labelAr)}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Disponibilité', 'التوفر')}
            </label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg font-caption text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLabel(option.labelFr, option.labelAr)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Gamme de prix', 'نطاق السعر')}
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg font-caption text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            >
              {priceRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLabel(option.labelFr, option.labelAr)}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Note minimum', 'الحد الأدنى للتقييم')}
            </label>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg font-caption text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLabel(option.labelFr, option.labelAr)}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Expérience', 'الخبرة')}
            </label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg font-caption text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            >
              {experienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLabel(option.labelFr, option.labelAr)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex justify-end pt-2">
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              {getLabel('Effacer les filtres', 'مسح المرشحات')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachFilter;