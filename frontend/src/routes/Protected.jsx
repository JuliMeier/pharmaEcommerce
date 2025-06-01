import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Protected = ({ allowedRoles=[], children}) => {
    const { user } = useAuth();

    if(!user) {    
        return <Navigate to="/auth/login" replace={true} />
    }

    if(allowedRoles.length && !allowedRoles.includes(user.role)) {
        //return <Navigate to="/" replace={true} />
        return <div className="alert alert-warning text-center mt-5">No tienes permisos para acceder a esta sección.</div>;
    }

    return children;

}

export default Protected