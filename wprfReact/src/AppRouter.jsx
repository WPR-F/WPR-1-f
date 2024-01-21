import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';
import AdminPortal from './AdminPortal/components/AdminPortal';
import PanellidLijst from './AdminPortal/components/PanellidLijst';
import HuidigeOnderzoeken from './AdminPortal/components/HuidigeOnderzoeken';
import BedrijvenLijst from './AdminPortal/components/BedrijvenLijst';
<<<<<<< HEAD
// import Aanvragen from './AdminPortal/components/Aanvragen';
=======
import Aanvragen from './AdminPortal/components/Aanvragen';
>>>>>>> origin/Develop
import PanellidPortal from './PanellidPortal/components/PanellidPortal';
import PanellidProfiel from './PanellidPortal/components/PanellidProfiel';
import OpenOnderzoeken from './PanellidPortal/components/OpenOnderzoeken';
import ActieveOnderzoeken from './PanellidPortal/components/ActieveOnderzoeken';
<<<<<<< HEAD
import Onderzoek from './BedrijfsPortal/components/Onderzoek';
import SidebarAdminPortal from './SidebarAdminPortal';
import SidebarPanellidPortal from './SidebarPanellidPortal';
import SidebarBedrijfsPortal from './SidebarBedrijfPortal';

function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser, isAdmin, setIsAdmin, isPanellid, setIsPanellid, isBedrijf, setIsBedrijf}) {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} isPanellid={isPanellid} isBedrijf={isBedrijf} setIsBedrijf={setIsBedrijf}/> } />
      <Route path="/profielpagina" element={<ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} isLoggedIn={isLoggedIn}/>} />

      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<AdminPortal isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="/AdminPortal/PanellidLijst" element={<PanellidLijst />} />
      <Route path="/AdminPortal/HuidigeOnderzoeken" element={<HuidigeOnderzoeken />} />
      <Route path="/AdminPortal/BedrijvenLijst" element={<BedrijvenLijst/>} />
      {/* <Route path='/AdminPortal/Aanvragen' element={<Aanvragen/>} /> */}

      {/* PanellidPortal Components */}
      <Route path='/PanellidPortal' element={<PanellidPortal isLoggedIn={isLoggedIn} isPanellid={isPanellid}/>} />
      <Route path='/PanellidPortal/PanellidProfiel' element={<PanellidProfiel currentUser={currentUser} />} />
      <Route path='/PanellidPortal/OpenOnderzoeken' element={<OpenOnderzoeken/>} />
      <Route path='/PanellidPortal/ActieveOnderzoeken' element={<ActieveOnderzoeken/>} />

      {/* BedrijfsPortal Components */} 
      <Route path='/BedrijfsPortal' element={<SidebarBedrijfsPortal/>} />
      <Route path='/BedrijfsPortal/Onderzoeken' element={<Onderzoek/>} />

=======

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
>>>>>>> origin/Develop
    </Routes>
  );
}

export default AppRouter;
