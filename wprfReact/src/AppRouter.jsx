import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';
import AdminPortal from './AdminPortal/components/AdminPortal';
import PanellidLijst from './AdminPortal/components/PanellidLijst';
import HuidigeOnderzoeken from './AdminPortal/components/HuidigeOnderzoeken';
import BedrijvenLijst from './AdminPortal/components/BedrijvenLijst';
import Aanvragen from './AdminPortal/components/Aanvragen';

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

    </Routes>
  );
}

export default AppRouter;