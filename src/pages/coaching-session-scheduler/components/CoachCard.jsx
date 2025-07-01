import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CoachCard = ({ coach, onSelect, isSelected, currentLanguage }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const getLabel = (frText, arText) => {
    return currentLanguage === 'ar' ? arText : frText;
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString('fr-FR')} MAD`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-accent fill-current' : 'text-secondary-300'}
      />
    ));
  };

  const truncatedBio = coach.bio.length > 120 ? `${coach.bio.substring(0, 120)}...` : coach.bio;

  return (
    <div className={`bg-surface rounded-lg border-2 transition-all duration-200 ease-out ${
      isSelected ? 'border-primary shadow-medium' : 'border-border hover:border-primary-200 hover:shadow-soft'
    }`}>
      <div className="p-4">
        {/* Coach Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Image
              src={coach.avatar}
              alt={coach.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-surface ${
              coach.isOnline ? 'bg-success' : 'bg-secondary-400'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-text-primary text-lg leading-tight">
              {coach.name}
            </h3>
            <p className="text-sm text-text-secondary font-caption mb-1">
              {coach.title}
            </p>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {renderStars(coach.rating)}
              </div>
              <span className="text-sm text-text-secondary font-caption">
                {coach.rating} ({coach.reviewCount} {getLabel('avis', 'تقييم')})
              </span>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <h4 className="text-sm font-caption font-medium text-text-primary mb-2">
            {getLabel('Spécialisations', 'التخصصات')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {coach.specializations.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary text-xs font-caption rounded-md"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            {showFullBio ? coach.bio : truncatedBio}
            {coach.bio.length > 120 && (
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="ml-1 text-primary hover:text-primary-700 font-caption text-sm"
              >
                {showFullBio ? getLabel('Voir moins', 'عرض أقل') : getLabel('Voir plus', 'عرض المزيد')}
              </button>
            )}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-secondary-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-text-primary">
              {coach.experience}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              {getLabel('Années', 'سنوات')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-text-primary">
              {coach.studentsHelped}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              {getLabel('Étudiants', 'طلاب')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-text-primary">
              {coach.successRate}%
            </div>
            <div className="text-xs text-text-secondary font-caption">
              {getLabel('Succès', 'نجاح')}
            </div>
          </div>
        </div>

        {/* Availability & Pricing */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-text-secondary">
              {getLabel('Disponibilité', 'التوفر')}
            </span>
            <span className={`text-sm font-caption ${
              coach.nextAvailable ? 'text-success' : 'text-warning'
            }`}>
              {coach.nextAvailable || getLabel('Complet cette semaine', 'مشغول هذا الأسبوع')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption text-text-secondary">
              {getLabel('À partir de', 'ابتداء من')}
            </span>
            <span className="text-lg font-heading font-semibold text-primary">
              {formatPrice(coach.pricePerSession)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isSelected ? "success" : "primary"}
          fullWidth
          onClick={() => onSelect(coach)}
          iconName={isSelected ? "Check" : "Calendar"}
          iconPosition="left"
          disabled={!coach.nextAvailable}
        >
          {isSelected 
            ? getLabel('Coach sélectionné', 'تم اختيار المدرب')
            : getLabel('Choisir ce coach', 'اختيار هذا المدرب')
          }
        </Button>
      </div>
    </div>
  );
};

export default CoachCard;