import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';
import LoginForm from './Login/loginForm';
import ProfielPagina from './Profiel/ProfielPagina';
import AdminPortal from './AdminPortal/components/AdminPortal';
import ErvaringsdeskundigenLijst from './AdminPortal/components/ErvaringsDeskundigenLijst';
import HuidigeOnderzoeken from './AdminPortal/components/HuidigeOnderzoeken';
import BedrijvenLijst from './AdminPortal/components/BedrijvenLijst';
import Aanvragen from './AdminPortal/components/Aanvragen';
import Chat from './Chat';

function AppRouter({ isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser }) {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/profielpagina" element={<ProfielPagina setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />} />
     <Route path="/chat" element={<Chat />} />

      {/* AdminPortal Components */}
      <Route path="/AdminPortal" element={<AdminPortal />} />
      <Route path="AdminPortal/ErvaringsDeskundigenLijst" element={<ErvaringsdeskundigenLijst />} />
      <Route path="AdminPortal/HuidigeOnderzoeken" element={<HuidigeOnderzoeken />} />
      <Route path="AdminPortal/BedrijvenLijst" element={<BedrijvenLijst/>} />
      <Route path='AdminPortal/Aanvragen' element={<Aanvragen/>} />

    </Routes>
  );
}

export default AppRouter;