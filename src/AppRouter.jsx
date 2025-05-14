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
import ViewHome from "./components/Tables/HomeMain/ViewHome";
import ViewAllCategory from "./components/Tables/category/ViewAllCategory";
import AddCategory from "./components/Tables/category/AddCategory";
import EditCategory from "./components/Tables/category/EditCategory";
import ViewAllhiking from "./components/Tables/hiking/ViewAllhiking";
import AddHiking from "./components/Tables/hiking/AddHiking";
import ViewAllPicture from "./components/Tables/picture/ViewAllPicture";
import AddPicture from "./components/Tables/picture/AddPicture";
import ViewReview from "./components/Tables/reviews/ViewReview";
import AddReview from "./components/Tables/reviews/AddReview";

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
            {/* <Route path="/homemain/add" element={<AddHome />} /> */}
            {/* <Route path="/edit-home/:id" element={<EditHome />} /> */}
            <Route path="/homemain/view-all" element={<ViewHome />} />
            <Route path="/packages/view-all" element={<ViewAllPackage />} />
            <Route path="/edit-package/:id" element={<EditPackage />} />
            <Route path="/packages/add" element={<AddPackage />} />
            <Route path="/blogs/view-all" element={<ViewAllBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/category/view-all" element={<ViewAllCategory />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="/hiking/view-all" element={<ViewAllhiking />} />
            <Route path="/hiking/add" element={<AddHiking />} />
            <Route path="/pictures/view-all" element={<ViewAllPicture />} />
            <Route path="/pictures/add" element={<AddPicture />} />
            <Route path="/reviews/view" element={<ViewReview />} />
            <Route path="/reviews/add" element={<AddReview />} />
          </Route>
        {/* </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;