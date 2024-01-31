import '../../Sidebar.css';
import { useNavigate } from 'react-router-dom';
import SidebarAdminPortal from './SidebarAdminPortal';
import AdminPortal from './AdminPortal';

function AdminPortalSidebar() {
    const navigate = useNavigate();

    return (
        <>
        <SidebarAdminPortal />
        <AdminPortal />
        </>
    );
}

export default AdminPortalSidebar;