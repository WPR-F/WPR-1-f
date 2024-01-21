import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';
import AdminPortal from './AdminPortal/components/AdminPortal';
import PanellidLijst from './AdminPortal/components/PanellidLijst';
import HuidigeOnderzoeken from './AdminPortal/components/HuidigeOnderzoeken';
import BedrijvenLijst from './AdminPortal/components/BedrijvenLijst';
import PanellidPortal from './PanellidPortal/components/PanellidPortal';
import PanellidProfiel from './PanellidPortal/components/PanellidProfiel';
import OpenOnderzoeken from './PanellidPortal/components/OpenOnderzoeken';
import ActieveOnderzoeken from './PanellidPortal/components/ActieveOnderzoeken';
import Onderzoek from './BedrijfsPortal/components/Onderzoek';

import PanellidInfo from './AdminPortal/components/PanellidInfo';

function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser, isAdmin, setIsAdmin, isPanellid, setIsPanellid}) {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} isPanellid={isPanellid} setIsPanellid={setIsPanellid}/> } />
      <Route path="/profielpagina" element={<ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} isLoggedIn={isLoggedIn} isPanellid={isPanellid} isAdmin={isAdmin}/>} />

      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<AdminPortal isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="AdminPortal/PanellidLijst" element={<PanellidLijst isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="AdminPortal/HuidigeOnderzoeken" element={<HuidigeOnderzoeken isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path="AdminPortal/BedrijvenLijst" element={<BedrijvenLijst isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} />
      <Route path='/AdminPortal/PanellidLijst/Panellidinfo/:id' element={<PanellidInfo isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>} /> 

      {/* PanellidPortal Components */}
      <Route path='/PanellidPortal' element={<PanellidPortal isLoggedIn={isLoggedIn} isPanellid={isPanellid}/>} />
      <Route path='PanellidPortal/PanellidProfiel' element={<PanellidProfiel currentUser={currentUser} isLoggedIn={isLoggedIn} isPanellid={isPanellid}/>} />
      <Route path='PanellidPortal/OpenOnderzoeken' element={<OpenOnderzoeken isLoggedIn={isLoggedIn} isPanellid={isPanellid}/>} />
      <Route path='PanellidPortal/ActieveOnderzoeken' element={<ActieveOnderzoeken isLoggedIn={isLoggedIn} isPanellid={isPanellid}/>} />

      {/* BedrijfsPortal Components */} 
      <Route path='/BedrijfsPortal' element={<Onderzoek isLoggedIn={isLoggedIn} isPanellid={isPanellid}/>} />
      <Route path='BedrijfsPortal/Onderzoeken' element={<Onderzoek/>} />

    </Routes>
  );
}

export default AppRouter;