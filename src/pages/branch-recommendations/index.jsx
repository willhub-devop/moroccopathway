import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import RecommendationsHeader from './components/RecommendationsHeader';
import RecommendationCard from './components/RecommendationCard';
import FilterSidebar from './components/FilterSidebar';
import ComparisonPanel from './components/ComparisonPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BranchRecommendations = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [currentSort, setCurrentSort] = useState('match');
  const [filters, setFilters] = useState({
    interestAreas: [],
    difficultyLevels: [],
    jobMarketDemand: [],
    duration: [],
    matchPercentage: { min: 0, max: 100 }
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: 1,
      name: "Sciences de l\'Ingénieur",
      description: "Formation complète en ingénierie avec spécialisations multiples",
      matchPercentage: 92,
      difficulty: "Difficile",
      duration: "5 ans",
      keySubjects: ["Mathématiques", "Physique", "Chimie", "Informatique", "Mécanique"],
      careerProspects: ["Ingénieur Civil", "Ingénieur Informatique", "Chef de Projet", "Consultant Technique"],
      requiredGrades: { average: 16, keySubjects: 17 },
      universityPathways: [
        "École Nationale Supérieure d'Informatique",
        "École Mohammadia d\'Ingénieurs",
        "INSA Rabat"
      ],
      jobMarket: {
        demand: "Très Élevée",
        averageSalary: "25 000 - 45 000 MAD/mois"
      },
      interestArea: "Sciences et Technologie"
    },
    {
      id: 2,
      name: "Sciences Économiques et Gestion",
      description: "Formation en économie, finance et management d\'entreprise",
      matchPercentage: 87,
      difficulty: "Modéré",
      duration: "3 ans",
      keySubjects: ["Économie", "Mathématiques", "Comptabilité", "Statistiques", "Droit"],
      careerProspects: ["Analyste Financier", "Contrôleur de Gestion", "Consultant", "Entrepreneur"],
      requiredGrades: { average: 14, keySubjects: 15 },
      universityPathways: [
        "FSJES Rabat",
        "ENCG Casablanca",
        "ISCAE"
      ],
      jobMarket: {
        demand: "Élevée",
        averageSalary: "18 000 - 35 000 MAD/mois"
      },
      interestArea: "Sciences Économiques"
    },
    {
      id: 3,
      name: "Informatique et Systèmes d'Information",
      description: "Spécialisation en développement logiciel et systèmes informatiques",
      matchPercentage: 84,
      difficulty: "Modéré",
      duration: "3 ans",
      keySubjects: ["Informatique", "Mathématiques", "Logique", "Algorithmes", "Bases de Données"],
      careerProspects: ["Développeur Web", "Administrateur Système", "Data Scientist", "Architecte Logiciel"],
      requiredGrades: { average: 15, keySubjects: 16 },
      universityPathways: [
        "ENSIAS",
        "Faculté des Sciences Rabat",
        "EMSI"
      ],
      jobMarket: {
        demand: "Très Élevée",
        averageSalary: "22 000 - 40 000 MAD/mois"
      },
      interestArea: "Sciences et Technologie"
    },
    {
      id: 4,
      name: "Médecine et Sciences de la Santé",
      description: "Formation médicale complète pour devenir médecin généraliste ou spécialiste",
      matchPercentage: 78,
      difficulty: "Difficile",
      duration: "7 ans",
      keySubjects: ["Biologie", "Chimie", "Physique", "Mathématiques", "Sciences Naturelles"],
      careerProspects: ["Médecin Généraliste", "Chirurgien", "Pédiatre", "Cardiologue"],
      requiredGrades: { average: 18, keySubjects: 19 },
      universityPathways: [
        "Faculté de Médecine Rabat",
        "Faculté de Médecine Casablanca",
        "Faculté de Médecine Fès"
      ],
      jobMarket: {
        demand: "Élevée",
        averageSalary: "30 000 - 80 000 MAD/mois"
      },
      interestArea: "Sciences de la Santé"
    },
    {
      id: 5,
      name: "Littérature et Langues Étrangères",
      description: "Études approfondies en littérature française et langues internationales",
      matchPercentage: 71,
      difficulty: "Facile",
      duration: "3 ans",
      keySubjects: ["Français", "Anglais", "Arabe", "Histoire", "Philosophie"],
      careerProspects: ["Professeur", "Traducteur", "Journaliste", "Diplomate"],
      requiredGrades: { average: 13, keySubjects: 14 },
      universityPathways: [
        "Faculté des Lettres Rabat",
        "École Normale Supérieure",
        "Université Al Akhawayn"
      ],
      jobMarket: {
        demand: "Modérée",
        averageSalary: "12 000 - 25 000 MAD/mois"
      },
      interestArea: "Littérature et Langues"
    },
    {
      id: 6,
      name: "Architecture et Design",
      description: "Formation créative en architecture et design d\'espaces",
      matchPercentage: 68,
      difficulty: "Modéré",
      duration: "5 ans",
      keySubjects: ["Dessin", "Mathématiques", "Physique", "Histoire de l\'Art", "Géométrie"],
      careerProspects: ["Architecte", "Designer d\'Intérieur", "Urbaniste", "Paysagiste"],
      requiredGrades: { average: 14, keySubjects: 15 },
      universityPathways: [
        "École Nationale d\'Architecture",
        "ESAV Marrakech",
        "Académie des Beaux-Arts"
      ],
      jobMarket: {
        demand: "Modérée",
        averageSalary: "20 000 - 35 000 MAD/mois"
      },
      interestArea: "Arts et Design"
    }
  ];

  const applyFilters = (recommendations) => {
    return recommendations.filter(branch => {
      // Match percentage filter
      if (branch.matchPercentage < filters.matchPercentage.min || 
          branch.matchPercentage > filters.matchPercentage.max) {
        return false;
      }

      // Interest areas filter
      if (filters.interestAreas.length > 0 && 
          !filters.interestAreas.includes(branch.interestArea)) {
        return false;
      }

      // Difficulty filter
      if (filters.difficultyLevels.length > 0 && 
          !filters.difficultyLevels.includes(branch.difficulty)) {
        return false;
      }

      // Job market demand filter
      if (filters.jobMarketDemand.length > 0 && 
          !filters.jobMarketDemand.includes(branch.jobMarket.demand)) {
        return false;
      }

      // Duration filter
      if (filters.duration.length > 0 && 
          !filters.duration.includes(branch.duration)) {
        return false;
      }

      return true;
    });
  };

  const sortRecommendations = (recommendations) => {
    const sorted = [...recommendations];
    
    switch (currentSort) {
      case 'match':
        return sorted.sort((a, b) => b.matchPercentage - a.matchPercentage);
      case 'difficulty':
        const difficultyOrder = { 'Facile': 1, 'Modéré': 2, 'Difficile': 3 };
        return sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      case 'demand':
        const demandOrder = { 'Très Élevée': 4, 'Élevée': 3, 'Modérée': 2, 'Faible': 1 };
        return sorted.sort((a, b) => demandOrder[b.jobMarket.demand] - demandOrder[a.jobMarket.demand]);
      case 'duration':
        return sorted.sort((a, b) => {
          const getDurationValue = (duration) => parseInt(duration.match(/\d+/)[0]);
          return getDurationValue(a.duration) - getDurationValue(b.duration);
        });
      default:
        return sorted;
    }
  };

  const filteredAndSortedRecommendations = sortRecommendations(applyFilters(mockRecommendations));

  const handleRetakeAssessment = () => {
    navigate('/branch-assessment-form');
  };

  const handleScheduleCoaching = (branchId) => {
    navigate('/coaching-session-scheduler', { state: { selectedBranch: branchId } });
  };

  const handleLearnMore = (branchId) => {
    // In a real app, this would navigate to a detailed branch profile page
    console.log('Learn more about branch:', branchId);
  };

  const handleBranchSelect = (branchId) => {
    setSelectedBranches(prev => 
      prev.includes(branchId) 
        ? prev.filter(id => id !== branchId)
        : [...prev, branchId]
    );
  };

  const handleRemoveFromComparison = (branchId) => {
    setSelectedBranches(prev => prev.filter(id => id !== branchId));
  };

  const handleClearComparison = () => {
    setSelectedBranches([]);
  };

  const handleExportComparison = () => {
    // In a real app, this would generate and download a PDF
    console.log('Exporting comparison for branches:', selectedBranches);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      interestAreas: [],
      difficultyLevels: [],
      jobMarketDemand: [],
      duration: [],
      matchPercentage: { min: 0, max: 100 }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbTrail />
      
      <div className="flex h-screen">
        {/* Filter Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} w-80 flex-shrink-0 md:block`}>
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            isVisible={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <RecommendationsHeader
            totalRecommendations={filteredAndSortedRecommendations.length}
            onRetakeAssessment={handleRetakeAssessment}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onToggleComparison={() => setShowComparison(!showComparison)}
            onSortChange={setCurrentSort}
            currentSort={currentSort}
            selectedCount={selectedBranches.length}
            showFilters={showFilters}
            showComparison={showComparison}
          />

          <div className="flex-1 flex overflow-hidden">
            {/* Recommendations List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6">
                {filteredAndSortedRecommendations.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                      Aucune recommandation trouvée
                    </h3>
                    <p className="text-text-secondary font-caption mb-4">
                      Essayez d'ajuster vos filtres ou de refaire l'évaluation
                    </p>
                    <Button
                      variant="primary"
                      onClick={handleClearFilters}
                      iconName="RotateCcw"
                    >
                      Effacer les Filtres
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredAndSortedRecommendations.map((branch, index) => (
                      <RecommendationCard
                        key={branch.id}
                        branch={branch}
                        isTopRecommendation={index === 0}
                        onCompare={handleBranchSelect}
                        onScheduleCoaching={handleScheduleCoaching}
                        onLearnMore={handleLearnMore}
                        isSelected={selectedBranches.includes(branch.id)}
                        onSelect={showComparison ? handleBranchSelect : null}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Comparison Panel */}
            <div className={`${showComparison ? 'block' : 'hidden'} w-96 flex-shrink-0`}>
              <ComparisonPanel
                selectedBranches={selectedBranches}
                allBranches={mockRecommendations}
                onRemoveBranch={handleRemoveFromComparison}
                onClearAll={handleClearComparison}
                onExportComparison={handleExportComparison}
                isVisible={showComparison}
                onToggle={() => setShowComparison(!showComparison)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-surface">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isVisible={true}
              onToggle={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Comparison Overlay */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-full bg-surface">
            <ComparisonPanel
              selectedBranches={selectedBranches}
              allBranches={mockRecommendations}
              onRemoveBranch={handleRemoveFromComparison}
              onClearAll={handleClearComparison}
              onExportComparison={handleExportComparison}
              isVisible={true}
              onToggle={() => setShowComparison(false)}
            />
          </div>
        </div>
      )}

      <TabNavigation />
    </div>
  );
};

export default BranchRecommendations;