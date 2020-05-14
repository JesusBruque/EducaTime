import {Request,Response} from "express";
import GenericController from "./generic.controller";
import LectionService from "../services/lection.services";
import Logger from "../loaders/logger";
import moment from "moment";

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
      public uploadEvaluationResource = async(req: Request, res: Response) =>{
        Logger.debug('Subiendo fichero...');
        try{
            const lectionId = req.params.lectionId;
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.lectionService.uploadEvaluationFiles(lectionId, file, filename,req.query.video,req.query.needAuth).catch(err => {throw err});
                const lection = await this.lectionService.updateLectionEvaluations(lectionId,fileLocation);
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
      public uploadHomeworkResponse = async(req: Request, res: Response) => {
        Logger.debug('Subiendo tarea...');
        try{
            const lectionId = req.params.lectionId;
            const homeworkId = req.params.homeworkId;
            const userId = req.params.userId;
            let err1, lection = (await this.lectionService).findById(lectionId);
            if(err1) throw err1;
            const countH = (await lection).homework.length;
            for(let i=0; i < countH;i++){
                if((await lection).homework[i]._id==homeworkId){
                    const countR = (await lection).homework[i].userResponses.length;
                    for(let j=0; j < countR;j++){
                        if((await lection).homework[i].userResponses[j].UserID==userId){
                            return res.status(999).json({message:'Ya subiste una respuesta a esta tarea.', homeworkResponseStatus:(await lection).homework[i].userResponses[j].status});
                        }
                        if(moment.now() > (await lection).homework[i].deadline){
                            return res.status(999).json({message:'Ha expirado el período hábil para entregar respuestas a esta tarea.', homeworkId: homeworkId, deadliine: (await lection).homework[i].deadline});
                        }
                    }
                    req.pipe(req.busboy);
                    let fileLocation:string;
                    /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
                    req.busboy.on('file',async (fieldname,file,filename) => {
                        fileLocation = await this.lectionService.uploadHomeworkResponse(lectionId, homeworkId, userId, file, filename,req.query.video,req.query.needAuth).catch(err => {throw err});
                        const lection = await this.lectionService.updateHomeworkResponseInLection(homeworkId,lectionId,userId,fileLocation);
                        console.log('Send 200 status--->',new Date());
                        return res.status(200).json({lection:lection});
                    });
                }
            }
        return res.status(999).json({lection:lection, homework: homeworkId, message:'No se ha encontrado dicha tarea.'});    
        }catch(e){
            Logger.error('Error al subir una respuesta de tarea.');
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
      public deleteFullLection = async(req: Request, res: Response) =>{
        Logger.debug('eliminando leccion');
        try{
            const lectionId = req.params.lectionId;
            const lectionOrder = (await this.lectionService.findById(lectionId)).order;

            await this.lectionService.hardDelete(lectionId);
            await this.lectionService.delete(lectionId);
            Logger.debug('leccion eliminada');
            return res.status(200).json({status:200, Order: lectionOrder});
        }catch (e) {
            return res.status(400).json({status:400});
        }
      }
      public deleteTeoricalResources = async(req: Request, res: Response) =>{
        Logger.debug('eliminando recursos teoricos');
        try{
            const lectionId = req.params.lectionId;
            const files = [];
            files.concat(req.params.teoricalResourceIds);
            const lection = (await this.lectionService.findById(lectionId));
            files.forEach(file=>{
                var sliced = lection.teoricalResources.findIndex(file);
                lection.teoricalResources.slice(sliced,1);
            });
            await this.lectionService.deleteAnyResources(lectionId, files);
            Logger.debug('recurso teorico eliminado');
            return res.status(200).json({status:200});
        }catch (e) {
            return res.status(400).json({status:400});
        }
      }
      public deleteHomeworks = async(req: Request, res: Response) =>{
        Logger.debug('eliminando recursos teoricos');
        try{
            const lectionId = req.params.lectionId;
            const files = [];
            files.concat(req.params.homeworkIds);
            const lection = (await this.lectionService.findById(lectionId));
        
            files.forEach(task=>{
                for(var i=0;i<lection.homework.length;i++){
                    if(lection.homework[i].uploadFile===task){
                        files.push(lection.homework[i].uploadFile);
                        lection.homework[i].userResponses.forEach(response=>{
                            files.push(response.file);
                        });
                        lection.homework[i] = null;
                        lection.homework.slice(i,1);
                    }
                }
            });
            await this.lectionService.deleteAnyResources(lectionId, files);
            Logger.debug('recurso teorico eliminado');
            return res.status(200).json({status:200});
        }catch (e) {
            return res.status(400).json({status:400});
        }
      }
      public deleteEvaluation = async(req: Request, res: Response) =>{
        Logger.debug('eliminando recursos teoricos');
        try{
            const lectionId = req.params.lectionId;
            const files = [];
            const lection = (await this.lectionService.findById(lectionId));
            lection.evaluations.map(evaluation => {files.push(evaluation.uploadFile); evaluation.userResponses.map(response => files.push(response.file))});

            lection.evaluations = null;
            await lection.save();
            await this.lectionService.deleteAnyResources(lectionId, files);
            Logger.debug('evaluacion eliminada');
            return res.status(200).json({status:200});
        }catch (e) {
            return res.status(400).json({status:400});
        }
      }
}
