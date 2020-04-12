import StatusController from '../../controllers/status.controller';
import {Joi, celebrate} from 'celebrate';
import {Router} from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app:Router) =>{
    const statusController = new StatusController;

    route.get('/:blogId', statusController.FindById)

    app.use('/status',route);

    route.post('/',
        celebrate({
            body: Joi.object({
                bookmark: Joi.number().required(),
                finished: Joi.boolean().required(),
                lection: Joi.string().required(),
                user: Joi.string().required()
            })
    }), 
    middlewares.isAuth,
    statusController.Create);
    route.put('/',
        celebrate({
            body: Joi.object({
                bookmark: Joi.number().required(),
                finished: Joi.boolean().required(),
                lection: Joi.string().required(),
                user: Joi.string().required()
            })
    }), 
    middlewares.isAuth,
    statusController.Edit);
}