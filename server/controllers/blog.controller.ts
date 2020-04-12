import {Request, Response} from 'express';
import BlogService from "../services/blog.services";
import { IBlog } from '../interfaces/IBlog';

export default class BlogController{
    private blogService:BlogService;
    constructor(){
        this.blogService = new BlogService();
    }
    public Create = async (myRequest:Request,myResponse:Response) =>{
        try {
            const blog = await this.blogService.Create(myRequest.body as IBlog);
            return myResponse.status(200).json({status:200,mensaje:"El blog se ha creado con èxito",blog:blog});
        } catch (error) {
            console.error("Ha ocurrido un error al ingresar una lecciòn.");
            console.error(error);
            return myResponse.status(400).json({mensaje:"Ha ocurrido un error al crear el Blog"});
        }
    }
}