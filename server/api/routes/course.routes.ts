import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import CourseController from '../../controllers/course.controller'
import middlewares from '../middlewares';
import FilesController from "../../controllers/files.controller";
import isAdmin from '../middlewares/isAdmin';
import isTeacher from '../middlewares/isTeacher';
import isAuth from '../middlewares/isAuth';
const route = Router();

export default (app:Router)=>{
    const courseController = new CourseController;
    const fileController = new FilesController;
    app.use('/course',route);

    route.get('/findAll', courseController.findAll);
    
    route.get('/findById/:id', courseController.findById);

    route.post('/',
        celebrate({
            body:Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                thumbnail: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().allow(null,""),
                requirements: Joi.string().required(),
                target: Joi.string().required(),
                category: Joi.array().allow(null),
                original_fee: Joi.number().required(),
                discount: Joi.number().required(),
                goals: Joi.string().required(),
                tags: Joi.array().allow(null),
                score: Joi.number().allow(null,""),
                fees: Joi.array().items(Joi.object({fee:Joi.number(),date:Joi.number()}).allow(null)).allow(null),
                reviews: Joi.array().allow(null),
                active: Joi.boolean().required(),
                teacher: Joi.string().allow(null,""),
                lections:Joi.array().items(Joi.object({title:Joi.string()})),
                webinar:Joi.string().allow(null,"")
            })
        }),
        //isAdmin,
        courseController.createCourse);
        
    route.put('/',
        celebrate({
            body: Joi.object({
                title: Joi.string(),
                description: Joi.string(),
                thumbnail: Joi.string(),
                video: Joi.string(),
                duration: Joi.number(),
                requirements: Joi.array(),
                category: Joi.array(),
                original_fee: Joi.number(),
                discount: Joi.number(),
                last_update: Joi.string(),
                goals: Joi.array(),
                tags: Joi.array(),
                score: Joi.number(),
                reviews: Joi.array(),
                perCent: Joi.string(),
                active: Joi.boolean(),
                updated_for: Joi.string().required()
            }).unknown(true),
        }),
        //isAdmin || isTeacherOfCourse,
        courseController.edit);

    route.post('/post_file/:cursoId',isAdmin,courseController.uploadCourseFile);
    route.get('/get_file/:filename',fileController.retrieveFile);

    /* PROBANDO UPLOADING PROGRESS */

    

}
