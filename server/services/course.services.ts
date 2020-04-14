import Course from '../models/course.model'
import Lection from '../models/lection.model'
import GenericService from './generic.services';

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
     }
     private lectionEraser = async (courseId: string)=>{
         try {
             await Lection.deleteMany({course:courseId});
             return true;
         } catch (error) {
             throw error;
         }
     }
     //#region 
    //  public create = async(courseObject:ICourse, user: IUsuarioDTO):Promise<ICourse>=>{
    //     try {
    //         var err, result = await new Course({ ...courseObject, updated_for: user._id }).save();
    //         if (err) throw err;
    //         if (!result) throw Error("No se ha creado el curso.")
    //         return result;
    //      } catch (error) {
    //          throw (error);
    //      }
    //  }

    //  public edit = async (course: ICourse, user: IUsuarioDTO): Promise<ICourse> => {
    //     try {
    //         var err, res = await Course.findOneAndUpdate({ _id: course._id }, { ...course, updated_for: user._id });
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha editado el curso")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findById = async (courseId: string): Promise<ICourse> => {
    //     try {
    //         var err, res = await Course.findById(courseId);
    //         if (err) throw err;
    //         if (!res) throw Error ("No se ha encontrado el curso");
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findAll = async (): Promise<ICourse[]> => {
    //     try {
    //         var err, res = await Course.find({});
    //         if (err) throw err;
    //         if (!res) throw Error ("No se han encontrado cursos")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    //#endregion
 }