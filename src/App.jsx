import './App.css'
import { SidebarProvider } from './context/SidebarContext'
import AppRouter from './router'

function App() {

  return (
    <>
    <SidebarProvider>
    <AppRouter/>
    </SidebarProvider>
    </>
  )
}

export default App
