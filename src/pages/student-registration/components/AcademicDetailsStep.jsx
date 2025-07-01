import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AcademicDetailsStep = ({ formData, onUpdateData, onNext, onPrevious, errors = {} }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [localData, setLocalData] = useState({
    gradeLevel: formData.gradeLevel || '',
    preferredSubjects: formData.preferredSubjects || [],
    schoolRegion: formData.schoolRegion || '',
    currentSchool: formData.currentSchool || ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const gradeLevels = [
    { value: 'premiere', labelFr: 'Première année Bac', labelAr: 'السنة الأولى باكالوريا' },
    { value: 'terminale', labelFr: 'Terminale', labelAr: 'السنة النهائية' },
    { value: 'post-bac', labelFr: 'Post-Bac', labelAr: 'ما بعد الباكالوريا' }
  ];

  const subjects = [
    { value: 'mathematics', labelFr: 'Mathématiques', labelAr: 'الرياضيات' },
    { value: 'physics', labelFr: 'Physique', labelAr: 'الفيزياء' },
    { value: 'chemistry', labelFr: 'Chimie', labelAr: 'الكيمياء' },
    { value: 'biology', labelFr: 'Biologie', labelAr: 'الأحياء' },
    { value: 'literature', labelFr: 'Littérature', labelAr: 'الأدب' },
    { value: 'history', labelFr: 'Histoire', labelAr: 'التاريخ' },
    { value: 'geography', labelFr: 'Géographie', labelAr: 'الجغرافيا' },
    { value: 'economics', labelFr: 'Économie', labelAr: 'الاقتصاد' },
    { value: 'philosophy', labelFr: 'Philosophie', labelAr: 'الفلسفة' },
    { value: 'languages', labelFr: 'Langues', labelAr: 'اللغات' }
  ];

  const regions = [
    { value: 'casablanca-settat', labelFr: 'Casablanca-Settat', labelAr: 'الدار البيضاء-سطات' },
    { value: 'rabat-sale-kenitra', labelFr: 'Rabat-Salé-Kénitra', labelAr: 'الرباط-سلا-القنيطرة' },
    { value: 'fes-meknes', labelFr: 'Fès-Meknès', labelAr: 'فاس-مكناس' },
    { value: 'marrakech-safi', labelFr: 'Marrakech-Safi', labelAr: 'مراكش-آسفي' },
    { value: 'agadir-souss-massa', labelFr: 'Agadir-Souss-Massa', labelAr: 'أكادير-سوس-ماسة' },
    { value: 'tanger-tetouan-hoceima', labelFr: 'Tanger-Tétouan-Al Hoceïma', labelAr: 'طنجة-تطوان-الحسيمة' },
    { value: 'oriental', labelFr: 'Oriental', labelAr: 'الشرق' },
    { value: 'beni-mellal-khenifra', labelFr: 'Béni Mellal-Khénifra', labelAr: 'بني ملال-خنيفرة' },
    { value: 'draa-tafilalet', labelFr: 'Drâa-Tafilalet', labelAr: 'درعة-تافيلالت' },
    { value: 'souss-massa', labelFr: 'Souss-Massa', labelAr: 'سوس-ماسة' },
    { value: 'guelmim-oued-noun', labelFr: 'Guelmim-Oued Noun', labelAr: 'كلميم-واد نون' },
    { value: 'laayoune-sakia-hamra', labelFr: 'Laâyoune-Sakia El Hamra', labelAr: 'العيون-الساقية الحمراء' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdateData(updatedData);
  };

  const handleSubjectToggle = (subjectValue) => {
    const updatedSubjects = localData.preferredSubjects.includes(subjectValue)
      ? localData.preferredSubjects.filter(s => s !== subjectValue)
      : [...localData.preferredSubjects, subjectValue];
    
    handleInputChange('preferredSubjects', updatedSubjects);
  };

  const getLabel = (item) => {
    return currentLanguage === 'ar' ? item.labelAr : item.labelFr;
  };

  const isFormValid = () => {
    return localData.gradeLevel && 
           localData.preferredSubjects.length > 0 && 
           localData.schoolRegion &&
           Object.keys(errors).length === 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          {currentLanguage === 'ar' ?'التفاصيل الأكاديمية' :'Détails Académiques'
          }
        </h3>
        <p className="text-sm font-caption text-text-secondary">
          {currentLanguage === 'ar' ?'أخبرنا عن وضعك الأكاديمي الحالي' :'Parlez-nous de votre situation académique actuelle'
          }
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-3">
            {currentLanguage === 'ar' ? 'المستوى الدراسي الحالي' : 'Niveau scolaire actuel'} *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gradeLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleInputChange('gradeLevel', level.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  localData.gradeLevel === level.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 hover:bg-secondary-50'
                }`}
              >
                <span className="font-caption font-medium">{getLabel(level)}</span>
              </button>
            ))}
          </div>
          {errors.gradeLevel && (
            <p className="mt-2 text-xs text-error font-caption">{errors.gradeLevel}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-3">
            {currentLanguage === 'ar' ? 'المواد المفضلة' : 'Matières préférées'} *
          </label>
          <p className="text-xs text-text-muted font-caption mb-3">
            {currentLanguage === 'ar' ?'اختر المواد التي تهتم بها (يمكنك اختيار عدة مواد)' :'Sélectionnez les matières qui vous intéressent (plusieurs choix possibles)'
            }
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map((subject) => (
              <button
                key={subject.value}
                type="button"
                onClick={() => handleSubjectToggle(subject.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                  localData.preferredSubjects.includes(subject.value)
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 hover:bg-secondary-50'
                }`}
              >
                <span className="text-sm font-caption font-medium">{getLabel(subject)}</span>
              </button>
            ))}
          </div>
          {errors.preferredSubjects && (
            <p className="mt-2 text-xs text-error font-caption">{errors.preferredSubjects}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'منطقة المدرسة' : 'Région de l\'école'} *
          </label>
          <select
            value={localData.schoolRegion}
            onChange={(e) => handleInputChange('schoolRegion', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg font-caption focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
              errors.schoolRegion ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">
              {currentLanguage === 'ar' ? 'اختر منطقتك' : 'Sélectionnez votre région'}
            </option>
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {getLabel(region)}
              </option>
            ))}
          </select>
          {errors.schoolRegion && (
            <p className="mt-1 text-xs text-error font-caption">{errors.schoolRegion}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-text-primary mb-2">
            {currentLanguage === 'ar' ? 'اسم المدرسة (اختياري)' : 'Nom de l\'école (optionnel)'}
          </label>
          <Input
            type="text"
            placeholder={currentLanguage === 'ar' ? 'أدخل اسم مدرستك' : 'Entrez le nom de votre école'}
            value={localData.currentSchool}
            onChange={(e) => handleInputChange('currentSchool', e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="w-full sm:w-auto"
          size="lg"
        >
          {currentLanguage === 'ar' ? 'السابق' : 'Précédent'}
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!isFormValid()}
          className="w-full sm:flex-1"
          size="lg"
        >
          {currentLanguage === 'ar' ? 'التالي' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};

export default AcademicDetailsStep;