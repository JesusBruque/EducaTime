import Usuario from '../models/usuario.model';
import { IUsuario, IUsuarioDTO } from '../interfaces/IUsuario';

export default class AuthenticationService {
    constructor() { }

    public login = async (email: string, password: string): Promise<{ user: IUsuarioDTO, correct: Boolean }> => {
        var correct: Boolean = false;
        try {
            var err, user = await Usuario.findOne({ $or: [{ username: email }, { email: email }] }).select("+password");
            console.log(user);
            if (err) throw err;
            if (user)
                correct = await user.validPassword(password);
            if (correct)
                return { user: { _id: user._id, email: user.email, rol:user.rol,username:user.username }, correct: true };
            return { user: null, correct: false }
        } catch (e) {
            throw e;
        }
    }
}
