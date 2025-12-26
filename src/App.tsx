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

const queryClient = new QueryClient();

function DashboardRouter() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (user?.role) {
    case 'student':
      return <StudentDashboard />;
    case 'business':
      return <BusinessDashboard />;
    case 'founder':
    default:
      return <FounderDashboard />;
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
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/chat" element={<StudentChat />} />
              <Route path="/dashboard/student/subjects" element={<StudentSubjects />} />
              <Route path="/dashboard/student/plan" element={<StudentPlan />} />
              <Route path="/dashboard/student/notes" element={<StudentNotes />} />
              <Route path="/dashboard/student/practice" element={<StudentPractice />} />
              <Route path="/dashboard/student/exams" element={<StudentExams />} />
              <Route path="/dashboard/student/progress" element={<StudentProgress />} />
              <Route path="/dashboard/student/timer" element={<StudentTimer />} />
              <Route path="/dashboard/student/settings" element={<StudentSettings />} />
              
              {/* Business Routes */}
              <Route path="/dashboard/business" element={<BusinessDashboard />} />
              <Route path="/dashboard/business/chat" element={<BusinessChat />} />
              <Route path="/dashboard/business/sales" element={<BusinessSales />} />
              <Route path="/dashboard/business/marketing" element={<BusinessMarketing />} />
              <Route path="/dashboard/business/content" element={<BusinessContent />} />
              <Route path="/dashboard/business/customers" element={<BusinessCustomers />} />
              <Route path="/dashboard/business/goals" element={<BusinessGoals />} />
              <Route path="/dashboard/business/analytics" element={<BusinessAnalytics />} />
              <Route path="/dashboard/business/reports" element={<BusinessReports />} />
              <Route path="/dashboard/business/calendar" element={<BusinessCalendar />} />
              <Route path="/dashboard/business/settings" element={<BusinessSettings />} />
              
              {/* Founder Routes */}
              <Route path="/dashboard/founder" element={<FounderDashboard />} />
              <Route path="/dashboard/founder/chat" element={<FounderChat />} />
              <Route path="/dashboard/founder/validate" element={<FounderValidate />} />
              <Route path="/dashboard/founder/roadmap" element={<FounderRoadmap />} />
              <Route path="/dashboard/founder/tech" element={<FounderTech />} />
              <Route path="/dashboard/founder/milestones" element={<FounderMilestones />} />
              <Route path="/dashboard/founder/okrs" element={<FounderOKRs />} />
              <Route path="/dashboard/founder/team" element={<FounderTeam />} />
              <Route path="/dashboard/founder/pitch" element={<FounderPitch />} />
              <Route path="/dashboard/founder/metrics" element={<FounderMetrics />} />
              <Route path="/dashboard/founder/settings" element={<FounderSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
