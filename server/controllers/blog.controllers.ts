import BlogService from '../services/blog.services';
import { Request, Response, NextFunction } from 'express';
import Logger from '../loaders/logger'
import { IBlog } from '../interfaces/IBlog';
import { IUsuarioDTO } from '../interfaces/IUsuario';

export default class BlogControllers {
    private blogService: BlogService;
    constructor() {
        this.blogService = new BlogService();
    }
    public Create = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Creando blog.');
        try {
            const blog = await this.blogService.create(req.body as IBlog, req.user as IUsuarioDTO);
            return res.status(200).json({ status: 200, blog: blog });
        } catch (e) {
            Logger.error('Se ha producido un error creando un blog');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public Edit = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Editando un blog');
        try {
            const blog = await this.blogService.edit(req.body as IBlog, req.user as IUsuarioDTO);
            return res.status(200).json({ status: 200, blog: blog });
        } catch (e) {
            Logger.error('Se ha producido un error editando una empresa');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public Delete = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Borrando un blog');
        try {
            const blog = await this.blogService.delete((req.body as IBlog)._id);
            return res.status(200).json({ status: 200, mensaje: "Borrad con exito" });
        } catch (e) {
            Logger.error('Se ha producido un error editando una empresa');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public FindAll = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Metodo findAll blogs');
        try {
            const blogs = await this.blogService.findAll();
            return res.status(200).json({ status: 200, blogs: blogs });
        } catch (e) {
            Logger.error('Se ha producido un error findAll blogs');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
    public FindById = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('Metodo findById blog');
        try {
            const blog = await this.blogService.findById(req.params.blogId);
            return res.status(200).json({ status: 200, blog: blog });
        } catch (e) {
            Logger.error('Se ha producido un error findById blogs');
            Logger.error(e);
            return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
        }
    }
}
