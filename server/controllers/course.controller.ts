import {Request,Response} from "express";
import GenericController from "./generic.controller";
import CourseService from "../services/course.services"
import Logger from '../loaders/logger'
import LectionService from "../services/lection.services";
import FilesServices from "../services/files.services";

export default class CourseController extends GenericController{
    private courseService : CourseService;
    constructor(){
        super(new CourseService());
        this.courseService = new CourseService();
    }

    public createCourse = async (req:Request,res:Response) => {
        Logger.debug('Creando curso...');
        try{
            let curso = req.body;
            let lections = curso.lections;
            delete curso['lections'];

            /*-- CREANDO CURSO Y LECCIONES --*/
            curso = await this.courseService.create(curso).catch(err => {throw err});
            await this.courseService.addLectionsToCourse(curso._id,lections).catch(err => {throw err});

            return res.status(200).json({status:200,curso:curso});
        }catch(e){
            Logger.error('Error al crear un curso.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    };

    public uploadCourseFile = async (req:Request,res:Response) => {
        Logger.debug('Subiendo fichero...');
        try{
            const cursoId = req.params.cursoId;
            let attr,curso;
            req.pipe(req.busboy);
            let fileLocation:string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file',async (fieldname,file,filename) => {
                fileLocation = await this.courseService.uploadFile(cursoId,file, filename,res);
                curso = await this.courseService.updateCourseById(cursoId,attr,fileLocation);
                console.log('Send 200 status--->',new Date());
                return res.status(200).json({status:200,curso:curso});
            });

            req.busboy.on('field',async(fieldname, val) => {
                if(fieldname==='attribute'){
                    attr = val;
                }
            });
        }catch(e){
            Logger.error('Error al subir un fichero para un curso.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    }
}
