import {Request,Response} from 'express';
import FilesServices from "../services/files.services";
import Logger from '../loaders/logger'

export default class FilesController{
    private fileService : FilesServices;
    constructor(){
        this.fileService = new FilesServices();
    }
    public uploadFile = async (req:Request,res:Response) => {
        Logger.debug('subiendo foto...');
        try{
            req.pipe(req.busboy);
            req.busboy.on('file',async (fieldname,file,filename) => {
                const fileLocation : string = await this.fileService.uploadFile(file, filename);
                console.log(fileLocation);
                return res.status(200).json({message:'Éctio al subir el fichero.',file:fileLocation});
            });
        }catch (e) {
            Logger.error('Se ha producido un error añ subir el fichero');
            Logger.error(e);
            return res.status(400).json({message:'Error al subir un fichero'});
        }
    }

    public retrieveFile = async (req:Request,res:Response) => {
        Logger.debug('obteniendo fichero');
        try{
            const file = await this.fileService.retrieveFile(req.params.filename);
            return res.status(200).json({file:file});
        }catch (e) {
            Logger.error('Se ha producido un error al obtener el fichero');
            Logger.error(e);
            return res.status(400).json({message:'Error al obtener un fichero'});
        }
    }
}
