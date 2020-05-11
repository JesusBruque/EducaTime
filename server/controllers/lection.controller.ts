import {Request,Response} from "express";
import GenericController from "./generic.controller";
import LectionService from "../services/lection.services";
import Logger from "../loaders/logger";

export default class LectionController extends GenericController{
    lectionService: LectionService;
    constructor(){
        super(new LectionService());
        this.lectionService = new LectionService();
      }
      public uploadHomeworkTask = async(req: Request, res: Response) =>{
        Logger.debug('Subiendo fichero...');
        try{
            const lectionId = req.params.lectionId;
            const homeworkId = req.params.homeworkId;
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.lectionService.uploadHomeworkFile(lectionId, homeworkId, file, filename,req.query.video,req.query.needAuth).catch(err => {throw err});
                console.log('Send 200 status--->',new Date());
                return res.status(200).json({location:fileLocation});
            });
        }catch(e){
            Logger.error('Error al subir un fichero para una leccion.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      }
      //#region 
    // public Create=async(req:Request,res:Response , next: NextFunction)=>{
    //     Logger.debug("Creando leccion.")
    //     try {
    //         const lection = await this.lectionService.create(req.body as ILection, req.user as IUsuarioDTO);
    //         return res.status(200).json({status:200,lection:lection});            
    //     } catch (error) {
    //         console.error("Ha ocurrido un error al ingresar una lecciòn.");
    //         console.error(error);
    //         return res.status(400).json({ status: 400,mensaje: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public Edit = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Editando una leccion');
    //     try {
    //         const lection = await this.lectionService.edit(req.body as ILection, req.user as IUsuarioDTO);
    //         return res.status(200).json({ status: 200, lection: lection });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error editando una leccion');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public Delete = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Borrando una leccion');
    //     try {
    //         const blog = await this.lectionService.delete((req.body as ILection)._id);
    //         return res.status(200).json({ status: 200, mensaje: "Borrad con exito" });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error borrando una leccion');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public FindAll = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findAll lections');
    //     try {
    //         const lections = await this.lectionService.findAll();
    //         return res.status(200).json({ status: 200, lections: lections });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findAll lections');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public FindById = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findById blog');
    //     try {
    //         const lection = await this.lectionService.findById(req.params.lectionId);
    //         return res.status(200).json({ status: 200, lection: lection });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findById lection');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    //#endregion
}