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
import ForgotPasswordPage from "./pages/forgotpassword_page/ForgotPasswordPage";
import FeedbackManagement from "./pages/feedbackmanagerment_page/FeedbackManagement";
import SupportRequestPage from './pages/support_page/SupportRequestPage';
import AdminLayout from './layout/AdminLayout';
import AdminCourses from './pages/admin_course_page/AdminCoursesPage';
import AdminStudents from './pages/admin_students_page/AdminStudentsPage';
import AdminDashboard from './pages/admin_dashboard_page/AdminDashboardPage';
import AdminOrganizations from './pages/admin_organization_page/admin_organization';
import AdminVolunteerPosts from './pages/admin_posts_page/AdminPostPage';
import AdminEventAttendance from './pages/admin_students_page/AdminAttendancePage';
import AdminEventParticipants from './pages/admin_students_page/AdminEventParticipant';
import { ToastProvider } from './components/toast/ToastNotification';
import OwnerLayout from './layout/OwnerLayout';
import OrganizationPostPage from './pages/organization_post_page/OrganizationPostPage';
import ProfileScore from './pages/profile_page/ProfileScore';
import ProfileCertificate from './pages/profile_page/ProfileCertificate';
import FeedbackPage from './pages/feedback_page/FeedbackPage';
import OrganizationUserRequests from './pages/organization_user_page/OrganizationUserRequest';
import OrganizationEventAttendance from './pages/organization_user_page/OrganizationUserAttendance';
import AdminSupportRequests from './pages/admin_support_page/AdminSupportRequest';
import AuthenGatePage from './pages/login_page/AuthenGatePage';
import ProtectedRoute from './layout/ProtectedLayout';
import GuestLayout from './layout/GuestLayout';
import OnBoardingPage from './pages/onboarding_page/OnBoardingPage';
import PaymentSuccessPage from './pages/payment_status_page/PaymentSuccessPage';
import PaymentCancelPage from './pages/payment_status_page/PaymentCancelPage';
import MyEventsPage from './pages/my_events_page/MyEventsPage';
import AdminFeedbackPage from "./pages/admin_students_page/AdminFeedbackPage";
import OrganizationEvents from './pages/organization_post_page/OrganizationEventManagement';
import OrganizationDashboardPage from './pages/organization_dashboard_page/OrganizationDashboardPage';
import StaffAttendancePage from './pages/staff_attendance_page/StaffAttendancePage';
import OrganizationStaffManagement from './pages/organization_user_page/OrganizationStaffManagement';
import StaffLayout from './layout/StaffLayout';

import CertificatePurchasePage from './pages/profile_page/CertificatePurchasePage';
const guestRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/search', element: <VolunteerEventSearch /> },
  { path: '/onboarding', element: <OnBoardingPage /> },
];

const publicRoutes = [
  { path: '/login', element: <AuthenGatePage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/payment-success', element: <PaymentSuccessPage/> },
  { path: '/payment-cancel', element: <PaymentCancelPage/> },
]

const privateCustomerRoutes = [
  { path: '/profile-information', element: <ProfileInformation /> },
  { path: '/profile-avatar', element: <ProfileAvatar /> },
  { path: '/profile-history', element: <ProfileHistory /> },
  { path: '/profile-favourite', element: <ProfileFavourite /> },
  { path: '/failed-register', element: <FailedRegister /> },
  { path: '/success-register', element: <SuccessRegister /> },
  { path: '/form-register/:id', element: <FormRegisterPage /> },
  { path: '/event-detail/:id', element: <EventDetail /> },
  { path: '/feedback', element: <FeedbackManagement /> },
  { path: '/support', element: <SupportRequestPage /> },
  { path: '/profile-score', element: <ProfileScore /> },
  { path: '/profile-certificate', element: <ProfileCertificate /> },
  { path: '/feedback-page', element: <FeedbackPage /> },
  { path: '/my-events', element: <MyEventsPage /> },
  { path: '/profile-certificate-purchases', element: <CertificatePurchasePage /> },
];

const privateAdminRoutes = [
  { path: '/dashboard', element: <AdminDashboard /> },
  { path: '/course', element: <AdminCourses /> },
  { path: '/student', element: <AdminStudents /> },
  { path: '/admin-support', element: <AdminSupportRequests /> },
  { path: '/admin-organization', element: <AdminOrganizations /> },
  { path: '/admin-post', element: <AdminVolunteerPosts /> },
  { path: '/admin-attendance', element: <AdminEventAttendance /> },
];

const privateOwnerRoutes = [
  { path: '/owner-dashboard', element: <OrganizationDashboardPage /> },
  { path: '/owner-post', element: <OrganizationPostPage /> },
  { path: '/owner-user', element: <OrganizationUserRequests /> },
  { path: '/owner-attendance', element: <OrganizationEventAttendance /> },
  { path: '/admin-participant', element: <AdminEventParticipants /> },
  {path: '/owner-feedback', element: <AdminFeedbackPage />},
  { path: '/upgrade-pro', element: <UpgradePro /> },
  { path: '/owner-finished-events', element: <OrganizationEvents /> },
  { path: '/owner-staff', element: <OrganizationStaffManagement /> },
];

const privateStaffRoutes = [
  { path: '/staff-attendance', element: <StaffAttendancePage /> },
];

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route element={<CustomerLayout />}>
            {privateCustomerRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>

          {/* Staff Routes - Separate layout for staff */}
          <Route element={<StaffLayout />}>
            {privateStaffRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            {privateAdminRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>

          {/* Owner Routes */}
          <Route element={<OwnerLayout />}>
            {privateOwnerRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={['organization']}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>

          {/* Public Routes */}
          {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
          ))}

          {/* Guest Routes */}
          <Route element={<GuestLayout />}>
            {guestRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
