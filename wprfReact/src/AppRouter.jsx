import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import SidebarAdminPortal from './SidebarAdminPortal.jsx';
import SidebarBedrijfPortal from './SidebarBedrijfPortal.jsx';
import SidebarPanellidPortal from './SidebarPanellidPortal.jsx';

function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser }) {
  return (
    <Routes>
      <Route path="/register" element={<><RegisterForm/></>}/>
      <Route path="/login" element={<><LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn}/></>} />
      <Route path="/profielpagina" element={<><ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser}/><SidebarAdminPortal/></>} />
    </Routes>
  );
}

export default AppRouter;