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
];

const privateAdminRoutes = [
  { path: '/dashboard', element: <AdminDashboard /> },
  { path: '/course', element: <AdminCourses /> },
  { path: '/student', element: <AdminStudents /> },
  { path: '/admin-support', element: <AdminSupportRequests /> },
  { path: '/admin-organization', element: <AdminOrganizations /> },
  { path: '/admin-post', element: <AdminVolunteerPosts /> },
  { path: '/admin-attendance', element: <AdminEventAttendance /> },
  { path: '/upgrade-pro', element: <UpgradePro /> },
];

const privateOwnerRoutes = [
  { path: '/owner-post', element: <OrganizationPostPage /> },
  { path: '/owner-user', element: <OrganizationUserRequests /> },
  { path: '/owner-attendance', element: <OrganizationEventAttendance /> },
  { path: '/admin-participant', element: <AdminEventParticipants /> },
];


function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
          ))}


          {/* Guest */}
          <Route element={<GuestLayout />}>
            {guestRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          {/* Customer Routes - Requires login with 'customer' role */}
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

          {/* STAFF */}


          {/* Admin Routes - Requires login with 'admin' role */}
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

          {/* Owner Routes - Requires login with 'owner' role */}
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
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
