import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BookingForm = ({ 
  selectedCoach, 
  selectedDateTime, 
  selectedSessionType, 
  onSubmit, 
  currentLanguage 
}) => {
  const [formData, setFormData] = useState({
    objectives: '',
    specificQuestions: '',
    previousExperience: '',
    urgencyLevel: 'normal',
    preferredLanguage: 'french',
    additionalNotes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLabel = (frText, arText) => {
    return currentLanguage === 'ar' ? arText : frText;
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString('fr-FR')} MAD`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const urgencyOptions = [
    { value: 'low', labelFr: 'Pas urgent', labelAr: 'غير عاجل' },
    { value: 'normal', labelFr: 'Normal', labelAr: 'عادي' },
    { value: 'high', labelFr: 'Urgent', labelAr: 'عاجل' },
    { value: 'critical', labelFr: 'Très urgent', labelAr: 'عاجل جداً' }
  ];

  const languageOptions = [
    { value: 'french', labelFr: 'Français', labelAr: 'الفرنسية' },
    { value: 'arabic', labelFr: 'Arabe', labelAr: 'العربية' },
    { value: 'both', labelFr: 'Les deux', labelAr: 'كلاهما' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.objectives.trim()) {
      newErrors.objectives = getLabel(
        'Veuillez décrire vos objectifs pour cette session',
        'يرجى وصف أهدافك لهذه الجلسة'
      );
    }

    if (formData.objectives.trim().length < 20) {
      newErrors.objectives = getLabel(
        'Veuillez fournir plus de détails (minimum 20 caractères)',
        'يرجى تقديم المزيد من التفاصيل (20 حرف على الأقل)'
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const bookingData = {
        coach: selectedCoach,
        dateTime: selectedDateTime,
        sessionType: selectedSessionType,
        formData,
        totalPrice: selectedSessionType.price,
        bookingId: `BK-${Date.now()}`,
        status: 'pending'
      };

      await onSubmit(bookingData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {getLabel('Récapitulatif de la réservation', 'ملخص الحجز')}
        </h3>
        
        <div className="space-y-4">
          {/* Coach Info */}
          <div className="flex items-center space-x-4 p-3 bg-secondary-50 rounded-lg">
            <img
              src={selectedCoach.avatar}
              alt={selectedCoach.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-heading font-semibold text-text-primary">
                {selectedCoach.name}
              </h4>
              <p className="text-sm text-text-secondary font-caption">
                {selectedCoach.title}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < Math.floor(selectedCoach.rating) ? 'text-accent fill-current' : 'text-secondary-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-text-secondary font-caption">
                {selectedCoach.rating}
              </span>
            </div>
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-sm font-caption text-text-secondary">
                  {getLabel('Date et heure', 'التاريخ والوقت')}
                </span>
              </div>
              <p className="text-sm font-body text-text-primary ml-6">
                {formatDate(selectedDateTime.date)} {getLabel('à', 'في')} {selectedDateTime.time.time}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <span className="text-sm font-caption text-text-secondary">
                  {getLabel('Type de session', 'نوع الجلسة')}
                </span>
              </div>
              <p className="text-sm font-body text-text-primary ml-6">
                {getLabel(selectedSessionType.titleFr, selectedSessionType.titleAr)}
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-border-muted pt-4">
            <div className="flex items-center justify-between">
              <span className="font-caption font-medium text-text-primary">
                {getLabel('Prix total', 'السعر الإجمالي')}
              </span>
              <span className="text-xl font-heading font-semibold text-primary">
                {formatPrice(selectedSessionType.price)}
              </span>
            </div>
            <p className="text-xs text-text-secondary font-caption mt-1">
              {getLabel('Durée:', 'المدة:')} {selectedSessionType.duration} {getLabel('minutes', 'دقيقة')}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {getLabel('Détails de la session', 'تفاصيل الجلسة')}
        </h3>

        <div className="space-y-4">
          {/* Objectives */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Objectifs de la session *', 'أهداف الجلسة *')}
            </label>
            <textarea
              value={formData.objectives}
              onChange={(e) => handleInputChange('objectives', e.target.value)}
              placeholder={getLabel(
                'Décrivez ce que vous souhaitez accomplir lors de cette session...',
                'صف ما تريد تحقيقه في هذه الجلسة...'
              )}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg font-body text-sm resize-none transition-colors duration-200 ${
                errors.objectives
                  ? 'border-error focus:border-error focus:ring-error' :'border-border focus:border-primary focus:ring-primary'
              } focus:ring-1 focus:outline-none`}
            />
            {errors.objectives && (
              <p className="text-error text-xs font-caption mt-1 flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>{errors.objectives}</span>
              </p>
            )}
          </div>

          {/* Specific Questions */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Questions spécifiques', 'أسئلة محددة')}
            </label>
            <textarea
              value={formData.specificQuestions}
              onChange={(e) => handleInputChange('specificQuestions', e.target.value)}
              placeholder={getLabel(
                'Y a-t-il des questions particulières que vous aimeriez aborder?',
                'هل هناك أسئلة معينة تود مناقشتها؟'
              )}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg font-body text-sm resize-none focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Previous Experience */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Expérience précédente', 'الخبرة السابقة')}
            </label>
            <Input
              type="text"
              value={formData.previousExperience}
              onChange={(e) => handleInputChange('previousExperience', e.target.value)}
              placeholder={getLabel(
                'Avez-vous déjà eu des sessions de coaching?',
                'هل سبق لك الحصول على جلسات تدريب؟'
              )}
            />
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Niveau d\'urgence', 'مستوى الإلحاح')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {urgencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('urgencyLevel', option.value)}
                  className={`p-2 rounded-lg text-sm font-caption transition-all duration-200 ${
                    formData.urgencyLevel === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary-50 text-text-secondary hover:bg-secondary-100'
                  }`}
                >
                  {getLabel(option.labelFr, option.labelAr)}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Langue préférée', 'اللغة المفضلة')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('preferredLanguage', option.value)}
                  className={`p-2 rounded-lg text-sm font-caption transition-all duration-200 ${
                    formData.preferredLanguage === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary-50 text-text-secondary hover:bg-secondary-100'
                  }`}
                >
                  {getLabel(option.labelFr, option.labelAr)}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-caption font-medium text-text-primary mb-2">
              {getLabel('Notes additionnelles', 'ملاحظات إضافية')}
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder={getLabel(
                'Toute information supplémentaire que le coach devrait connaître...',
                'أي معلومات إضافية يجب أن يعرفها المدرب...'
              )}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg font-body text-sm resize-none focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 pt-4 border-t border-border-muted">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
            iconName="Calendar"
            iconPosition="left"
          >
            {isSubmitting
              ? getLabel('Réservation en cours...', 'جاري الحجز...')
              : getLabel('Confirmer la réservation', 'تأكيد الحجز')
            }
          </Button>
          <p className="text-xs text-text-secondary font-caption text-center mt-2">
            {getLabel(
              'En confirmant, vous acceptez nos conditions de service',
              'بالتأكيد، فإنك توافق على شروط الخدمة الخاصة بنا'
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;