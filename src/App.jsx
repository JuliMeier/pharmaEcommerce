import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import MainLayout from "./components/mainLayout/MainLayout";
import ShopLayout from "./components/shopLayout/ShopLayout";
import Checkout from "./components/checkout/Checkout";
import NotFound from "./pages/notFound/NotFound";
import Protected from "./routes/Protected";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ShopLayout />}>
            <Route path="/auth/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/checkout" element={ <Protected isLoggedIn={isLoggedIn}><Checkout /></Protected> } />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<MainLayout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
