import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing_page/LandingPage'
import "bootstrap/dist/css/bootstrap.min.css"
import VolunteerEventSearch from './pages/search_page/SearchPage'
import ProfileInformation from "./pages/profile_page/ProfileInformation";
import ProfileAvatar from "./pages/profile_page/ProfileAvatar";
import ProfileFavourite from "./pages/profile_page/ProfileFavourite";
import ProfileHistory from "./pages/profile_page/ProfileHistory";
import FailedRegister from "./pages/register_event_page/FailedRegister";
import SuccessRegister from "./pages/register_event_page/SuccesRegister";
import UpgradePro from "./pages/pro_page/UpgradePro";
import CustomerLayout from './layout/CustomerLayout';
import FormRegisterPage from './pages/register_event_page/FormRegisterPage';
import EventDetail from './pages/detail_page/EventDetailPage';
import LoginPage from "./pages/login_page/LoginPage";
import RegisterPage from "./pages/register_page/RegisterPage";
import ForgotPasswordPage from "./pages/forgotpassword_page/ForgotPasswordPage";
import FeedbackManagement from "./pages/feedbackmanagerment_page/FeedbackManagement";
import SupportRequestPage from './pages/support_page/SupportRequestPage';
import AdminLayout from './layout/AdminLayout';
import AdminCourses from './pages/admin_course_page/AdminCoursesPage';
import AdminStudents from './pages/admin_students_page/AdminStudentsPage';
import AdminSupportRequests from './pages/admin_support_page/AdminSupportRequest';
import AdminDashboard from './pages/admin_dashboard_page/AdminDashboardPage';
import AdminOrganizations from './pages/admin_organization_page/admin_organization';
import AdminVolunteerPosts from './pages/admin_posts_page/AdminPostPage';
import AdminEventAttendance from './pages/admin_students_page/AdminAttendancePage';
import AdminEventParticipants from './pages/admin_students_page/AdminEventParticipant';
import { ToastProvider } from './components/toast/ToastNotification';
import OwnerLayout from './layout/OwnerLayout';
import OrganizationPostPage from './pages/organization_post_page/OrganizationPostPage';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>

          {/* Have navbar customer */}
          <Route element={<CustomerLayout />}>
            <Route path='/home' element={<LandingPage />} />
            <Route path='/search' element={<VolunteerEventSearch />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/profile-information" element={<ProfileInformation />} />
            <Route path="/profile-avatar" element={<ProfileAvatar />} />
            <Route path="/profile-history" element={<ProfileHistory />} />
            <Route path="/profile-favourite" element={<ProfileFavourite />} />
            <Route path="/failed-register" element={<FailedRegister />} />
            <Route path="/success-register" element={<SuccessRegister />} />
            <Route path="/upgrade-pro" element={<UpgradePro />} />
            <Route path='/form-register' element={<FormRegisterPage />} />
            <Route path='/event-detail' element={<EventDetail />} />
            <Route path='/feedback' element={<FeedbackManagement />} />
            <Route path='/support' element={<SupportRequestPage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/course' element={<AdminCourses />} />
            <Route path='/student' element={<AdminStudents />} />
            <Route path='/admin-support' element={<AdminSupportRequests />} />
            <Route path='/admin-organization' element={<AdminOrganizations />} />
            <Route path='/admin-post' element={<AdminVolunteerPosts />} />
            <Route path='/admin-attendance' element={<AdminEventAttendance />} />
            <Route path='/admin-participant' element={<AdminEventParticipants />} />
          </Route>

          <Route element={<OwnerLayout />}>
            <Route path='/owner-post' element={<OrganizationPostPage />} />
          </Route>


          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotpassword' element={<ForgotPasswordPage />} />

        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
