import GenericController from "./generic.controller";
import CourseService from "../services/course.services"

export default class CourseController extends GenericController{
    constructor(){
        super(new CourseService());
      }
      //#region 
    // public Create = async( req:Request,res:Response , next: NextFunction)=>{
    //     Logger.debug("Creando curso.")
    //     try {
    //         const course = await this.courseService.create(req.body as ICourse, req.user as IUsuarioDTO);
    //         return res.status(200).json({status:200,course:course})
    //     } catch (error) {
    //         console.error("Ha ocurrido un error al ingresar una curso.");
    //         console.error(error);
    //         return res.status(400).json({ status: 400, mensaje: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public Edit = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Editando un curso');
    //     try {
    //         const course = await this.courseService.edit(req.body as ICourse, req.user as IUsuarioDTO);
    //         return res.status(200).json({ status: 200, course: course });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error editando un curso');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public Delete = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Borrando un curso');
    //     try {
    //         const blog = await this.courseService.delete((req.body as ICourse)._id);
    //         return res.status(200).json({ status: 200, mensaje: "Borrado con exito" });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error borrando un curso');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public FindAll = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findAll cursos');
    //     try {
    //         const courses = await this.courseService.findAll();
    //         return res.status(200).json({ status: 200, courses: courses});
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findAll courses');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public FindById = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findById course');
    //     try {
    //         const course = await this.courseService.findById(req.params.courseId);
    //         return res.status(200).json({ status: 200, course: course });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findById course');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    //#endregion
}