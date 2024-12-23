import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import MainLayout from "../layout.tsx/MainLayout";
import Login from "../pages/Login/Login";

import Signup from "../pages/Signup/Signup";
import ProductDetailsPage from "../pages/ProductsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layout.tsx/DashboardLayout";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";

import CartPage from "../pages/cart/Cart";
import SellerDashboard from "../pages/Dashboard/Seller/SellarDashboard";
import PrivetRoute from "./PrivetRoute";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/seller"
          element={
            <PrivetRoute role={["seller"]}>
              <DashboardLayout />
            </PrivetRoute>
          }
        >
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <PrivetRoute role={["admin", "superAdmin"]}>
              <DashboardLayout />
            </PrivetRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route
          path="/customer"
          element={
            <PrivetRoute role={["customer"]}>
              <DashboardLayout />
            </PrivetRoute>
          }
        >
          <Route path="dashboard" element={<SellerDashboard />} />
        </Route>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Routers;
