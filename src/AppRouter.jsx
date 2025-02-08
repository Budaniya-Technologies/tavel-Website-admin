import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/users/User";
import Login from "./pages/auth/Login";
import AddUser from "./components/Tables/user/AddUser";
import ViewAllUsers from "./components/Tables/user/ViewAllUsers";
import AddPackage from "./components/Tables/package/AddPackage";
import Register from "./pages/auth/Register";
import ViewAllPackage from "./components/Tables/package/ViewAllPackage";
import ViewAllBlog from "./components/Tables/blog/ViewAllBlog";
import AddBlog from "./components/Tables/blog/AddBlog";
import EditPackage from "./components/Tables/package/EditPackage";
import EditBlog from "./components/Tables/blog/EditBlog";
// import PrivateRoutes from "./utils/PrivateRoutes";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PrivateRoutes />}> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/view-all" element={<ViewAllUsers />} />
            <Route path="/packages/view-all" element={<ViewAllPackage />} />
            <Route path="/edit-package/:id" element={<EditPackage />} />
            <Route path="/packages/add" element={<AddPackage />} />
            <Route path="/blogs/view-all" element={<ViewAllBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/blogs/add" element={<AddBlog />} />
          </Route>
        {/* </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;