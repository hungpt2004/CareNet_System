import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import LandingPage from './pages/landing_page/LandingPage'
import "bootstrap/dist/css/bootstrap.min.css"
import VolunteerEventSearch from './pages/search_page/SearchPage'
import LoginPage from "./pages/login_page/LoginPage";
import RegisterPage from "./pages/register_page/RegisterPage";
import ForgotPasswordPage from "./pages/forgotpassword_page/ForgotPasswordPage";
import FeedbackManagement from "./pages/feedbackmanagerment_page/FeedbackManagement";
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/search' element={<VolunteerEventSearch/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/forgotpassword' element={<ForgotPasswordPage/>}/>
        <Route path='/feedback' element={<FeedbackManagement/>}/>
      </Routes>
    </Router>
  )
}

export default App
