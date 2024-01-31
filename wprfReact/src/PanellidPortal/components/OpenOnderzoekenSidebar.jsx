import '../../Sidebar.css';
import { useNavigate } from 'react-router-dom';
import OpenOnderzoeken from './OpenOnderzoeken';
import SidebarPanellidPortal from './SidebarPanellidPortal';
function OpenOnderzoekenSidebar() {
    const navigate = useNavigate();

    return (
        <>
        <SidebarPanellidPortal />
        <OpenOnderzoeken />
        </>
    );
}

export default OpenOnderzoekenSidebar;