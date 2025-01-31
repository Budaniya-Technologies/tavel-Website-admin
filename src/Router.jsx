import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import User from './pages/users/User';
import Login from './pages/auth/Login';
import AddUser from './components/Tables/user/AddUser';
import ViewAllUsers from './components/Tables/user/ViewAllUsers';
import AddPackage from './components/Tables/package/AddPackage';
import Register from './pages/auth/Register';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<User />} />
          <Route path="/users/add" element={<AddUser />}/>
          <Route path="/users/view-all" element={<ViewAllUsers />}/>
          <Route path="/packages/add" element={<AddPackage />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
