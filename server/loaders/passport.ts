import passport from 'passport';
import Usuario from '../models/usuario.model'
import { IUsuario, IUsuarioDTO } from '../interfaces/IUsuario';

export default async () => {
    passport.serializeUser(function (user: IUsuarioDTO, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id, function (err, user: IUsuario) {
            if (err) throw err;
            if (user) {
                done(err, {
                    _id: user._id,
                    email: user.email,
                    roles:user.roles,
                    username:user.username,
                    cursos:user.cursos,
                    favoritos:user.favoritos,
                    paymentPend: user.paymentPend
                });

            } else done(err, null);
        });
    })
}
