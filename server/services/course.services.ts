import Course from '../models/course.model'
import Lection from '../models/lection.model'
import GenericService from './generic.services';
import Review from '../models/review.model';
import {ICourse} from "../interfaces/ICourse";
import LectionService from "./lection.services";
import FilesServices from "./files.services";
import Logger from "../loaders/logger";
import fs from 'fs';
import {ILection} from "../interfaces/ILection";
import config from "../config";
import mongoose from 'mongoose';
import {IUsuarioDTO} from "../interfaces/IUsuario";
import {file} from "@babel/types";

 export default class CourseService extends GenericService{
     private lectionService:LectionService;
     private fileService:FilesServices;
     constructor(){
        super(Course);
         this.lectionService = new LectionService();
         this.fileService = new FilesServices();
     }
     public findById = async (CourseId:string) : Promise<ICourse & mongoose.Document> => {
         try{
             let err,course = await Course.findById(CourseId).populate('lections');
             if(err) throw err;
             return course;
         }catch (e) {
             throw e;
         }
     };
     public hardDelete = async (courseId: string): Promise<Boolean> => {
         try {
            let filesToDelete = [];
            let err, lections = await Lection.find({course:courseId}).lean();
            if(err) throw err;
            lections.forEach(lection => {
               filesToDelete.concat(this.lectionService.getLectionFiles(lection._id));
            });

             let error, curso = await Course.findById(courseId);
             if(error) throw error;
             filesToDelete.push(curso.video);
             filesToDelete.push(curso.thumbnail);
             curso.remove();
             await this.fileService.removeFiles(filesToDelete);
             Logger.debug('ficheros eliminados');
             // var err, res = await Course.findByIdAndDelete(courseId);
             // if (err) throw err;
             // if (!res) throw Error("No se ha borrado el curso");
             return true;
         } catch (e) {
             throw e;
         }
     };
     public lectionEraser = async (courseId: string)=>{
         try {
             await Lection.deleteMany({course:courseId});
             return true;
         } catch (error) {
             throw error;
         }
     };
     public addLectionToCourse = async(courseId:string,lection:{title:string},order:number) => {
         try{
             let lection1 = await this.lectionService.create({title:lection.title,order:order,course:courseId});
             let course = await this.findById(courseId);
             course.lections.push(lection1._id);
             course.save();
         }catch (e) {
             throw e;
         }
     };
     public uploadFile = async (courseName:string,file,filename,video,needAuth) => {
         try{
             console.log(file);
             const fileLocation : string = await this.fileService.uploadFile(file,courseName,filename,video,needAuth);
             Logger.debug('fichero subido...', fileLocation);
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
     public findCoursesWhereTeacher = async(email:string) => {
         try{
             let err, cursos = await Course.find({teacher:email}).populate({path:'lections',options:{sort:{'order':1}}}).lean();
             if(err) throw err;
             return cursos;
         }catch(e){
             throw e;
         }
     }
 }
