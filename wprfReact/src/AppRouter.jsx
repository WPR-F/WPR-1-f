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
import PrivateRoute from './Privateroute'; // Adjust this import statement to match the actual path to your PrivateRoute component


function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/profielpagina" element={<><ProfielPagina/></>} />
   
      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<PrivateRoute element={AdminPortal} roles={["Admin"]} />} />
      <Route path="AdminPortal/PanellidLijst" element={<PrivateRoute element={PanellidLijst} roles={["Admin"]} />} />
      <Route path="AdminPortal/HuidigeOnderzoeken" element={<PrivateRoute element={HuidigeOnderzoeken} roles={["Admin"]} />} />
      <Route path="AdminPortal/BedrijvenLijst" element={<PrivateRoute element={BedrijvenLijst} roles={["Admin"]} />} />
      <Route path='/AdminPortal/PanellidLijst/Panellidinfo/:id' element={<PrivateRoute element={PanellidInfo} roles={["Admin"]} />} /> 

      {/* PanellidPortal Components */}
      <Route path='/PanellidPortal' element={<PrivateRoute element={PanellidPortal} roles={["Panellid"]} />} />
      <Route path='PanellidPortal/PanellidProfiel' element={<PrivateRoute element={PanellidProfiel} roles={["Panellid"]} />} />
      <Route path='PanellidPortal/OpenOnderzoeken' element={<PrivateRoute element={OpenOnderzoeken} roles={["Panellid"]} />} />
      <Route path='PanellidPortal/ActieveOnderzoeken' element={<PrivateRoute element={ActieveOnderzoeken} roles={["Panellid"]} />} />

      {/* BedrijfsPortal Components */}
      <Route path='/BedrijfsPortal' element={<PrivateRoute element={SidebarBedrijfPortal} roles={["Company"]} />} />
      <Route path='/BedrijfsPortal/onderzoek' element={<PrivateRoute element={Onderzoek} roles={["Company"]} />} />
    </Routes>
  );
}

export default AppRouter;