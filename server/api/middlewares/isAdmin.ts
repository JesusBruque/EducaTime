const isAdmin = (req, res, next) => {
    if (req.user && req.user.rol==='admin')
        return next();
    return res.status(403).json({
        'status': 403,
        'message': 'Para entrar aquí tienes que iniciar sesión.'
    });
}
export default isAdmin;
