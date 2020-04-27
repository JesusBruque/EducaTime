import Course from '../models/course.model'
import Lection from '../models/lection.model'
import GenericService from './generic.services';
import Review from '../models/review.model';
import {ICourse} from "../interfaces/ICourse";

 export default class CourseService extends GenericService{
     constructor(){
        super(Course);
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
 }
