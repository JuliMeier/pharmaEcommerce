import { Link} from 'react-router-dom'

const NotFound = () => {


    return(
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div>
            <h1 className="text-center">404</h1>
            <h2 >Página no encontrada</h2>
            <p className="not-found__text">Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" className="text-reset d-block text-center text-decoration-none">Volver a la página principal</Link>
            </div>
        </div>
    )
}

export default NotFound;