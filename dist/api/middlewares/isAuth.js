"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAuth = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.status(403).json({
        'status': 403,
        'message': 'Para entrar aquí tienes que iniciar sesión.'
    });
};
exports.default = isAuth;
