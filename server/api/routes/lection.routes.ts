import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import LectionController from '../../controllers/lection.controller';
const route = Router();

export default (app: Router) => {
    const lectionController = new LectionController;
    app.use('/lection', route);
    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                order: Joi.number().required(),
                course: Joi.string().required(),
            }),
        }),
        lectionController.Create);
}