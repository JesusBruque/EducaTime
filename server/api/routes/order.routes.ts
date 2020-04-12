import OrderController from '../../controllers/order.controllers';
import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
const route = Router();

export default (app:Router) => {
    const orderController = new OrderController;
    app.use('/order',route);
    route.post('/',
        celebrate({
            body: Joi.object({
                place_date: Joi.string().required(),
                course: Joi.string().required(),
                user: Joi.string().required(),
                paid: Joi.boolean().required(),
                fee: Joi.number().required(),
                currency: Joi.string().required(),
                description: Joi.string()
            }),
        }),
        orderController.Create);
}