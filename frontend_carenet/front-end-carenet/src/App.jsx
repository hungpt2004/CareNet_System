import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import LandingPage from './pages/landing_page/LandingPage'
import "bootstrap/dist/css/bootstrap.min.css"
import VolunteerEventSearch from './pages/search_page/SearchPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/landing-page' element={<LandingPage/>}/>
        <Route path='/search' element={<VolunteerEventSearch/>}/>
      </Routes>
    </Router>
  )
}

export default App
