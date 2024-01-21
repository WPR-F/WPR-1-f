import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';
import AdminPortal from './AdminPortal/components/AdminPortal';
import PanellidLijst from './AdminPortal/components/PanellidLijst';
import HuidigeOnderzoeken from './AdminPortal/components/HuidigeOnderzoeken';
import BedrijvenLijst from './AdminPortal/components/BedrijvenLijst';
import Aanvragen from './AdminPortal/components/Aanvragen';
import PanellidPortal from './PanellidPortal/components/PanellidPortal';
import PanellidProfiel from './PanellidPortal/components/PanellidProfiel';
import OpenOnderzoeken from './PanellidPortal/components/OpenOnderzoeken';
import ActieveOnderzoeken from './PanellidPortal/components/ActieveOnderzoeken';

import SidebarAdminPortal from './SidebarAdminPortal.jsx';
import SidebarBedrijfPortal from './SidebarBedrijfPortal.jsx';
import SidebarPanellidPortal from './SidebarPanellidPortal.jsx';

function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser, isAdmin, isPanellid }) {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} isLoggedIn={isLoggedIn} isPanellid={isPanellid} />} />
      <Route path="/profielpagina" element={<><ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} /><SidebarAdminPortal /></>} />

      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<AdminPortal isAdmin={isAdmin} isLoggedIn={isLoggedIn}><Routes>
        <Route path="/PanellidLijst" element={<PanellidLijst />} />
        <Route path="/HuidigeOnderzoeken" element={<HuidigeOnderzoeken />} />
        <Route path="/BedrijvenLijst" element={<BedrijvenLijst />} />
        <Route path="/Aanvragen" element={<Aanvragen />} />
      </Routes></AdminPortal>} />

      {/* PanellidPortal Components */}
      <Route path="/PanellidPortal" element={<PanellidPortal isLoggedIn={isLoggedIn} isPanellid={isPanellid}><Routes>
        <Route path="/PanellidProfiel" element={<PanellidProfiel currentUser={currentUser} />} />
        <Route path="/OpenOnderzoeken" element={<OpenOnderzoeken />} />
        <Route path="/ActieveOnderzoeken" element={<ActieveOnderzoeken />} />
      </Routes></PanellidPortal>} />
    </Routes>
  );
}

export default AppRouter;
