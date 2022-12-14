import {Request,Response} from 'express';
import FilesServices from "../services/files.services";
import Logger from '../loaders/logger'

export default class FilesController{
    private fileService : FilesServices;
    constructor(){
        this.fileService = new FilesServices();
    }
    public uploadFile = async (req:Request,res:Response) => {
        Logger.debug('subiendo fichero...');
        try{
            req.pipe(req.busboy);
            req.busboy.on('file',async (fieldname,file,filename) => {
                const fileLocation : string = await this.fileService.uploadFile(file, filename, 'lo que sea');
                console.log(fileLocation);
                return res.status(200).json({message:'Éxito al subir el fichero.',file:fileLocation});
            });
        }catch (e) {
            Logger.error('Se ha producido un error al subir el fichero');
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

    public getSignedUrl = async(req:Request,res:Response) => {
        try{
            const url = await this.fileService.getSignedUrl().catch(err => {throw err});
            return res.status(200).json({url:url});
        }catch (e) {
            Logger.error('Se ha producido un error al obtener signed url');
            Logger.error(e);
            return res.status(400).json({message: 'Error al obtener signed url'});
        }
    }

    public getSignedCookie= async(req:Request,res:Response) => {
        try{
            const cookie = await this.fileService.getSignedCookie().catch(err => {throw err});
            res.cookie('CloudFront-Key-Pair-Id', cookie['CloudFront-Key-Pair-Id'], {
                domain:'d2nmzq3hxlvmns.cloudfront.net',
                path: '/',
                httpOnly: true,
            });

            res.cookie('CloudFront-Policy', cookie['CloudFront-Policy'], {
                domain: 'd2nmzq3hxlvmns.cloudfront.net',
                path: '/',
                httpOnly: true,
            });

            res.cookie('CloudFront-Signature', cookie['CloudFront-Signature'], {
                domain: 'd2nmzq3hxlvmns.cloudfront.net',
                path: '/',
                httpOnly: true,
            });
            return res.status(200).json({cookies:cookie});
        }catch (e) {
            Logger.error('Se ha producido un error al obtener signed url');
            Logger.error(e);
            return res.status(400).json({message: 'Error al obtener signed url'});
        }
    }
}
