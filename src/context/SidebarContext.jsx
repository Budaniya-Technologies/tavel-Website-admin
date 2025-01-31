import { createContext, useState, useContext } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Sidebar Provider to manage the state of the sidebar
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use Sidebar Context in other components
export const useSidebar = () => useContext(SidebarContext);
