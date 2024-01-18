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

function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser, isAdmin, setIsAdmin, isPanellid, setIsPanellid}) {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} isPanellid={isPanellid} setIsPanellid={setIsPanellid}/> } />
      <Route path="/profielpagina" element={<ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} isLoggedIn={isLoggedIn}/>} />

      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<AdminPortal isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="AdminPortal/PanellidLijst" element={<PanellidLijst />} />
      <Route path="AdminPortal/HuidigeOnderzoeken" element={<HuidigeOnderzoeken />} />
      <Route path="AdminPortal/BedrijvenLijst" element={<BedrijvenLijst/>} />
      <Route path='AdminPortal/Aanvragen' element={<Aanvragen/>} />

      {/* PanellidPortal Components */}
      <Route path='/PanellidPortal' element={<PanellidPortal/>} />
      <Route path='PanellidPortal/PanellidProfiel' element={<PanellidProfiel currentUser={currentUser} />} />
      <Route path='PanellidPortal/OpenOnderzoeken' element={<OpenOnderzoeken/>} />
      <Route path='PanellidPortal/ActieveOnderzoeken' element={<ActieveOnderzoeken/>} />

    </Routes>
  );
}

export default AppRouter;