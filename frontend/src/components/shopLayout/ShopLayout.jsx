import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom'
import Header from '../header/Header'

const ShopLayout = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
      <Outlet />
    </>
  )
}

export default ShopLayout