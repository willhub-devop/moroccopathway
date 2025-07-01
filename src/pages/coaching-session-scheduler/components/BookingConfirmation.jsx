import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, onClose, onModify, currentLanguage }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'text-error bg-error-50';
      case 'high':
        return 'text-warning bg-warning-50';
      case 'normal':
        return 'text-success bg-success-50';
      case 'low':
        return 'text-secondary bg-secondary-50';
      default:
        return 'text-secondary bg-secondary-50';
    }
  };

  const getUrgencyLabel = (urgency) => {
    const labels = {
      critical: { fr: 'Très urgent', ar: 'عاجل جداً' },
      high: { fr: 'Urgent', ar: 'عاجل' },
      normal: { fr: 'Normal', ar: 'عادي' },
      low: { fr: 'Pas urgent', ar: 'غير عاجل' }
    };
    return getLabel(labels[urgency]?.fr || 'Normal', labels[urgency]?.ar || 'عادي');
  };

  const getLanguageLabel = (language) => {
    const labels = {
      french: { fr: 'Français', ar: 'الفرنسية' },
      arabic: { fr: 'Arabe', ar: 'العربية' },
      both: { fr: 'Les deux', ar: 'كلاهما' }
    };
    return getLabel(labels[language]?.fr || 'Français', labels[language]?.ar || 'الفرنسية');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={24} className="text-success-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  {getLabel('Réservation confirmée!', 'تم تأكيد الحجز!')}
                </h2>
                <p className="text-sm text-text-secondary font-caption">
                  {getLabel('Votre session a été programmée avec succès', 'تم جدولة جلستك بنجاح')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="p-2"
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking ID */}
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-caption text-primary">
                  {getLabel('ID de réservation', 'معرف الحجز')}
                </span>
                <p className="font-heading font-semibold text-primary text-lg">
                  {bookingData.bookingId}
                </p>
              </div>
              <Button
                variant="outline"
                iconName="Copy"
                iconPosition="left"
                onClick={() => navigator.clipboard.writeText(bookingData.bookingId)}
              >
                {getLabel('Copier', 'نسخ')}
              </Button>
            </div>
          </div>

          {/* Session Summary */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              {getLabel('Détails de la session', 'تفاصيل الجلسة')}
            </h3>

            {/* Coach Info */}
            <div className="flex items-center space-x-4 mb-4 p-3 bg-secondary-50 rounded-lg">
              <img
                src={bookingData.coach.avatar}
                alt={bookingData.coach.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-text-primary">
                  {bookingData.coach.name}
                </h4>
                <p className="text-sm text-text-secondary font-caption">
                  {bookingData.coach.title}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(bookingData.coach.rating) ? 'text-accent fill-current' : 'text-secondary-300'}
                    />
                  ))}
                  <span className="text-xs text-text-secondary font-caption ml-1">
                    {bookingData.coach.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Session Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-sm font-caption text-text-secondary">
                    {getLabel('Date et heure', 'التاريخ والوقت')}
                  </span>
                </div>
                <p className="text-sm font-body text-text-primary ml-6">
                  {formatDate(bookingData.dateTime.date)}
                </p>
                <p className="text-sm font-body text-text-primary ml-6">
                  {bookingData.dateTime.time.time}
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
                  {getLabel(bookingData.sessionType.titleFr, bookingData.sessionType.titleAr)}
                </p>
                <p className="text-xs text-text-secondary font-caption ml-6">
                  {bookingData.sessionType.duration} {getLabel('minutes', 'دقيقة')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="CreditCard" size={16} className="text-primary" />
                  <span className="text-sm font-caption text-text-secondary">
                    {getLabel('Prix total', 'السعر الإجمالي')}
                  </span>
                </div>
                <p className="text-lg font-heading font-semibold text-primary ml-6">
                  {formatPrice(bookingData.totalPrice)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-primary" />
                  <span className="text-sm font-caption text-text-secondary">
                    {getLabel('Urgence', 'الإلحاح')}
                  </span>
                </div>
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-caption ml-6 ${getUrgencyColor(bookingData.formData.urgencyLevel)}`}>
                  {getUrgencyLabel(bookingData.formData.urgencyLevel)}
                </span>
              </div>
            </div>

            {/* Session Objectives */}
            <div className="border-t border-border-muted pt-4">
              <h4 className="font-caption font-medium text-text-primary mb-2">
                {getLabel('Objectifs de la session', 'أهداف الجلسة')}
              </h4>
              <p className="text-sm text-text-secondary font-body leading-relaxed">
                {bookingData.formData.objectives}
              </p>
            </div>

            {/* Additional Details Toggle */}
            <div className="border-t border-border-muted pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                iconName={showDetails ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                fullWidth
              >
                {getLabel('Voir plus de détails', 'عرض المزيد من التفاصيل')}
              </Button>

              {showDetails && (
                <div className="mt-4 space-y-4 animate-slide-down">
                  {bookingData.formData.specificQuestions && (
                    <div>
                      <h5 className="font-caption font-medium text-text-primary mb-1">
                        {getLabel('Questions spécifiques', 'أسئلة محددة')}
                      </h5>
                      <p className="text-sm text-text-secondary font-body">
                        {bookingData.formData.specificQuestions}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-caption font-medium text-text-primary mb-1">
                        {getLabel('Langue préférée', 'اللغة المفضلة')}
                      </h5>
                      <p className="text-sm text-text-secondary font-body">
                        {getLanguageLabel(bookingData.formData.preferredLanguage)}
                      </p>
                    </div>

                    {bookingData.formData.previousExperience && (
                      <div>
                        <h5 className="font-caption font-medium text-text-primary mb-1">
                          {getLabel('Expérience précédente', 'الخبرة السابقة')}
                        </h5>
                        <p className="text-sm text-text-secondary font-body">
                          {bookingData.formData.previousExperience}
                        </p>
                      </div>
                    )}
                  </div>

                  {bookingData.formData.additionalNotes && (
                    <div>
                      <h5 className="font-caption font-medium text-text-primary mb-1">
                        {getLabel('Notes additionnelles', 'ملاحظات إضافية')}
                      </h5>
                      <p className="text-sm text-text-secondary font-body">
                        {bookingData.formData.additionalNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
            <h3 className="font-heading font-semibold text-accent-700 mb-3 flex items-center space-x-2">
              <Icon name="Info" size={18} />
              <span>{getLabel('Prochaines étapes', 'الخطوات التالية')}</span>
            </h3>
            <ul className="space-y-2 text-sm text-accent-700 font-body">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  {getLabel(
                    'Vous recevrez un email de confirmation avec les détails de la session',
                    'ستتلقى بريداً إلكترونياً للتأكيد مع تفاصيل الجلسة'
                  )}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  {getLabel(
                    'Le coach vous contactera 24h avant la session',
                    'سيتصل بك المدرب قبل 24 ساعة من الجلسة'
                  )}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  {getLabel(
                    'Vous pouvez modifier ou annuler jusqu\'à 12h avant',
                    'يمكنك التعديل أو الإلغاء حتى 12 ساعة قبل الموعد'
                  )}
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onModify}
              iconName="Edit"
              iconPosition="left"
              fullWidth
            >
              {getLabel('Modifier la réservation', 'تعديل الحجز')}
            </Button>
            <Button
              variant="primary"
              onClick={onClose}
              iconName="ArrowRight"
              iconPosition="right"
              fullWidth
            >
              {getLabel('Retour au tableau de bord', 'العودة إلى لوحة التحكم')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;