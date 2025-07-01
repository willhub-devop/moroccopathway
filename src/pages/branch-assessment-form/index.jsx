import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import StepIndicator from './components/StepIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import AcademicInterestsStep from './components/AcademicInterestsStep';
import SubjectPreferencesStep from './components/SubjectPreferencesStep';
import LearningStyleStep from './components/LearningStyleStep';
import CareerGoalsStep from './components/CareerGoalsStep';
import FormSidebar from './components/FormSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const BranchAssessmentForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    currentLevel: '',
    
    // Academic Interests
    academicInterests: [],
    
    // Subject Preferences
    subjectRatings: {},
    
    // Learning Style
    learningStyle: '',
    studyPreferences: [],
    workPace: '',
    
    // Career Goals
    careerFields: [],
    careerGoals: '',
    timeHorizon: '',
    workEnvironments: []
  });

  const totalSteps = 5;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    // Load saved form data
    const savedFormData = localStorage.getItem('branchAssessmentForm');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        
        // Determine current step based on completed data
        const step = determineCurrentStep(parsedData);
        setCurrentStep(step);
        
        // Set completed steps
        const completed = [];
        for (let i = 1; i < step; i++) {
          completed.push(i);
        }
        setCompletedSteps(completed);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const determineCurrentStep = (data) => {
    if (!data.firstName || !data.lastName || !data.email) return 1;
    if (!data.academicInterests || data.academicInterests.length === 0) return 2;
    if (!data.subjectRatings || Object.keys(data.subjectRatings).length < 5) return 3;
    if (!data.learningStyle || !data.studyPreferences || data.studyPreferences.length === 0) return 4;
    if (!data.careerFields || data.careerFields.length === 0) return 5;
    return 5;
  };

  const handleFormUpdate = (updates) => {
    const updatedFormData = { ...formData, ...updates };
    setFormData(updatedFormData);
    
    // Auto-save to localStorage
    localStorage.setItem('branchAssessmentForm', JSON.stringify(updatedFormData));
  };

  const handleSaveProgress = async () => {
    return new Promise((resolve) => {
      localStorage.setItem('branchAssessmentForm', JSON.stringify(formData));
      setTimeout(resolve, 500); // Simulate API call
    });
  };

  const handleStepNavigation = (stepNumber) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved form data
      localStorage.removeItem('branchAssessmentForm');
      
      // Store assessment results for recommendations page
      localStorage.setItem('assessmentResults', JSON.stringify({
        ...formData,
        completedAt: new Date().toISOString(),
        assessmentId: `assessment_${Date.now()}`
      }));
      
      // Navigate to recommendations
      navigate('/branch-recommendations');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      onUpdate: handleFormUpdate,
      onNext: handleNext,
      onPrevious: handlePrevious
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <AcademicInterestsStep {...stepProps} />;
      case 3:
        return <SubjectPreferencesStep {...stepProps} />;
      case 4:
        return <LearningStyleStep {...stepProps} />;
      case 5:
        return <CareerGoalsStep {...stepProps} />;
      default:
        return <PersonalInfoStep {...stepProps} />;
    }
  };

  const getEstimatedTime = () => {
    const timePerStep = 3; // minutes
    const remainingSteps = totalSteps - currentStep + 1;
    const estimatedMinutes = remainingSteps * timePerStep;
    
    return currentLanguage === 'ar' 
      ? `حوالي ${estimatedMinutes} دقائق متبقية`
      : `Environ ${estimatedMinutes} min restantes`;
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background">
        <TabNavigation />
        <BreadcrumbTrail />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-surface rounded-lg shadow-soft max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
              {currentLanguage === 'ar' ? 'جاري معالجة التقييم...' : 'Traitement de votre évaluation...'}
            </h3>
            <p className="text-text-secondary font-body">
              {currentLanguage === 'ar' ?'نحن نحلل إجاباتك لإنشاء توصيات مخصصة لك' :'Nous analysons vos réponses pour créer des recommandations personnalisées'
              }
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TabNavigation />
      <BreadcrumbTrail />
      <StepIndicator 
        currentStep={currentStep}
        totalSteps={totalSteps}
        completedSteps={completedSteps}
        onStepClick={handleStepNavigation}
      />
      
      <div className="flex">
        <FormSidebar 
          currentStep={currentStep}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
          formData={formData}
          onSave={handleSaveProgress}
        />
        
        <div className="flex-1 min-h-screen">
          {/* Mobile Time Estimate */}
          <div className="lg:hidden px-4 py-3 bg-accent-50 border-b border-accent-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-accent-700">
                <Icon name="Clock" size={16} />
                <span className="font-caption">{getEstimatedTime()}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveProgress}
                iconName="Save"
                iconPosition="left"
              >
                {currentLanguage === 'ar' ? 'حفظ' : 'Sauvegarder'}
              </Button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 lg:p-8">
            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Padding for Tab Navigation */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default BranchAssessmentForm;