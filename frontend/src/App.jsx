import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import MainLayout from "./components/mainLayout/MainLayout";
import ShopLayout from "./components/shopLayout/ShopLayout";
import Checkout from "./components/checkout/Checkout";
import OrderHistory from "./components/orderHistory/OrderHistory";
import NotFound from "./pages/notFound/NotFound";
import Protected from "./routes/Protected";
import ProfilePage from "./components/profile/Profile";
import { AdminView } from './pages/AdminView'
import { useState } from "react";




function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route element={<ShopLayout />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />

              <Route path="/checkout"
                element={
                  <Protected allowedRoles={['client']}>
                    <Checkout />
                  </Protected>} />

              <Route
                path="/history"
                element={
                  <Protected allowedRoles={['client']}>
                    <OrderHistory />
                  </Protected>
                }
              />

              <Route
                path="/profile"
                element={
                  <Protected>
                    <ProfilePage />
                  </Protected>
                }
              />

              <Route
                path="/admin"
                element={
                  <Protected allowedRoles={['admin', 'superadmin']}>
                    <AdminView />
                  </Protected>
                } />

              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/" element={<MainLayout />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
