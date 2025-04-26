import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";



const RegisterPage = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100 '>
    <div>
      <form className="container text-center" >
        <div>
          <label htmlFor='name' className='h5 text-secondary d-block'>Nombre</label>
          <input id="name" className='mb-4 w-100' type="text" placeholder='Tu nombre' />
        </div>
        <div>
          <label htmlFor='lastname' className='h5 text-secondary d-block'>Apellido</label>
          <input id="lastname" className='mb-4 w-100' type="text" placeholder='Tu apellido' />
        </div>
        <div>
          <label htmlFor='address' className='h5 text-secondary d-block'>Dirección</label>
          <input id="address" className='mb-4 w-100' type="text" placeholder='Tu direccion' />
        </div>
        <div>
          <label htmlFor='email' className='h5 text-secondary d-block'>Email</label>
          <input id="email" className='mb-4 w-100' type="text" placeholder='Email de Registro' />
        </div>
        <div>
          <label htmlFor='password' className='h5 text-secondary d-block'>Password</label>
          <input id="password" className='mb-4 w-100' type="password" placeholder='Password de Registro' />
        </div>
        <div>
          <label htmlFor='password_confirmation' className='h5 text-secondary d-block'>Repetir Password</label>
          <input id="password" className='mb-4 w-100' type="password" placeholder='Repite el Password' />
        </div>
        <div>
          <input type="submit" className='btn btn-success mb-4' value="Crear Cuenta" />
        </div>
      </form>
    <nav>
    <Link to='/auth/login' className='text-reset d-block text-center text-decoration-none'>¿Ya tienes una cuenta? Inicia Sesión</Link>
    <Link  to="/" className='text-reset d-block text-center text-decoration-none'>Volver a la tienda</Link>
    </nav>
    </div>
    </div>
    </>
  )
}

export default RegisterPage