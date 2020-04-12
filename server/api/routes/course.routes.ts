import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import CourseController from '../../controllers/course.controller'
const route = Router();

export default (app:Router)=>{
    const courseController = new CourseController;
    console.log("Se creo el courseController");
    app.use('/course',route);
    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                requirements: Joi.array(),
                category: Joi.array().required(),
                fee: Joi.number().required(),
                last_update: Joi.string().required(),
                goals: Joi.array(),
                tags: Joi.array()
            }),
        }),
        courseController.Create);
}