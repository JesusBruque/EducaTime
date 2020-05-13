import GenericService from './generic.services';
import Lection from "../models/lection.model";
import Logger from "../loaders/logger";
import FilesServices from './files.services';
import mongoose from "mongoose";

export default class LectionService extends GenericService{
    fileService: FilesServices;
    constructor(){
        super(Lection);
        this.fileService = new FilesServices;
    }
    public uploadFile = async (lectionName:string,file,filename,video,needAuth) => {
        try{
            const fileLocation : string = await this.fileService.uploadFile(file,lectionName,filename,video,needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        }catch(e){
            throw e;
        }
    };

    public uploadResourceFile = async (lectionName:string,resourceName:string,file,filename,video,needAuth) => {
        try{
            const fileLocation : string = await this.fileService.uploadFile(file,lectionName+'/resources/'+resourceName,filename,video,needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        }catch(e){
            throw e;
        }
    };
    public uploadHomeworkFile = async (lectionName:string,homeworkName:string,file,filename,video,needAuth) => {
        try{
            const fileLocation : string = await this.fileService.uploadFile(file,lectionName+'/homework/'+homeworkName,filename,video,needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        }catch(e){
            throw e;
        }
    };
    public uploadEvaluationsFiles = async (lectionName:string, homeworkName:string,file,filename,video,needAuth) => {
        try{
            const fileLocation : string = await this.fileService.uploadFile(file,lectionName+'/evaluations/'+homeworkName,filename,video,needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        }catch(e){
            throw e;
        }
    };

    public updateLectionTasks = async (lectionId:string,taskUrl:string) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            let tenDays = 10*24*60*60*1000;
            // @ts-ignore
            lection.homework.push({uploadFile:taskUrl,name:'',userResponses:[],deadline:(Date.now() + tenDays)});
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    }
    public updateLectionResources = async (lectionId:string,resourceUrl:string) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            lection.teoricalResources.push({url:resourceUrl,name:''});
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    };
    public updateLectionVideos = async(lectionId:string,videoUrl:string) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            lection.video.push({url:videoUrl,name:''});
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    };
    public updateLectionEvaluations = async(lectionId:string,evaluationURL:string) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            let tenDays = 10*24*60*60*1000;
            // @ts-ignore
            lection.evaluations.push({uploadFile:evaluationURL,name:'',userResponses:[],deadline:(Date.now() + tenDays)});
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    }

    public updateLectionDates = async(lectionId:string,fechaInicio:number,fechaFin:number) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            lection.dateAvailable = fechaInicio;
            lection.dateEnd = fechaFin;
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    };

    public updateHomeworkDeadline = async(taskId:string,fecha:number) => {
        try{
            let err, lection = await Lection.findOne({"homework._id":taskId});
            for(let i = 0;i<lection.homework.length;i++){
                if(lection.homework[i]._id == taskId){
                    lection.homework[i].deadline = fecha;
                    break;
                }
            }
            await lection.save();
            if (err) throw err;
            return lection;
        }catch(e){
            throw e;
        }
    };

    public getLectionFiles = async(lectionId:string) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if(err) throw err;
            let files = [];
            /*-- RECURSOS TEORICOS, VIDEOS, TAREAS.UPLOADFILE, TAREAS.USERRESPONSES.FILE, EVALUATIONS--*/
            lection.teoricalResources.map(file => files.push(file.url));
            lection.video.map(file => files.push(file.url));
            lection.homework.map(task => {files.push(task.uploadFile); task.userResponses.map(response => files.push(response.file))});
            lection.evaluations.map(evaluation => {files.push(evaluation.uploadFile); evaluation.userResponses.map(response => files.push(response.file))});
            return files;
        }catch(e){
            throw e;
        }
    }
}
