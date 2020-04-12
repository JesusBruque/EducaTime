import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import LectionController from '../../controllers/lection.controller';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    const lectionController = new LectionController;
    app.use('/lection', route);

    route.get('/findAll', lectionController.FindAll)
    
    route.get('/:blogId', lectionController.FindById)

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
        middlewares.isAuth,
        lectionController.Create);

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
        middlewares.isAuth,
        lectionController.Edit);

}