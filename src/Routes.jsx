import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import StudentRegistration from "pages/student-registration";
import StudentLogin from "pages/student-login";
import StudentDashboard from "pages/student-dashboard";
import BranchRecommendations from "pages/branch-recommendations";
import CoachingSessionScheduler from "pages/coaching-session-scheduler";
import BranchAssessmentForm from "pages/branch-assessment-form";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/branch-recommendations" element={<BranchRecommendations />} />
        <Route path="/coaching-session-scheduler" element={<CoachingSessionScheduler />} />
        <Route path="/branch-assessment-form" element={<BranchAssessmentForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;