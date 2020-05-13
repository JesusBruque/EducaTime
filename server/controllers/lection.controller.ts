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
      public findById = async(req:Request,res:Response) => {
        try{
            const lection  = await this.lectionService.findById(req.params.id);
            return res.status(200).json({Lection:lection});
        }catch(e){
            Logger.error('Error obteniendo una leccion por id.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      };
      public deleteFullLection = async(req: Request, res: Response) =>{
        Logger.debug('eliminando leccion');
        try{
            const lectionId = req.params.lectionId;
            const lectionOrder = (await this.lectionService.findById(lectionId)).order;
            // Borrar la carpeta con nombre lectionId y todos sus files

            await this.lectionService.delete(lectionId);
            Logger.debug('leccion eliminado');
            return res.status(200).json({status:200, Order: lectionOrder});
        }catch (e) {
            return res.status(400).json({status:400});
        }
      }
      public uploadLectionVideo = async(req: Request, res: Response) =>{
        Logger.debug('Subiendo fichero...');
        try{
            const lectionId = req.params.lectionId;
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.lectionService.uploadFile(lectionId, file, filename,req.query.video,req.query.needAuth).catch(err => {throw err});
                const lection = await this.lectionService.updateLectionVideos(lectionId,fileLocation);
                console.log('Send 200 status--->',new Date());
                return res.status(200).json({lection:lection});
            });
        }catch(e){
            Logger.error('Error al subir un fichero para una leccion.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      }
      public uploadResource = async(req: Request, res: Response) =>{
        Logger.debug('Subiendo fichero...');
        try{
            const lectionId = req.params.lectionId;
            const resource = req.params.resource;
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.lectionService.uploadResourceFile(lectionId, resource, file, filename,req.query.video,req.query.needAuth).catch(err => {throw err});
                const lection = await this.lectionService.updateLectionResources(lectionId,fileLocation);
                console.log('Send 200 status--->',new Date());
                return res.status(200).json({lection:lection});
            });
        }catch(e){
            Logger.error('Error al subir un fichero para una leccion.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      }
      public uploadHomeworkTask = async(req: Request, res: Response) =>{
        Logger.debug('Subiendo tarea...');
        try{
            const lectionId = req.params.lectionId;
            const homeworkId = req.params.homeworkId;
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.lectionService.uploadHomeworkFile(lectionId, homeworkId, file, filename,req.query.video,req.query.needAuth).catch(err => {throw err});
                const lection = await this.lectionService.updateLectionTasks(lectionId,fileLocation);
                console.log('Send 200 status--->',new Date());
                return res.status(200).json({lection:lection});
            });
        }catch(e){
            Logger.error('Error al subir una tarea para una leccion.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      }
      public updateLectionDates = async( req:Request,res:Response) => {
        try{
            const lectionId = req.params.lectionId;
            const lection = await this.lectionService.updateLectionDates(lectionId,req.body.fechaInicio,req.body.fechaFin);
            return res.status(200).json({lection:lection});
        }catch(e){
            Logger.error('Error al actualizar las fechas de la leccion.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      };

      public updateHomeworkDeadline = async(req:Request,res:Response) => {
        try{
            const lection = await this.lectionService.updateHomeworkDeadline(req.params.taskId,req.body.fechaLimite);
            return res.status(200).json({lection:lection});
        }catch(e){
            Logger.error('Error al actualizar las fechas de la leccion.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
      }
}
