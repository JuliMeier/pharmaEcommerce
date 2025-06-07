export const authorizeSuperAdmin = (req, res, next ) => {
    if(req.user.roleId !== 3) {
        return res.status(403).json({error: 'Acceso solo para superadmin'})
    }
    next();
}