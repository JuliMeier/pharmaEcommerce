import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100 '>
    <div>
      <form className="container text-center" >
        <div>
          <label htmlFor='email' className='h5 text-secondary d-block'>Email</label>
          <input id="email" className='mb-4 w-100' type="text" placeholder='Email de Registro' />
        </div>
        <div>
          <label htmlFor='password' className='h5 text-secondary d-block'>Password</label>
          <input id="password" className='mb-4 w-100' type="password" placeholder='Password de Registro' />
        </div>

        <div>
          <input type="submit" className='btn btn-success mb-4' value="Crear Cuenta" />
        </div>
      </form>
    <nav>
    <Link to='/auth/register' className='text-reset d-block text-center text-decoration-none'>¿No tienes una cuenta? Registrate</Link>
    <Link  to="/" className='text-reset d-block text-center text-decoration-none'>Volver a la tienda</Link>
    </nav>
    </div>
    </div>
    </>
  );
};

export default LoginPage;
