import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ROUTES } from "@/constants/routes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Layouts
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

// Student pages
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StudentChat from "./pages/dashboard/student/StudentChat";
import StudentSubjects from "./pages/dashboard/student/StudentSubjects";
import StudentPlan from "./pages/dashboard/student/StudentPlan";
import StudentNotes from "./pages/dashboard/student/StudentNotes";
import StudentPractice from "./pages/dashboard/student/StudentPractice";
import StudentExams from "./pages/dashboard/student/StudentExams";
import StudentProgress from "./pages/dashboard/student/StudentProgress";
import StudentTimer from "./pages/dashboard/student/StudentTimer";
import StudentSettings from "./pages/dashboard/student/StudentSettings";

// Business pages
import BusinessDashboard from "./pages/dashboard/BusinessDashboard";
import BusinessChat from "./pages/dashboard/business/BusinessChat";
import BusinessSales from "./pages/dashboard/business/BusinessSales";
import BusinessMarketing from "./pages/dashboard/business/BusinessMarketing";
import BusinessContent from "./pages/dashboard/business/BusinessContent";
import BusinessCustomers from "./pages/dashboard/business/BusinessCustomers";
import BusinessGoals from "./pages/dashboard/business/BusinessGoals";
import BusinessAnalytics from "./pages/dashboard/business/BusinessAnalytics";
import BusinessReports from "./pages/dashboard/business/BusinessReports";
import BusinessCalendar from "./pages/dashboard/business/BusinessCalendar";
import BusinessSettings from "./pages/dashboard/business/BusinessSettings";

// Founder pages
import FounderDashboard from "./pages/dashboard/FounderDashboard";
import FounderChat from "./pages/dashboard/founder/FounderChat";
import FounderValidate from "./pages/dashboard/founder/FounderValidate";
import FounderRoadmap from "./pages/dashboard/founder/FounderRoadmap";
import FounderTech from "./pages/dashboard/founder/FounderTech";
import FounderMilestones from "./pages/dashboard/founder/FounderMilestones";
import FounderOKRs from "./pages/dashboard/founder/FounderOKRs";
import FounderTeam from "./pages/dashboard/founder/FounderTeam";
import FounderPitch from "./pages/dashboard/founder/FounderPitch";
import FounderMetrics from "./pages/dashboard/founder/FounderMetrics";
import FounderSettings from "./pages/dashboard/founder/FounderSettings";

import { RoleBasedRoute } from "@/components/auth/RoleBasedRoute";
import { UserRole } from "@/types/user";

const queryClient = new QueryClient();

function DashboardRouter() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Normalize role check
  switch (user?.role) {
    case UserRole.STUDENT:
      return <Navigate to={ROUTES.STUDENT.HOME} replace />;
    case UserRole.BUSINESS:
      return <Navigate to={ROUTES.BUSINESS.HOME} replace />;
    case UserRole.FOUNDER:
      return <Navigate to={ROUTES.FOUNDER.HOME} replace />;
    default:
      return <Navigate to={ROUTES.LOGIN} replace />;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
              <Route path={ROUTES.DASHBOARD} element={<DashboardRouter />} />

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>

                {/* Student Nest */}
                <Route path="student">
                  <Route index element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="chat" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentChat />
                    </RoleBasedRoute>
                  } />
                  <Route path="subjects" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentSubjects />
                    </RoleBasedRoute>
                  } />
                  <Route path="plan" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentPlan />
                    </RoleBasedRoute>
                  } />
                  <Route path="notes" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentNotes />
                    </RoleBasedRoute>
                  } />
                  <Route path="practice" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentPractice />
                    </RoleBasedRoute>
                  } />
                  <Route path="exams" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentExams />
                    </RoleBasedRoute>
                  } />
                  <Route path="progress" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentProgress />
                    </RoleBasedRoute>
                  } />
                  <Route path="timer" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentTimer />
                    </RoleBasedRoute>
                  } />
                  <Route path="settings" element={
                    <RoleBasedRoute allowedRoles={[UserRole.STUDENT]}>
                      <StudentSettings />
                    </RoleBasedRoute>
                  } />
                </Route>

                {/* Business Nest */}
                <Route path="business">
                  <Route index element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="chat" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessChat />
                    </RoleBasedRoute>
                  } />
                  <Route path="sales" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessSales />
                    </RoleBasedRoute>
                  } />
                  <Route path="marketing" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessMarketing />
                    </RoleBasedRoute>
                  } />
                  <Route path="content" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessContent />
                    </RoleBasedRoute>
                  } />
                  <Route path="customers" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessCustomers />
                    </RoleBasedRoute>
                  } />
                  <Route path="goals" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessGoals />
                    </RoleBasedRoute>
                  } />
                  <Route path="analytics" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessAnalytics />
                    </RoleBasedRoute>
                  } />
                  <Route path="reports" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessReports />
                    </RoleBasedRoute>
                  } />
                  <Route path="calendar" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessCalendar />
                    </RoleBasedRoute>
                  } />
                  <Route path="settings" element={
                    <RoleBasedRoute allowedRoles={[UserRole.BUSINESS]}>
                      <BusinessSettings />
                    </RoleBasedRoute>
                  } />
                </Route>

                {/* Founder Nest */}
                <Route path="founder">
                  <Route index element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="chat" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderChat />
                    </RoleBasedRoute>
                  } />
                  <Route path="validate" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderValidate />
                    </RoleBasedRoute>
                  } />
                  <Route path="roadmap" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderRoadmap />
                    </RoleBasedRoute>
                  } />
                  <Route path="tech" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderTech />
                    </RoleBasedRoute>
                  } />
                  <Route path="milestones" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderMilestones />
                    </RoleBasedRoute>
                  } />
                  <Route path="okrs" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderOKRs />
                    </RoleBasedRoute>
                  } />
                  <Route path="team" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderTeam />
                    </RoleBasedRoute>
                  } />
                  <Route path="pitch" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderPitch />
                    </RoleBasedRoute>
                  } />
                  <Route path="metrics" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderMetrics />
                    </RoleBasedRoute>
                  } />
                  <Route path="settings" element={
                    <RoleBasedRoute allowedRoles={[UserRole.FOUNDER]}>
                      <FounderSettings />
                    </RoleBasedRoute>
                  } />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
