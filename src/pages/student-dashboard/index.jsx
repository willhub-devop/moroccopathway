import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';


import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Header from '../../components/ui/Header';
import WelcomeBanner from './components/WelcomeBanner';
import UpcomingSessionsCard from './components/UpcomingSessionsCard';
import AssessmentProgressCard from './components/AssessmentProgressCard';
import RecommendationsCard from './components/RecommendationsCard';
import QuickActionsCard from './components/QuickActionsCard';


const StudentDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
    loadDashboardData();

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Mock student data
  const studentData = {
    id: 1,
    name: "Amina El Mansouri",
    email: "amina.elmansouri@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    registrationDate: new Date('2024-01-15'),
    lastLoginDate: new Date(),
    academicYear: "2023-2024",
    currentGrade: "Terminale"
  };

  // Mock progress data
  const progressData = {
    completedSteps: 2,
    totalSteps: 4,
    recommendationsCount: 5,
    sessionsCount: 3
  };

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      coach: {
        name: "Dr. Youssef Benali",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        specialization: "Sciences"
      },
      topic: "Orientation vers les filières scientifiques",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: 45
    },
    {
      id: 2,
      coach: {
        name: "Mme. Fatima Zahra",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        specialization: "Littérature"
      },
      topic: "Exploration des carrières en langues",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: 60
    }
  ];

  // Mock assessment data
  const assessmentData = {
    overallStatus: 'in-progress',
    sections: [
      {
        id: 1,
        titleFr: "Informations personnelles",
        titleAr: "المعلومات الشخصية",
        status: 'completed'
      },
      {
        id: 2,
        titleFr: "Intérêts académiques",
        titleAr: "الاهتمامات الأكاديمية",
        status: 'completed'
      },
      {
        id: 3,
        titleFr: "Compétences et aptitudes",
        titleAr: "المهارات والقدرات",
        status: 'in-progress'
      },
      {
        id: 4,
        titleFr: "Objectifs de carrière",
        titleAr: "أهداف المهنة",
        status: 'pending'
      }
    ]
  };

  // Mock recommendations
  const recommendations = [
    {
      id: 1,
      nameFr: "Sciences Mathématiques",
      nameAr: "العلوم الرياضية",
      descriptionFr: "Filière axée sur les mathématiques, la physique et la chimie, préparant aux études d'ingénierie et de recherche scientifique.",
      descriptionAr: "فرع يركز على الرياضيات والفيزياء والكيمياء، يعد للدراسات الهندسية والبحث العلمي.",
      category: 'sciences',
      matchPercentage: 92,
      rating: 5,
      studentsCount: 1250,
      employmentRate: 87
    },
    {
      id: 2,
      nameFr: "Sciences de la Vie et de la Terre",
      nameAr: "علوم الحياة والأرض",
      descriptionFr: "Formation en biologie, géologie et sciences environnementales, ouvrant vers la médecine et la recherche biologique.",
      descriptionAr: "تكوين في البيولوجيا والجيولوجيا والعلوم البيئية، يفتح المجال نحو الطب والبحث البيولوجي.",
      category: 'sciences',
      matchPercentage: 85,
      rating: 4,
      studentsCount: 980,
      employmentRate: 82
    },
    {
      id: 3,
      nameFr: "Sciences Économiques et Gestion",
      nameAr: "العلوم الاقتصادية والتدبير",
      descriptionFr: "Études en économie, gestion d\'entreprise et finance, préparant aux carrières dans le secteur privé et public.",
      descriptionAr: "دراسات في économie وإدارة الأعمال والمالية، تعد للمهن في القطاع الخاص والعام.",
      category: 'economics',
      matchPercentage: 78,
      rating: 4,
      studentsCount: 1100,
      employmentRate: 79
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'session',
      priority: 'high',
      titleFr: "Session de coaching demain",
      titleAr: "جلسة التدريب غداً",
      messageFr: "Votre session avec Dr. Youssef Benali est prévue demain à 14h00",
      messageAr: "جلستك مع د. يوسف بنعلي مقررة غداً في الساعة 14:00",
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      actionUrl: '/coaching-session-scheduler'
    },
    {
      id: 2,
      type: 'assessment',
      priority: 'normal',
      titleFr: "Évaluation en attente",
      titleAr: "تقييم في الانتظار",
      messageFr: "Complétez votre évaluation pour recevoir des recommandations personnalisées",
      messageAr: "أكمل تقييمك لتلقي توصيات مخصصة",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      actionUrl: '/branch-assessment-form'
    },
    {
      id: 3,
      type: 'recommendation',
      priority: 'normal',
      titleFr: "Nouvelles recommandations disponibles",
      titleAr: "توصيات جديدة متاحة",
      messageFr: "5 nouvelles recommandations de branches ont été générées pour vous",
      messageAr: "تم إنشاء 5 توصيات جديدة للفروع لك",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      actionUrl: '/branch-recommendations'
    }
  ];

  const loadDashboardData = async () => {
    // Simulate API call
    setNotifications(mockNotifications);
  };

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      loadDashboardData();
      setIsRefreshing(false);
    }, 1000);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo and Auth Buttons */}
      <Header 
        student={studentData}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
        showAuthButtons={true}
      />

      {/* Breadcrumb */}
      <BreadcrumbTrail />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center space-x-2 text-primary">
                <div className="animate-spin">
                  <Icon name="RefreshCw" size={16} />
                </div>
                <span className="text-sm font-caption">
                  {currentLanguage === 'ar' ? 'تحديث البيانات...' : 'Actualisation des données...'}
                </span>
              </div>
            </div>
          )}

          {/* Welcome Banner */}
          <WelcomeBanner 
            student={studentData} 
            progressData={progressData} 
          />

          {/* Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActionsCard 
                assessmentStatus={assessmentData.overallStatus}
                hasRecommendations={recommendations.length > 0}
              />
              
              {/* Assessment Progress */}
              <AssessmentProgressCard assessmentData={assessmentData} />
              
              {/* Recommendations */}
              <RecommendationsCard recommendations={recommendations} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Sessions */}
              <UpcomingSessionsCard sessions={upcomingSessions} />
              
              {/* Additional Stats Card */}
              <div className="bg-surface rounded-xl border border-border shadow-soft p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
                  {currentLanguage === 'ar' ? 'إحصائيات سريعة' : 'Statistiques rapides'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-caption text-text-secondary">
                      {currentLanguage === 'ar' ? 'أيام منذ التسجيل' : 'Jours depuis l\'inscription'}
                    </span>
                    <span className="text-lg font-heading font-semibold text-text-primary">
                      {Math.floor((new Date() - studentData.registrationDate) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-caption text-text-secondary">
                      {currentLanguage === 'ar' ? 'معدل الإكمال' : 'Taux de completion'}
                    </span>
                    <span className="text-lg font-heading font-semibold text-success">
                      {Math.round((progressData.completedSteps / progressData.totalSteps) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-caption text-text-secondary">
                      {currentLanguage === 'ar' ? 'الجلسات المكتملة' : 'Sessions complétées'}
                    </span>
                    <span className="text-lg font-heading font-semibold text-text-primary">
                      {progressData.sessionsCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tab Navigation */}
      <TabNavigation />
    </div>
  );
};

export default StudentDashboard;