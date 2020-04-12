import CourseService from "../services/course.services";
import { Request, Response } from "express";
import { ICourse } from "../interfaces/ICourse";

export default class CourseController{
    private courseService:CourseService;
    constructor(){
        this.courseService = new CourseService;
    }
    public Create = async(myRequest:Request,myResponse:Response)=>{
        try {
            const course = await this.courseService.Create(myRequest.body as ICourse);
            return myResponse.status(200).json({status:200,mensaje:"El curso se ha almacenado con èxito",course:course})
        } catch (error) {
            console.error("Ha ocurrido un error al ingresar una curso.");
            console.error(error);
            return myResponse.status(400).json({mensaje:"Ha ocurrido un error al crear un curso."});
        }
    }
}