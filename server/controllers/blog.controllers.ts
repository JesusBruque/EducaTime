import BlogService from '../services/blog.services';
import { Request, Response, NextFunction } from 'express';
import Logger from '../loaders/logger'
import { IUsuarioDTO } from '../interfaces/IUsuario';
import GenericController from './generic.controller';

export default class BlogControllers extends GenericController {
    private blogService: BlogService;
    constructor() {
        super(new BlogService());
        this.blogService = new BlogService();
    }
    public disable = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Deshabilitando blog.');
        try {
            await this.blogService.disable(req.params.idBlog);
            return res.status(200).json({ status: 200 });
        } catch (e) {
            Logger.error('Se ha producido un error Deshabilitando un blog');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public uploadBlogFile = async(req:Request,res:Response) =>{
        Logger.debug('Subiendo fichero de blog...');
        try{
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.blogService.uploadFile(file, filename,res);
                console.log('Send 200 status--->',new Date());
                return res.status(200).json({location:fileLocation});
            });
        }catch(e){
            Logger.error('Error al subir un fichero para un curso.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    };

    public deleteBlog = async(req:Request,res:Response) => {
        Logger.debug('eliminando blog');
        try{
            let blogId = req.params.blogId;
            await this.blogService.deleteBlog(blogId);
            Logger.debug('blog borrado');
            return res.status(200).json({status:200});
        }catch(e){
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    }
}
