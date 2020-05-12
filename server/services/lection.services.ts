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

    public updateLectionTasks = async (lectionId:string,taskUrl:string) => {
        try{
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            let tenDays = 10*24*60*60*1000;
            // @ts-ignore
            lection.homework.push({uploadFile:taskUrl,userResponses:[],deadline:(Date.now() + tenDays)});
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
            lection.teoricalResources.push(resourceUrl);
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
            lection.video.push(videoUrl);
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    };

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
    }
}
