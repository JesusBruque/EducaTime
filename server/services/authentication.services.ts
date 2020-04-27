import Usuario from '../models/usuario.model';
import { IUsuario, IUsuarioDTO } from '../interfaces/IUsuario';
import argon2 from 'argon2';
import {randomBytes} from "crypto";

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
                return { user: user, correct: true };
            return { user: null, correct: false }
        } catch (e) {
            throw e;
        }
    }

    public findByEmail = async(email:string): Promise<IUsuarioDTO> => {
        try {
            let err, user = await Usuario.findOne({email: email});
            if (err) throw err;
            if (!user) return {_id:null,email:email,rol:null,username:email,cursos:[],favoritos:[]};
            if (user) return user;
        }
        catch(e){
            throw e;
        }
    }

    public registerUser = async(user:IUsuarioDTO): Promise<IUsuarioDTO> => {
        try{
            const salt = randomBytes(32);
            const pass = Math.random().toString(36).substring(7);
            const hashedPassword = await argon2.hash(pass, { salt: salt });
            let err, newUser = await new Usuario({email:user.email,username:user.username,rol:'user',password:hashedPassword,salt:salt}).save();
            if(err) throw err;
            if(!newUser) throw Error("No se ha podido crear el usuario " + user.email);
            return newUser;
        }catch(e){
            throw e;
        }
    }

    public addCursoToUser = async(userId:string,curso:string) : Promise<IUsuarioDTO> => {
        let err, user = await Usuario.findById(userId);
        if(err) throw err;
        if(!user) throw Error('No se ha encontrado el usuario');
        user.cursos.push(curso);
        user = await user.save();
        return user;
    }
}
