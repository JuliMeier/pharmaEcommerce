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
import { AdminView } from './pages/AdminView'
import { useState } from "react";

// function getUserRole() {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user).role : null;
// }

// function getUser() {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// }

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  // const [userRole, setUserRole] = useState(getUserRole());
  // const [user, setUser] = useState(getUser());
  // console.log(user)

  // const handleLogin = (userData) => {
  //   setIsLoggedIn(true);
  //   setUserRole(userData.role);
  //   localStorage.setItem('user', JSON.stringify(userData));
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUserRole(null);
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  // }

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
            </Protected> } />

            <Route 
              path="/history" 
              element={ 
                <Protected allowedRoles={['client']}>
                  <OrderHistory />
                </Protected> 
              } 
            />

            <Route
            path="/admin"
            element={
              <Protected  allowedRoles={['admin', 'superadmin']}>
                <AdminView />
              </Protected>
            } />

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<MainLayout  />} />

        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
