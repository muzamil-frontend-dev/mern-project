import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import RequireAuth from "./components/RequireAuth";
import DashboardScreen from "./screens/admin/DashboardScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderEditScreen from "./screens/admin/OrderEditScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <Container className="my-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:id" element={<OrderScreen />} />
          </Routes>

          <Routes>
            <Route path="admin" element={<RequireAuth isAdmin />}>
              <Route path="" element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardScreen />} />
              <Route path="products" element={<ProductListScreen />} />
              <Route path="orders" element={<OrderListScreen />} />
              <Route path="users" element={<UserListScreen />} />
              <Route path="products/:id" element={<ProductEditScreen />} />
              <Route path="orders/:id" element={<OrderEditScreen />} />
            </Route>
          </Routes>
          <Routes>
            <Route path="profile" element={<RequireAuth />}>
              <Route path="" element={<Navigate replace to="profile" />} />
              <Route path=":id" element={<ProfileScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
