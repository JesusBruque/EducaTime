import { Request, Response, NextFunction } from 'express';
import Logger from '../loaders/logger'
import { IGenericInterface } from '../interfaces/IGenericInterface'
import { IUsuarioDTO } from '../interfaces/IUsuario';
import GenericService from '../services/generic.services';

export default class GenericController {

    private myService: GenericService;
    private serviceString: string;

    constructor(clase: GenericService) {
        this.myService = clase;
        this.serviceString = this.myService.name();
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Creando: ' + this.serviceString + ".");
        try {
            const myObject = await this.myService.create(req.body as IGenericInterface, req.user as IUsuarioDTO);
            return res.status(200).json({ status: 200, [this.serviceString]: myObject });
        } catch (e) {
            Logger.error('Se ha producido un error creando : ' + this.serviceString + ".");
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public edit = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Editando : ' + this.serviceString + ".");
        try {
            if(req.body["current_fee"] && req.body["original_fee"] && req.body["discount"]){
                req.body.body.current_fee -= (req.body.discount*req.body.original_fee)/100;
                console.log("Si se imprime mongo");
            }
            if(req.body["perCent"] && req.body["score"]){
                req.body.body.perCent = req.body.score*20; 
            }
            await this.myService.edit(req.body as IGenericInterface, req.user as IUsuarioDTO);
            return res.status(200).json({ status: 200 });
        } catch (e) {
            Logger.error('Se ha producido un error editando : ' + this.serviceString + ".");
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Borrando : ' + this.serviceString + ".");
        try {
            await this.myService.delete((req.body as IGenericInterface)._id);
            return res.status(200).json({ status: 200, mensaje: "Borrado con exito" });
        } catch (e) {
            Logger.error('Se ha producido un error borrando : ' + this.serviceString + ".");
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Metodo findAll : ' + this.serviceString + ".");
        try {
            const myObjects = await this.myService.findAll();
            return res.status(200).json({ status: 200, [this.serviceString]: myObjects });
        } catch (e) {
            Logger.error('Se ha producido un error findAll : ' + this.serviceString + ".");
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public findById = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Metodo findById : ' + this.serviceString + ".");
        try {
            console.log(req.body);
            // const myObject = await this.myService.findById((req.body as IGenericInterface)._id);
            const myObject = await this.myService.findById(req.params.id);
            return res.status(200).json({ status: 200, [this.serviceString]: myObject });
        } catch (e) {
            Logger.error('Se ha producido un error findById : ' + this.serviceString + ".");
            //Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
}
