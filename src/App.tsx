import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

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

const queryClient = new QueryClient();

function DashboardRouter() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role check
  switch (user?.role) {
    case 'student':
      return <Navigate to="/dashboard/student" replace />;
    case 'business':
      return <Navigate to="/dashboard/business" replace />;
    case 'founder':
      return <Navigate to="/dashboard/founder" replace />;
    default:
      return <Navigate to="/login" replace />;
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<DashboardRouter />} />

              {/* Student Routes */}
              <Route path="/dashboard/student" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/chat" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentChat />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/subjects" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentSubjects />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/plan" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentPlan />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/notes" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentNotes />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/practice" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentPractice />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/exams" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentExams />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/progress" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentProgress />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/timer" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentTimer />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/student/settings" element={
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentSettings />
                </RoleBasedRoute>
              } />

              {/* Business Routes */}
              <Route path="/dashboard/business" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/chat" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessChat />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/sales" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessSales />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/marketing" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessMarketing />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/content" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessContent />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/customers" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessCustomers />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/goals" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessGoals />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/analytics" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessAnalytics />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/reports" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessReports />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/calendar" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessCalendar />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/business/settings" element={
                <RoleBasedRoute allowedRoles={['business']}>
                  <BusinessSettings />
                </RoleBasedRoute>
              } />

              {/* Founder Routes */}
              <Route path="/dashboard/founder" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/chat" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderChat />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/validate" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderValidate />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/roadmap" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderRoadmap />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/tech" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderTech />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/milestones" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderMilestones />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/okrs" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderOKRs />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/team" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderTeam />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/pitch" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderPitch />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/metrics" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderMetrics />
                </RoleBasedRoute>
              } />
              <Route path="/dashboard/founder/settings" element={
                <RoleBasedRoute allowedRoles={['founder']}>
                  <FounderSettings />
                </RoleBasedRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
