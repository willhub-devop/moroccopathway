import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimePicker = ({ selectedCoach, onDateTimeSelect, selectedDateTime, currentLanguage }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (selectedDateTime) {
      setSelectedDate(selectedDateTime.date);
      setSelectedTime(selectedDateTime.time);
    }
  }, [selectedDateTime]);

  const getLabel = (frText, arText) => {
    return currentLanguage === 'ar' ? arText : frText;
  };

  const months = [
    { fr: 'Janvier', ar: 'يناير' },
    { fr: 'Février', ar: 'فبراير' },
    { fr: 'Mars', ar: 'مارس' },
    { fr: 'Avril', ar: 'أبريل' },
    { fr: 'Mai', ar: 'مايو' },
    { fr: 'Juin', ar: 'يونيو' },
    { fr: 'Juillet', ar: 'يوليو' },
    { fr: 'Août', ar: 'أغسطس' },
    { fr: 'Septembre', ar: 'سبتمبر' },
    { fr: 'Octobre', ar: 'أكتوبر' },
    { fr: 'Novembre', ar: 'نوفمبر' },
    { fr: 'Décembre', ar: 'ديسمبر' }
  ];

  const weekDays = [
    { fr: 'Dim', ar: 'أحد' },
    { fr: 'Lun', ar: 'اثن' },
    { fr: 'Mar', ar: 'ثلا' },
    { fr: 'Mer', ar: 'أرب' },
    { fr: 'Jeu', ar: 'خمي' },
    { fr: 'Ven', ar: 'جمع' },
    { fr: 'Sam', ar: 'سبت' }
  ];

  const timeSlots = [
    { time: '09:00', period: 'morning', available: true },
    { time: '09:30', period: 'morning', available: true },
    { time: '10:00', period: 'morning', available: false },
    { time: '10:30', period: 'morning', available: true },
    { time: '11:00', period: 'morning', available: true },
    { time: '11:30', period: 'morning', available: false },
    { time: '14:00', period: 'afternoon', available: true },
    { time: '14:30', period: 'afternoon', available: true },
    { time: '15:00', period: 'afternoon', available: true },
    { time: '15:30', period: 'afternoon', available: false },
    { time: '16:00', period: 'afternoon', available: true },
    { time: '16:30', period: 'afternoon', available: true },
    { time: '17:00', period: 'evening', available: true },
    { time: '17:30', period: 'evening', available: false },
    { time: '18:00', period: 'evening', available: true },
    { time: '18:30', period: 'evening', available: true }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      days.push({
        date,
        day,
        isToday,
        isPast,
        isWeekend,
        isAvailable: !isPast && !isWeekend
      });
    }
    
    return days;
  };

  const handleDateSelect = (dateObj) => {
    if (!dateObj.isAvailable) return;
    setSelectedDate(dateObj.date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (timeSlot) => {
    if (!timeSlot.available || !selectedDate) return;
    setSelectedTime(timeSlot);
    onDateTimeSelect({
      date: selectedDate,
      time: timeSlot,
      coach: selectedCoach
    });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupTimeSlotsByPeriod = () => {
    const grouped = {
      morning: timeSlots.filter(slot => slot.period === 'morning'),
      afternoon: timeSlots.filter(slot => slot.period === 'afternoon'),
      evening: timeSlots.filter(slot => slot.period === 'evening')
    };
    return grouped;
  };

  const days = getDaysInMonth(currentMonth);
  const groupedTimeSlots = groupTimeSlotsByPeriod();

  return (
    <div className="space-y-6">
      {/* Selected Coach Info */}
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
        <div className="flex items-center space-x-3">
          <img
            src={selectedCoach.avatar}
            alt={selectedCoach.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              {selectedCoach.name}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {selectedCoach.title}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-primary">
            {getLabel('Sélectionner une date', 'اختيار التاريخ')}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
              className="p-2"
            />
            <span className="font-caption font-medium text-text-primary min-w-32 text-center">
              {getLabel(
                months[currentMonth.getMonth()].fr,
                months[currentMonth.getMonth()].ar
              )} {currentMonth.getFullYear()}
            </span>
            <Button
              variant="ghost"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
              className="p-2"
            />
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-sm font-caption text-text-secondary py-2">
              {getLabel(day.fr, day.ar)}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dayObj, index) => (
            <button
              key={index}
              onClick={() => dayObj && handleDateSelect(dayObj)}
              disabled={!dayObj || !dayObj.isAvailable}
              className={`aspect-square flex items-center justify-center text-sm font-caption rounded-lg transition-all duration-200 ${
                !dayObj
                  ? 'invisible'
                  : dayObj.isToday && selectedDate?.toDateString() === dayObj.date.toDateString()
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : selectedDate?.toDateString() === dayObj.date.toDateString()
                  ? 'bg-primary text-primary-foreground'
                  : dayObj.isToday
                  ? 'bg-accent-100 text-accent-700 font-semibold'
                  : dayObj.isAvailable
                  ? 'hover:bg-secondary-100 text-text-primary' :'text-text-disabled cursor-not-allowed'
              }`}
            >
              {dayObj?.day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="font-heading font-semibold text-text-primary mb-4">
            {getLabel('Créneaux disponibles', 'الأوقات المتاحة')}
          </h3>
          <p className="text-sm text-text-secondary font-caption mb-4">
            {formatDate(selectedDate)}
          </p>

          <div className="space-y-4">
            {Object.entries(groupedTimeSlots).map(([period, slots]) => (
              <div key={period}>
                <h4 className="text-sm font-caption font-medium text-text-primary mb-2 capitalize">
                  {period === 'morning' && getLabel('Matin', 'صباح')}
                  {period === 'afternoon' && getLabel('Après-midi', 'بعد الظهر')}
                  {period === 'evening' && getLabel('Soir', 'مساء')}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg text-sm font-caption transition-all duration-200 ${
                        selectedTime?.time === slot.time
                          ? 'bg-primary text-primary-foreground'
                          : slot.available
                          ? 'bg-success-50 text-success-700 hover:bg-success-100 border border-success-200' :'bg-secondary-100 text-text-disabled cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-success-50 rounded-lg p-4 border border-success-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="font-caption font-medium text-success-700">
              {getLabel('Créneau sélectionné', 'تم اختيار الموعد')}
            </span>
          </div>
          <p className="text-sm text-success-700 font-body">
            {formatDate(selectedDate)} {getLabel('à', 'في')} {selectedTime.time}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;