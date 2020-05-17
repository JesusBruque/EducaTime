import { Request, Response } from "express";
import GenericController from "./generic.controller";
import Usuario from '../models/usuario.model';
import AuthenticationService from '../services/authentication.services'
import CourseService from "../services/course.services"
import Logger from '../loaders/logger'
import LectionService from "../services/lection.services";
import FilesServices from "../services/files.services";
import { Json } from "aws-sdk/clients/marketplacecatalog";
import { IUsuarioDTO } from "../interfaces/IUsuario";

export default class CourseController extends GenericController {
    private courseService: CourseService;
    private authenticationService: AuthenticationService;
    private lectionService: LectionService;
    constructor() {
        super(new CourseService());
        this.courseService = new CourseService();
        this.authenticationService = new AuthenticationService();
        this.lectionService = new LectionService();
    }
    public findById = async (req: Request, res: Response) => {
        try {
            const curso = await this.courseService.findById(req.params.id);
            return res.status(200).json({ Course: curso });
        } catch (e) {
            Logger.error('Error obteniendo un curso por id.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    };
    public editCourse = async (req: Request, res: Response) => {
        Logger.debug('Editando curso...');
        try {
            let curso = req.body;
            let lections = curso.lections;
            curso.lections = [];

            /*-- EDITANDO CURSO Y LECCIONES --*/
            let oldCurso = await this.courseService.findById(curso._id);
            await this.courseService.edit(curso);
            let addTeacher = oldCurso.teacher !== curso.teacher;
            await this.manageAfterCreateOrEdit(lections, curso, addTeacher);
            return res.status(200).json({ status: 200, curso: curso });
        } catch (e) {
            Logger.error('Error al editar un curso.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public createCourse = async (req: Request, res: Response) => {
        Logger.debug('Creando curso...');

        try {
            let curso = req.body;
            console.log(curso);
            let lections = curso.lections;
            curso.lections = [];

            /*-- CREANDO CURSO Y LECCIONES --*/
            curso = await this.courseService.create(curso).catch(err => { throw err });
            await this.manageAfterCreateOrEdit(lections, curso, true);
            return res.status(200).json({ status: 200, curso: curso });
        } catch (e) {
            Logger.error('Error al crear un curso.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    };
    private manageAfterCreateOrEdit = async (lections, curso, addTeacher) => {
        await this.courseService.lectionEraser(curso._id);
        let pLections = [];
        lections.forEach((lection, i) => {
            pLections.push(this.courseService.addLectionToCourse(curso._id, lection, i + 1));
        });

        await Promise.all(pLections).catch(e => { throw e });
        if (curso.teacher && addTeacher) {
            await this.manageTeacher(curso._id, curso.teacher, curso.title, curso.description);
            console.log('email enviado al profesor.')
        }
    };
    private manageTeacher = async (cursoId: string, email: string, titulo: string, descripcion: string) => {
        try {
            var err, user = await this.authenticationService.findByEmail(email, '');
            if (err) throw err;
            if (user._id) {
                console.log(user._id);
                if (!(user.roles.includes('teacher'))) {
                    console.log('añadiendo rol de profeesor');
                    await this.authenticationService.addRolTeacherToUser(user._id);
                }
            }
            else {
                await this.authenticationService.registerTeacher(user);
            }
            await this.authenticationService.sendCourseAssignmentEmail(email, user.username, titulo, descripcion);
            console.log('El usuario recibirá un email');
        } catch (e) {
            throw e;
        }
    }
    public uploadCourseFile = async (req: Request, res: Response) => {
        Logger.debug('Subiendo fichero...');
        try {
            const cursoId = req.params.cursoId;
            req.pipe(req.busboy);
            let fileLocation: string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file', async (fieldname, file, filename) => {
                fileLocation = await this.courseService.uploadFile(cursoId, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                console.log('Send 200 status--->', new Date());
                return res.status(200).json({ location: fileLocation });
            });
        } catch (e) {
            Logger.error('Error al subir un fichero para un curso.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }


    public findCoursesWhereTeacher = async (req: Request, res: Response) => {
        try {
            const user = req.user as IUsuarioDTO;
            const cursos = await this.courseService.findCoursesWhereTeacher(user.email);
            return res.status(200).json({ cursos: cursos });
        } catch (e) {
            Logger.error('Error al encontrar los cursos dónde es profesor.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public findAll = async (req: Request, res: Response) => {
        try {
            const Course = await this.courseService.findAll(req.params.search);
            return res.status(200).json({ Course });
        } catch (e) {
            Logger.error('Error al encontrar los cursos dónde es profesor.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public fetchAlumnosByCourse = async (req: Request, res: Response) => {
        try {
            const usuarios = await this.courseService.fetchAlumnosByCourse(req.params.idCurso);
            return res.status(200).json({ usuarios });
        } catch (e) {
            Logger.error('Error al encontrar los cursos dónde es profesor.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }

    public deleteFullCourse = async (req: Request, res: Response) => {
        Logger.debug('eliminando curso');
        try {
            /*--- ELIMINAR LA REFERENCIA DE LOS USUARIOS ---*/
            const courseId = req.params.courseId;
            let err, users = await Usuario.find({ "cursos.idCurso": courseId }).lean();
            if (err) throw err;
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                await this.authenticationService.deleteCourseFromUser(user._id, courseId)
            }
            /*---- ELIMINAR CURSO ----*/
            await this.courseService.hardDelete(courseId);
            Logger.debug('curso eliminado');
            return res.status(200).json({ status: 200 });
        } catch (e) {
            return res.status(400).json({ status: 400 });
        }
    }
}
