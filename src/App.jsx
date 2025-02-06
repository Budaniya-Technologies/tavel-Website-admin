import './App.css';
import AppRouter from './AppRouter';
import { SidebarProvider } from './context/SidebarContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <SidebarProvider>
        <AppRouter/>
      </SidebarProvider>

      {/* Add the ToastContainer here */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
}

export default App;
