import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom'
import Header from '../header/Header'
import { Footer } from '../footer/Footer'
import './shopLayout.css'

const ShopLayout = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
  return (
    <div className='app-wrapper'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
      <div className='main-content'>
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default ShopLayout