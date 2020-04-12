import { ICourse } from "../interfaces/ICourse";
import Course from '../models/course.model'

 export default class CourseService{
     constructor(){
     }
     public Create = async(courseObject:ICourse):Promise<ICourse>=>{
         try {
             let err, result = await Course.create(courseObject);
             if(err)
                throw(err);
            return result;
         } catch (error) {
             throw (error);
         }
     }
 }