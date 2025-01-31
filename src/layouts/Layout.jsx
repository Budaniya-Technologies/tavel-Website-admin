import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useSidebar } from '../context/SidebarContext'; // Use the context hook

const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); 
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className="mainContent"
        style={{
          flexGrow: 1,
          transition: '0.3s ease',
          marginLeft: isSidebarOpen ? '240px' : '60px', 
          padding: '50px'
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
