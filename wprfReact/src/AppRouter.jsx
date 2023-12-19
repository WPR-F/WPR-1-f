import { Routes, Route } from 'react-router-dom';
import RegisterForm from './register/registerform';

function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      {/* Other routes */}
    </Routes>
  );
}

export default AppRouter;