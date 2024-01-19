import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';
import AdminPortal from './AdminPortal/components/AdminPortal';
import PanellidLijst from './AdminPortal/components/PanellidLijst';
import HuidigeOnderzoeken from './AdminPortal/components/HuidigeOnderzoeken';
import BedrijvenLijst from './AdminPortal/components/BedrijvenLijst';
import Aanvragen from './AdminPortal/components/Aanvragen';

<<<<<<< HEAD
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
=======
function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser, isAdmin, setIsAdmin}) {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="/profielpagina" element={<ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} isLoggedIn={isLoggedIn}/>} />

      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<AdminPortal isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="AdminPortal/PanellidLijst" element={<PanellidLijst />} />
      <Route path="AdminPortal/HuidigeOnderzoeken" element={<HuidigeOnderzoeken />} />
      <Route path="AdminPortal/BedrijvenLijst" element={<BedrijvenLijst/>} />
      <Route path='AdminPortal/Aanvragen' element={<Aanvragen/>} />

>>>>>>> Develop
    </Routes>
  );
}

export default AppRouter;