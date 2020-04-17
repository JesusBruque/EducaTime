import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import ReviewController from '../../controllers/review.controller';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    const reviewController = new ReviewController;
    app.use('/lection', route);

    route.get('/findAll', reviewController.findAll)
    
    route.get('/:blogId', reviewController.findById)

    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                order: Joi.number().required(),
                course: Joi.string().required(),
                active: Joi.boolean()
            }),
        }),
        // middlewares.isAuth,
        reviewController.create);

    route.put('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                order: Joi.number().required(),
                course: Joi.string().required(),
                active: Joi.boolean(),
                updated_for: Joi.string().required()
            }),
        }),
        // middlewares.isAuth,
        reviewController.edit);

}