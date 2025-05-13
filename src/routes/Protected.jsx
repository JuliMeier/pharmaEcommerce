import { Navigate } from 'react-router-dom'

const Protected = ({ isLoggedIn, children}) => {

    if(!isLoggedIn) {    
        return <Navigate to="/auth/login" replace={true} />
    }
    return children;

}

export default Protected