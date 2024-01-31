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
import PanellidInfo from './AdminPortal/components/PanellidInfo';
import Onderzoek from './BedrijfsPortal/components/Onderzoek';
import SidebarAdminPortal from './AdminPortal/components/SidebarAdminPortal';
import SidebarBedrijfPortal from './BedrijfsPortal/components/SidebarBedrijfPortal';
import SidebarPanellidPortal from './PanellidPortal/components/SidebarPanellidPortal';

function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/profielpagina" element={<><ProfielPagina/></>} />
      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<><AdminPortal/><SidebarAdminPortal/></>} />
      <Route path="AdminPortal/PanellidLijst" element={<PanellidLijst />} />
      <Route path="AdminPortal/HuidigeOnderzoeken" element={<HuidigeOnderzoeken />} />
      <Route path="AdminPortal/BedrijvenLijst" element={<BedrijvenLijst />} />
      <Route path='/AdminPortal/PanellidLijst/Panellidinfo/:id' element={<PanellidInfo />} /> 

      {/* PanellidPortal Components */}
      <Route path='/PanellidPortal' element={<><PanellidPortal/><SidebarPanellidPortal/></>} />
      <Route path='PanellidPortal/PanellidProfiel' element={<PanellidProfiel />} />
      <Route path='PanellidPortal/OpenOnderzoeken' element={<OpenOnderzoeken />} />
      <Route path='PanellidPortal/ActieveOnderzoeken' element={<ActieveOnderzoeken />} />

      {/* BedrijfsPortal Components */}
      <Route path='/BedrijfsPortal' element={<sidebarBedrijfPortal/>} />
      <Route path='/BedrijfsPortal/onderzoek' element={<><Onderzoek/><SidebarBedrijfPortal/></>} />
    </Routes>
  );
}

export default AppRouter;