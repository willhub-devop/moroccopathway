import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ 
  selectedBranches = [], 
  allBranches = [], 
  onRemoveBranch, 
  onClearAll, 
  onExportComparison,
  isVisible = false,
  onToggle 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getSelectedBranchData = () => {
    return selectedBranches.map(branchId => 
      allBranches.find(branch => branch.id === branchId)
    ).filter(Boolean);
  };

  const comparisonData = getSelectedBranchData();

  const comparisonTabs = [
    { id: 'overview', label: 'Aperçu', icon: 'Eye' },
    { id: 'subjects', label: 'Matières', icon: 'BookOpen' },
    { id: 'careers', label: 'Carrières', icon: 'Briefcase' },
    { id: 'requirements', label: 'Exigences', icon: 'Target' }
  ];

  const renderOverviewComparison = () => (
    <div className="space-y-4">
      {comparisonData.map((branch, index) => (
        <div key={branch.id} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-semibold text-text-primary">{branch.name}</h4>
            <button
              onClick={() => onRemoveBranch(branch.id)}
              className="text-text-muted hover:text-error transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-caption text-text-secondary">Compatibilité:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${branch.matchPercentage}%` }}
                  />
                </div>
                <span className="font-caption font-medium text-primary">
                  {branch.matchPercentage}%
                </span>
              </div>
            </div>
            
            <div>
              <span className="font-caption text-text-secondary">Difficulté:</span>
              <p className="font-caption font-medium text-text-primary mt-1">
                {branch.difficulty}
              </p>
            </div>
            
            <div>
              <span className="font-caption text-text-secondary">Durée:</span>
              <p className="font-caption font-medium text-text-primary mt-1">
                {branch.duration}
              </p>
            </div>
            
            <div>
              <span className="font-caption text-text-secondary">Demande Marché:</span>
              <p className="font-caption font-medium text-text-primary mt-1">
                {branch.jobMarket.demand}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSubjectsComparison = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {comparisonData.map((branch) => (
          <div key={branch.id} className="bg-surface border border-border rounded-lg p-4">
            <h4 className="font-heading font-semibold text-text-primary mb-3">{branch.name}</h4>
            <div className="flex flex-wrap gap-2">
              {branch.keySubjects.map((subject, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-caption rounded-lg"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCareersComparison = () => (
    <div className="space-y-4">
      {comparisonData.map((branch) => (
        <div key={branch.id} className="bg-surface border border-border rounded-lg p-4">
          <h4 className="font-heading font-semibold text-text-primary mb-3">{branch.name}</h4>
          <div className="space-y-2">
            {branch.careerProspects.map((career, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Briefcase" size={14} className="text-accent" />
                <span className="text-sm font-caption text-text-primary">{career}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border-muted">
            <span className="text-sm font-caption text-text-secondary">Salaire Moyen: </span>
            <span className="text-sm font-caption font-medium text-accent">
              {branch.jobMarket.averageSalary}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRequirementsComparison = () => (
    <div className="space-y-4">
      {comparisonData.map((branch) => (
        <div key={branch.id} className="bg-surface border border-border rounded-lg p-4">
          <h4 className="font-heading font-semibold text-text-primary mb-3">{branch.name}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-caption text-text-secondary">Moyenne Générale:</span>
              <p className="text-lg font-heading font-semibold text-primary">
                {branch.requiredGrades.average}/20
              </p>
            </div>
            <div>
              <span className="text-sm font-caption text-text-secondary">Matières Clés:</span>
              <p className="text-lg font-heading font-semibold text-primary">
                {branch.requiredGrades.keySubjects}/20
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewComparison();
      case 'subjects':
        return renderSubjectsComparison();
      case 'careers':
        return renderCareersComparison();
      case 'requirements':
        return renderRequirementsComparison();
      default:
        return renderOverviewComparison();
    }
  };

  if (!isVisible || comparisonData.length === 0) {
    return null;
  }

  return (
    <div className="bg-background border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-muted">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Comparaison ({comparisonData.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExportComparison}
              iconName="Download"
            >
              Exporter
            </Button>
            <button
              onClick={onToggle}
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg">
          {comparisonTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-caption transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-surface text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderTabContent()}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border-muted">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            iconName="Trash2"
            className="flex-1"
          >
            Tout Effacer
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onExportComparison}
            iconName="FileText"
            className="flex-1"
          >
            Rapport PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;