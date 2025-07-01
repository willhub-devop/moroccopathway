import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';

import NotificationBadge from '../../components/ui/NotificationBadge';
import CoachCard from './components/CoachCard';
import DateTimePicker from './components/DateTimePicker';
import SessionTypeSelector from './components/SessionTypeSelector';
import BookingForm from './components/BookingForm';
import CoachFilter from './components/CoachFilter';
import BookingConfirmation from './components/BookingConfirmation';

const CoachingSessionScheduler = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedSessionType, setSelectedSessionType] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getLabel = (frText, arText) => {
    return currentLanguage === 'ar' ? arText : frText;
  };

  // Mock coaches data
  const coaches = [
    {
      id: 1,
      name: "Dr. Amina Benali",
      title: "Conseillère en Orientation Académique",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      rating: 4.9,
      reviewCount: 127,
      experience: 8,
      studentsHelped: 450,
      successRate: 94,
      specializations: ["Sciences", "Médecine", "Ingénierie"],
      bio: `Docteure en psychologie de l'éducation avec plus de 8 ans d'expérience dans l'orientation scolaire. Spécialisée dans l'accompagnement des étudiants vers les filières scientifiques et médicales. Ancienne enseignante universitaire, elle comprend parfaitement les défis académiques des étudiants marocains.`,
      pricePerSession: 200,
      nextAvailable: "Aujourd\'hui 14:00",
      isOnline: true
    },
    {
      id: 2,
      name: "Prof. Youssef Alami",
      title: "Expert en Carrières Technologiques",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      rating: 4.8,
      reviewCount: 89,
      experience: 12,
      studentsHelped: 320,
      successRate: 91,
      specializations: ["Informatique", "Ingénierie", "Innovation"],
      bio: `Ingénieur senior et consultant en technologie avec 12 ans d'expérience dans l'industrie tech. Aide les étudiants à naviguer dans le monde en évolution rapide de la technologie et à choisir les bonnes spécialisations pour leur avenir professionnel.`,
      pricePerSession: 250,
      nextAvailable: "Demain 10:30",
      isOnline: false
    },
    {
      id: 3,
      name: "Dr. Fatima Zahra",
      title: "Spécialiste en Sciences Humaines",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      rating: 4.7,
      reviewCount: 156,
      experience: 6,
      studentsHelped: 280,
      successRate: 89,
      specializations: ["Littérature", "Psychologie", "Sociologie"],
      bio: `Docteure en littérature française et psychologue clinicienne. Passionnée par l'accompagnement des jeunes dans leur développement personnel et académique. Experte dans l'orientation vers les filières littéraires et sciences humaines.`,
      pricePerSession: 180,
      nextAvailable: "Aujourd\'hui 16:00",
      isOnline: true
    },
    {
      id: 4,
      name: "M. Rachid Bennani",
      title: "Conseiller en Économie et Gestion",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 4.6,
      reviewCount: 73,
      experience: 10,
      studentsHelped: 195,
      successRate: 87,
      specializations: ["Économie", "Gestion", "Finance"],
      bio: `Expert-comptable et consultant en gestion d'entreprise. Accompagne les étudiants intéressés par les carrières en économie, finance et gestion. Fort de son expérience en entreprise, il offre une perspective pratique sur le monde professionnel.`,
      pricePerSession: 220,
      nextAvailable: null,
      isOnline: false
    },
    {
      id: 5,
      name: "Mme. Laila Chraibi",
      title: "Experte en Arts et Créativité",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      rating: 4.8,
      reviewCount: 92,
      experience: 7,
      studentsHelped: 165,
      successRate: 92,
      specializations: ["Arts", "Design", "Communication"],
      bio: `Artiste professionnelle et directrice créative avec une passion pour l'éducation artistique. Aide les étudiants créatifs à explorer leurs talents et à construire des carrières durables dans les domaines artistiques et créatifs.`,
      pricePerSession: 190,
      nextAvailable: "Demain 14:30",
      isOnline: true
    },
    {
      id: 6,
      name: "Dr. Omar Tazi",
      title: "Spécialiste en Sciences Appliquées",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      rating: 4.9,
      reviewCount: 134,
      experience: 15,
      studentsHelped: 520,
      successRate: 96,
      specializations: ["Physique", "Chimie", "Mathématiques"],
      bio: `Professeur universitaire et chercheur en sciences appliquées. Reconnu pour son excellence pédagogique et sa capacité à simplifier les concepts complexes. Spécialisé dans l'orientation vers les carrières scientifiques et de recherche.`,
      pricePerSession: 280,
      nextAvailable: "Aujourd\'hui 11:00",
      isOnline: true
    }
  ];

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...coaches];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(coach =>
        coach.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        coach.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        coach.specializations.some(spec => 
          spec.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Specialization filter
    if (filters.specialization && filters.specialization !== 'all') {
      filtered = filtered.filter(coach =>
        coach.specializations.some(spec =>
          spec.toLowerCase().includes(filters.specialization.toLowerCase())
        )
      );
    }

    // Availability filter
    if (filters.availability && filters.availability !== 'all') {
      filtered = filtered.filter(coach => {
        if (filters.availability === 'today') {
          return coach.nextAvailable && coach.nextAvailable.includes("Aujourd'hui");
        }
        if (filters.availability === 'tomorrow') {
          return coach.nextAvailable && coach.nextAvailable.includes("Demain");
        }
        return coach.nextAvailable;
      });
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      filtered = filtered.filter(coach => {
        const price = coach.pricePerSession;
        switch (filters.priceRange) {
          case '0-100':
            return price <= 100;
          case '100-200':
            return price > 100 && price <= 200;
          case '200-300':
            return price > 200 && price <= 300;
          case '300+':
            return price > 300;
          default:
            return true;
        }
      });
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'all') {
      filtered = filtered.filter(coach => {
        const rating = coach.rating;
        switch (filters.rating) {
          case '4+':
            return rating >= 4;
          case '4.5+':
            return rating >= 4.5;
          case '5':
            return rating === 5;
          default:
            return true;
        }
      });
    }

    // Experience filter
    if (filters.experience && filters.experience !== 'all') {
      filtered = filtered.filter(coach => {
        const exp = coach.experience;
        switch (filters.experience) {
          case '1-3':
            return exp >= 1 && exp <= 3;
          case '3-5':
            return exp > 3 && exp <= 5;
          case '5-10':
            return exp > 5 && exp <= 10;
          case '10+':
            return exp > 10;
          default:
            return true;
        }
      });
    }

    setFilteredCoaches(filtered);
  };

  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
    setCurrentStep(2);
  };

  const handleDateTimeSelect = (dateTimeData) => {
    setSelectedDateTime(dateTimeData);
    setCurrentStep(3);
  };

  const handleSessionTypeSelect = (sessionType) => {
    setSelectedSessionType(sessionType);
    setCurrentStep(4);
  };

  const handleBookingSubmit = async (bookingFormData) => {
    setBookingData(bookingFormData);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate('/student-dashboard');
  };

  const handleModifyBooking = () => {
    setShowConfirmation(false);
    setCurrentStep(1);
  };

  const handleStepNavigation = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedCoach !== null;
      case 2:
        return selectedDateTime !== null;
      case 3:
        return selectedSessionType !== null;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return getLabel('Choisir un coach', 'اختيار مدرب');
      case 2:
        return getLabel('Sélectionner date et heure', 'اختيار التاريخ والوقت');
      case 3:
        return getLabel('Type de session', 'نوع الجلسة');
      case 4:
        return getLabel('Finaliser la réservation', 'إنهاء الحجز');
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbTrail />
      <TabNavigation />

      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
                {getLabel('Planifier une Session de Coaching', 'جدولة جلسة تدريب')}
              </h1>
              <p className="text-text-secondary font-body mt-2">
                {getLabel(
                  'Réservez une session personnalisée avec nos conseillers experts',
                  'احجز جلسة شخصية مع مستشارينا الخبراء'
                )}
              </p>
            </div>
            <NotificationBadge count={3} variant="primary">
              <Button
                variant="ghost"
                iconName="Bell"
                className="p-2"
              />
            </NotificationBadge>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-text-primary">
              {getStepTitle()}
            </h2>
            <div className="text-sm font-caption text-text-secondary">
              {getLabel(`Étape ${currentStep} sur 4`, `الخطوة ${currentStep} من 4`)}
            </div>
          </div>
          
          {/* Desktop Progress */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary-200">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => handleStepNavigation(step)}
                    disabled={step > currentStep}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      step < currentStep
                        ? 'bg-success border-success text-success-foreground cursor-pointer hover:scale-105'
                        : step === currentStep
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-surface border-secondary-300 text-text-secondary cursor-not-allowed'
                    }`}
                  >
                    {step < currentStep ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <CoachFilter 
                  onFilterChange={setFilters}
                  currentLanguage={currentLanguage}
                />
                
                <div className="grid gap-6">
                  {filteredCoaches.length > 0 ? (
                    filteredCoaches.map((coach) => (
                      <CoachCard
                        key={coach.id}
                        coach={coach}
                        onSelect={handleCoachSelect}
                        isSelected={selectedCoach?.id === coach.id}
                        currentLanguage={currentLanguage}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                        {getLabel('Aucun coach trouvé', 'لم يتم العثور على مدربين')}
                      </h3>
                      <p className="text-text-secondary font-body">
                        {getLabel(
                          'Essayez de modifier vos critères de recherche',
                          'حاول تعديل معايير البحث الخاصة بك'
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && selectedCoach && (
              <DateTimePicker
                selectedCoach={selectedCoach}
                onDateTimeSelect={handleDateTimeSelect}
                selectedDateTime={selectedDateTime}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 3 && (
              <SessionTypeSelector
                onSessionTypeSelect={handleSessionTypeSelect}
                selectedSessionType={selectedSessionType}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 4 && selectedCoach && selectedDateTime && selectedSessionType && (
              <BookingForm
                selectedCoach={selectedCoach}
                selectedDateTime={selectedDateTime}
                selectedSessionType={selectedSessionType}
                onSubmit={handleBookingSubmit}
                currentLanguage={currentLanguage}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Selection Summary */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  {getLabel('Résumé de la sélection', 'ملخص الاختيار')}
                </h3>
                
                <div className="space-y-4">
                  {/* Coach Selection */}
                  <div className={`p-3 rounded-lg border ${
                    selectedCoach ? 'bg-success-50 border-success-200' : 'bg-secondary-50 border-secondary-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={selectedCoach ? "Check" : "User"} 
                        size={16} 
                        className={selectedCoach ? 'text-success' : 'text-text-secondary'} 
                      />
                      <span className="text-sm font-caption font-medium">
                        {getLabel('Coach', 'المدرب')}
                      </span>
                    </div>
                    {selectedCoach ? (
                      <p className="text-sm font-body text-text-primary">
                        {selectedCoach.name}
                      </p>
                    ) : (
                      <p className="text-sm font-body text-text-secondary">
                        {getLabel('Non sélectionné', 'غير محدد')}
                      </p>
                    )}
                  </div>

                  {/* Date/Time Selection */}
                  <div className={`p-3 rounded-lg border ${
                    selectedDateTime ? 'bg-success-50 border-success-200' : 'bg-secondary-50 border-secondary-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={selectedDateTime ? "Check" : "Calendar"} 
                        size={16} 
                        className={selectedDateTime ? 'text-success' : 'text-text-secondary'} 
                      />
                      <span className="text-sm font-caption font-medium">
                        {getLabel('Date et heure', 'التاريخ والوقت')}
                      </span>
                    </div>
                    {selectedDateTime ? (
                      <div className="text-sm font-body text-text-primary">
                        <p>{selectedDateTime.date.toLocaleDateString('fr-FR')}</p>
                        <p>{selectedDateTime.time.time}</p>
                      </div>
                    ) : (
                      <p className="text-sm font-body text-text-secondary">
                        {getLabel('Non sélectionné', 'غير محدد')}
                      </p>
                    )}
                  </div>

                  {/* Session Type Selection */}
                  <div className={`p-3 rounded-lg border ${
                    selectedSessionType ? 'bg-success-50 border-success-200' : 'bg-secondary-50 border-secondary-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={selectedSessionType ? "Check" : "BookOpen"} 
                        size={16} 
                        className={selectedSessionType ? 'text-success' : 'text-text-secondary'} 
                      />
                      <span className="text-sm font-caption font-medium">
                        {getLabel('Type de session', 'نوع الجلسة')}
                      </span>
                    </div>
                    {selectedSessionType ? (
                      <div className="text-sm font-body text-text-primary">
                        <p>{getLabel(selectedSessionType.titleFr, selectedSessionType.titleAr)}</p>
                        <p className="text-xs text-text-secondary">
                          {selectedSessionType.duration} min - {selectedSessionType.price.toLocaleString('fr-FR')} MAD
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm font-body text-text-secondary">
                        {getLabel('Non sélectionné', 'غير محدد')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-accent-50 rounded-lg border border-accent-200 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="HelpCircle" size={18} className="text-accent-700" />
                  <h3 className="font-heading font-semibold text-accent-700">
                    {getLabel('Besoin d\'aide?', 'تحتاج مساعدة؟')}
                  </h3>
                </div>
                <p className="text-sm text-accent-700 font-body mb-4">
                  {getLabel(
                    'Notre équipe est là pour vous accompagner dans votre réservation.',
                    'فريقنا هنا لمساعدتك في حجزك.'
                  )}
                </p>
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                  fullWidth
                >
                  {getLabel('Contacter le support', 'اتصل بالدعم')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            {getLabel('Précédent', 'السابق')}
          </Button>

          {currentStep < 4 && (
            <Button
              variant="primary"
              onClick={handleNextStep}
              disabled={!canProceedToNext()}
              iconName="ArrowRight"
              iconPosition="right"
            >
              {getLabel('Suivant', 'التالي')}
            </Button>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && bookingData && (
        <BookingConfirmation
          bookingData={bookingData}
          onClose={handleConfirmationClose}
          onModify={handleModifyBooking}
          currentLanguage={currentLanguage}
        />
      )}

      {/* Bottom Navigation Spacer */}
      <div className="h-20 md:h-0" />
    </div>
  );
};

export default CoachingSessionScheduler;