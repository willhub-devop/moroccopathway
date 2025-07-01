import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const routeMap = {
    '/student-dashboard': {
      labelFr: 'Tableau de Bord',
      labelAr: 'لوحة التحكم',
      parent: null
    },
    '/branch-assessment-form': {
      labelFr: 'Évaluation de Branche',
      labelAr: 'تقييم الفرع',
      parent: '/student-dashboard'
    },
    '/branch-recommendations': {
      labelFr: 'Recommandations',
      labelAr: 'التوصيات',
      parent: '/branch-assessment-form'
    },
    '/coaching-session-scheduler': {
      labelFr: 'Planification de Coaching',
      labelAr: 'جدولة التدريب',
      parent: '/student-dashboard'
    },
    '/student-registration': {
      labelFr: 'Inscription Étudiant',
      labelAr: 'تسجيل الطالب',
      parent: null
    },
    '/student-login': {
      labelFr: 'Connexion Étudiant',
      labelAr: 'تسجيل دخول الطالب',
      parent: null
    }
  };

  const buildBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];
    let path = currentPath;

    while (path && routeMap[path]) {
      const route = routeMap[path];
      breadcrumbs.unshift({
        path,
        label: currentLanguage === 'ar' ? route.labelAr : route.labelFr,
        isActive: path === currentPath
      });
      path = route.parent;
    }

    // Add home if not already present and not on auth pages
    if (breadcrumbs.length > 0 && breadcrumbs[0].path !== '/student-dashboard' && !currentPath.includes('login') && !currentPath.includes('registration')) {
      breadcrumbs.unshift({
        path: '/student-dashboard',
        label: currentLanguage === 'ar' ? 'لوحة التحكم' : 'Tableau de Bord',
        isActive: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  // Don't show breadcrumbs on auth pages or if only one item
  if (breadcrumbs.length <= 1 || 
      location.pathname.includes('login') || 
      location.pathname.includes('registration')) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-background border-b border-border-muted" aria-label="Breadcrumb">
      {/* Desktop Breadcrumbs */}
      <div className="hidden md:block px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-muted mx-2" 
                />
              )}
              {crumb.isActive ? (
                <span className="font-caption font-medium text-text-primary">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => handleBreadcrumbClick(crumb.path)}
                  className="font-caption text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
                >
                  {crumb.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile Breadcrumbs */}
      <div className="md:hidden px-4 py-3">
        {!isExpanded ? (
          <div className="flex items-center justify-between">
            <span className="font-caption font-medium text-text-primary text-sm">
              {breadcrumbs[breadcrumbs.length - 1]?.label}
            </span>
            {breadcrumbs.length > 2 && (
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span className="text-xs font-caption">
                  {currentLanguage === 'ar' ? 'عرض المسار' : 'Voir le chemin'}
                </span>
              </button>
            )}
          </div>
        ) : (
          <div className="animate-slide-down">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-caption text-text-secondary">
                {currentLanguage === 'ar' ? 'مسار التنقل' : 'Chemin de navigation'}
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <ol className="space-y-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center">
                  <div className="flex items-center w-full">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      crumb.isActive ? 'bg-primary' : 'bg-secondary-300'
                    }`} />
                    {crumb.isActive ? (
                      <span className="font-caption font-medium text-text-primary text-sm">
                        {crumb.label}
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          handleBreadcrumbClick(crumb.path);
                          setIsExpanded(false);
                        }}
                        className="font-caption text-text-secondary hover:text-primary transition-colors duration-200 ease-out text-sm text-left"
                      >
                        {crumb.label}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;