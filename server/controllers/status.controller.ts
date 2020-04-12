import StatusServices from '../services/status.services';
import {IStatus} from '../interfaces/IStatus';
import { Request, Response , NextFunction } from 'express';
import Logger from '../loaders/logger'

export default class StatusController{
    private statusService:StatusServices;
    constructor(){
        this.statusService = new StatusServices;
    }
    public Create = async (req:Request,res:Response , next: NextFunction)=>{
        Logger.debug("Creando curso.")
        try {
            const estado = await this.statusService.create(req.body as IStatus);
            return res.status(200).json({status:200, myStatus:estado});
        } catch (error) {
            console.error("Se ha producido un error al crear un bookmark.");
            console.error(error);
            return res.status(400).json({mensaje:"Se ha producido un error inesperado. Contacte con el administrador."});
        }
    }
    public Edit = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Editando un status');
        try {
            const myStatus = await this.statusService.edit(req.body as IStatus);
            return res.status(200).json({ status: 200, myStatus: myStatus });
        } catch (e) {
            Logger.error('Se ha producido un error editando un bookmark');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    /*
    public FindAll = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Metodo findAll status');
        try {
            const myStatus = await this.statusService.findAll();
            return res.status(200).json({ status: 200, blogs: blogs });
        } catch (e) {
            Logger.error('Se ha producido un error findAll blogs');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    */
    public FindById = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Metodo findById blog');
        try {
            const myStatus = await this.statusService.findById(req.params.blogId);
            return res.status(200).json({ status: 200, myStatus: myStatus });
        } catch (e) {
            Logger.error('Se ha producido un error findById blogs');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
}