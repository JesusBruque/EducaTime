import Course from '../models/course.model'
import Lection from '../models/lection.model'
import GenericService from './generic.services';
import Review from '../models/review.model';
import {ICourse} from "../interfaces/ICourse";
import LectionService from "./lection.services";
import FilesServices from "./files.services";
import Logger from "../loaders/logger";
import fs from 'fs';

 export default class CourseService extends GenericService{
     private lectionService:LectionService;
     private fileService:FilesServices;
     constructor(){
        super(Course);
         this.lectionService = new LectionService();
         this.fileService = new FilesServices();
     }
     public hardDelete = async (courseId: string): Promise<Boolean> => {
         try {
             /*
             Asesorar si habria que eliminar todos los archivos de video del servidor.
             */
            this.lectionEraser(courseId);
             
             var err, res = await Course.findByIdAndDelete(courseId);
             if (err) throw err;
             if (!res) throw Error("No se ha borrado el curso");
             return true;
         } catch (e) {
             throw e;
         }
     };

     private lectionEraser = async (courseId: string)=>{
         try {
             await Lection.deleteMany({course:courseId});
             return true;
         } catch (error) {
             throw error;
         }
     };

     public addLectionsToCourse = async(courseId:string,lections:{title:string}[]) => {
         try{
             lections.forEach((lection,i) => {
                 this.lectionService.create({title:lection.title,order:i+1,course:courseId}).catch(err => {
                     Logger.error('Error al crear una lección');
                     Logger.error(err);
                     throw err;
                 });
             });
             return true;
         }catch (e) {
             throw e;
         }
     };

     public uploadFile = async (courseName:string,file,filename,res) => {
         try{
             const fileLocation : string = await this.fileService.uploadFile(file,`public/${courseName}/${filename}`,res);
             Logger.debug('fichero subido...');
             return fileLocation;
         }catch(e){
             throw e;
         }
     };

     public updateCourseById = async (courseId:string,key:string,value:any) => {
         try{
             let err, course = await Course.findByIdAndUpdate(courseId,{[key]:value});
             if(err) throw err;
             return course;
         }catch(e){
             Logger.error(e);
             throw e;
         }
     }
 }
