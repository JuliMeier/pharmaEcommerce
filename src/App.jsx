
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import MainLayout from './components/mainLayout/MainLayout';
import ShopLayout from './components/shopLayout/ShopLayout';
import Checkout from './components/checkout/Checkout';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<ShopLayout />} >
        <Route path="/auth/login" element={<LoginPage />} /> 
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>
      <Route path="/" element={<MainLayout />} />

    </Routes>
    
    </BrowserRouter>  
    </>
  )
}

export default App
