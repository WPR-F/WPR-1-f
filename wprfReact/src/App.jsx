import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import SidebarAdminPortal from './SidebarAdminPortal.jsx';
import SidebarBedrijfPortal from './SidebarBedrijfPortal.jsx';
import SidebarPanellidPortal from './SidebarPanellidPortal.jsx';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <SidebarAdminPortal/>
       
      </header>
      <footer><Footer/></footer>
    </div>
  );
}

export default App;