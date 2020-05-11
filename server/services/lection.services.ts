import GenericService from './generic.services';
import Lection from "../models/lection.model";
import Logger from "../loaders/logger";
import FilesServices from './files.services';

export default class LectionService extends GenericService{
    fileService: FilesServices;
    constructor(){
        super(Lection);
        this.fileService = new FilesServices;
    }
    public uploadFile = async (lectionName:string,file,filename,video,needAuth) => {
        try{
            console.log(file);
            const fileLocation : string = await this.fileService.uploadFile(file,lectionName,filename,video,needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        }catch(e){
            throw e;
        }
    };

    public uploadResourceFile = async (lectionName:string,resourceName:string,file,filename,video,needAuth) => {
        try{
            console.log(file);
            const fileLocation : string = await this.fileService.uploadFile(file,lectionName+'/resources/'+resourceName,filename,video,needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        }catch(e){
            throw e;
        }
    };
    public uploadHomeworkFile = async (lectionName:string,homeworkName:string,file,filename,video,needAuth) => {
        try{
            console.log(file);
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
            console.log(lection);
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
            console.log(lection);
            lection.video.push(videoUrl);
            await lection.save();
            return lection;
        }catch(e){
            throw e;
        }
    }



    //#region 
    // public create = async(lectionObject:ILection, user: IUsuarioDTO):Promise<ILection>=>{
    //     try {
    //         var err, result = await new Lection({ ...lectionObject, updated_for: user._id }).save();
    //         if (err) throw err;
    //         if (!result) throw Error("No se ha creado la leccion.")
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // public edit = async (lection: ILection, user: IUsuarioDTO): Promise<ILection> => {
    //     try {
    //         var err, res = await Lection.findOneAndUpdate({ _id: lection._id }, { ...lection, updated_for: user._id });
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha editado la leccion")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public delete = async (lectionId: string): Promise<Boolean> => {
    //     try {
    //         var err, res = await Lection.findByIdAndDelete(lectionId);
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha borrado la leccion");
    //         return true;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findById = async (lectionId: string): Promise<ILection> => {
    //     try {
    //         var err, res = await Lection.findById(lectionId);
    //         if (err) throw err;
    //         if (!res) throw Error ("No se ha encontrado la leccion");
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findAll = async (): Promise<ILection[]> => {
    //     try {
    //         var err, res = await Lection.find({});
    //         if (err) throw err;
    //         if (!res) throw Error ("No se han encontrado lecciones")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    //#endregion
}
