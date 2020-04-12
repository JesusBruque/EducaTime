import StatusController from '../../controllers/status.controller';
import {Joi, celebrate} from 'celebrate';
import {Router} from 'express';
const route = Router();

export default (app:Router) =>{
    const statusController = new StatusController;
    app.use('/status',route);
    route.post('/',
        celebrate({
            body: Joi.object({
                bookmark: Joi.number().required(),
                finished: Joi.boolean().required(),
                lection: Joi.string().required(),
                user: Joi.string().required()
            })
    }), statusController.Create);
}