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

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/search' element={<VolunteerEventSearch />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/profile-information" element={<ProfileInformation />} />
          <Route path="/profile-avatar" element={<ProfileAvatar />} />
          <Route path="/profile-history" element={<ProfileHistory />} />
          <Route path="/profile-favourite" element={<ProfileFavourite />} />
          <Route path="/failed-register" element={<FailedRegister />} />
          <Route path="/success-register" element={<SuccessRegister />} />
          <Route path="/upgrade-pro" element={<UpgradePro />} />
          <Route path='/form-register' element={<FormRegisterPage/>}/>
          <Route path='/event-detail' element={<EventDetail/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
