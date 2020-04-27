import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import CourseController from '../../controllers/course.controller'
import middlewares from '../middlewares';
const route = Router();

export default (app:Router)=>{
    const courseController = new CourseController;
    app.use('/course',route);

    route.get('/findAll', courseController.findAll);
    
    route.get('/findById/:id', courseController.findById);

    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                thumbnail: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                requirements: Joi.array(),
                category: Joi.array().required(),
                original_fee: Joi.number().required(),
                discount: Joi.number().required(),
                last_update: Joi.string(),
                goals: Joi.array(),
                tags: Joi.array(),
                score: Joi.number().required(),
                reviews: Joi.array(),
                perCent: Joi.string(),
                active: Joi.boolean()
            }),
        }),
        // middlewares.isAuth,
        courseController.create);
        
    route.put('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                thumbnail: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                requirements: Joi.array(),
                category: Joi.array().required(),
                oriinal_fee: Joi.number().required(),
                discount: Joi.number().required(),
                last_update: Joi.string(),
                goals: Joi.array(),
                tags: Joi.array(),
                score: Joi.number().required(),
                reviews: Joi.array(),
                perCent: Joi.string(),
                active: Joi.boolean(),
                updated_for: Joi.string().required()
            }),
        }),
        // middlewares.isAuth,
        courseController.edit);

}
