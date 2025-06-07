export const authorizeAdmin = (req, res, next) => {
    if(req.user.roleId !== 2  && req.user.roleId !== 3){
        return res.status(403).json({error: 'Acceso denegado'})
    }
    next(); 
}