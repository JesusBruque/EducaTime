import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import CourseController from '../../controllers/course.controller'
import middlewares from '../middlewares';
const route = Router();

export default (app:Router)=>{
    const courseController = new CourseController;
    app.use('/course',route);

    route.get('/findAll', courseController.findAll)
    
    route.get('/:courseId', courseController.findById)
    console.log("Llegando al Course route ...");
    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().allow(null,""),
                thumbnail: Joi.string().allow(null,""),
                video: Joi.string().allow(null,""),
                duration: Joi.number().allow(null,""),
                requirements: Joi.string().allow(null,""),
                target: Joi.string().allow(null,""),
                category: Joi.array().allow(null),
                original_fee: Joi.number().required(),
                discount: Joi.number().required(),
                last_update: Joi.string(),
                goals: Joi.string().allow(null,""),
                tags: Joi.array().allow(null),
                score: Joi.number().allow(null,""),
                fees: Joi.number().allow(null,""),
                reviews: Joi.array().allow(null),
                perCent: Joi.string().allow(null,""),
                active: Joi.boolean().required(),
                dateStartInscription: Joi.number().allow(null,""),
                dateEndInscription: Joi.number().required(),
                dateEndCourse: Joi.number().required(),
                teacher: Joi.string().allow(null,""),
            }),
        }),
        // middlewares.isAuth,
        courseController.create);
        
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
                oriinal_fee: Joi.number(),
                discount: Joi.number(),
                last_update: Joi.string(),
                goals: Joi.array(),
                tags: Joi.array(),
                score: Joi.number(),
                reviews: Joi.array(),
                perCent: Joi.string(),
                active: Joi.boolean(),
                updated_for: Joi.string().required()
            }),
        }),
        // middlewares.isAuth,
        courseController.edit);
}
