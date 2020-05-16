import AuthenticationService from '../services/authentication.services';
import { Request, Response, NextFunction } from 'express';
import Logger from '../loaders/logger'
import {IUsuarioDTO} from "../interfaces/IUsuario";

export default class AuthenticationController {
    private authenticationService;
    constructor() {
        this.authenticationService = new AuthenticationService();
    }
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Inicio proceso de login');
            const { email, password } = req.body;
            if (email && password) {
                const { user, correct } = await this.authenticationService.login(email, password);
                if (correct) {
                    req.login(user, function (err) {
                        if (err) throw err;
                        Logger.debug('Logueado correctamente.');
                        Reflect.deleteProperty(user, 'password')
                        return res.status(200).json({ status: 200, user: user as IUsuarioDTO, message: "Inicio de sesión correcto." });
                    })
                } else
                    return res.status(400).json({ status: 400, message: 'Los datos introducidos no son correctos.' });
            } else
                return res.status(400).json({ status: 400, message: 'Datos incorrectos.' });
        } catch (e) {
            Logger.debug('ERROR EN EL LOGIN')
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.logout()
            res.status(200).json({ status: 200, message: 'Logout correcto' });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public check = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ status: 200, user: req.user });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }

    public findUserCourses = async (req:Request,res:Response) => {
        try {
            let userReq = req.user as IUsuarioDTO;
            const user = await this.authenticationService.findUserCourses(userReq._id);
            res.status(200).json({ status: 200, user: user });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }

    public editUserInfo = async(req:Request,res:Response) => {
        try{
            let userInfo = req.body;
            let userReq = req.user as IUsuarioDTO;
            const user = await this.authenticationService.findUserAndUpdateInfo(userReq._id,userInfo);
            res.status(200).json({ status: 200, user: user });
        }catch(e){
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
}
