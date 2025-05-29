const publicRoutes = [
   { path: '/home', element: <LandingPage /> },
   { path: '/login', element: <LoginPage /> },
   { path: '/search', element: <VolunteerEventSearch /> },
   { path: '/login', element: <AuthenGatePage /> },
   { path: '/forgot-password', element: <ForgotPasswordPage /> },
];
 
const privateCustomerRoutes = [
   { path: '/profile-information', element: <ProfileInformation /> },
   { path: '/event-detail', element: <EventDetail /> },
   { path: '/form-register', element: <FormRegisterPage /> },
   { path: '/feedback', element: <FeedbackManagement /> },
   { path: '/support', element: <SupportRequestPage /> },
   { path: '/success-register', element: <SuccessRegister /> },
   { path: '/failed-register', element: <FailedRegister /> },
   { path: '/profile-avatar', element: <ProfileAvatar /> },
   { path: '/profile-history', element: <ProfileHistory /> },
   { path: '/profile-favourite', element: <ProfileFavourite /> },
   { path: '/profile-score', element: <ProfileScore /> },
   { path: '/profile-certificate', element: <ProfileCertificate /> },
   { path: '/feedback-page', element: <FeedbackPage /> },
];
 