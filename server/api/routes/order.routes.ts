import OrderController from '../../controllers/order.controllers';
import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import middlewares from '../middlewares';
const route = Router();

export default (app:Router) => {
    const orderController = new OrderController;
    app.use('/order',route);

    route.get('/findAll', orderController.findAll)
    
    route.get('/:orderId', orderController.findById)

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
        // middlewares.isAuth,
        orderController.create);

    /*--- PAYMENTS ---*/
    route.post('/createPaymentIntent',
        celebrate({
            body:Joi.object({
                id:Joi.string().required(),
                plazo: Joi.number().required().allow(null),
                code:Joi.string().allow(null)
            }),
        }),
        orderController.paymentIntent);

    route.post('/hndlAftrPayment',celebrate({
        body:Joi.object({
            amount:Joi.number().required(),
            plazo: Joi.number().required().allow(null),
            code:Joi.string().allow(null),
            client_secret:Joi.string().required(),
            id:Joi.string().required(),
            receipt_email:Joi.string().required(),
            status:Joi.string().required(),
            curso:Joi.string().required(),
            name:Joi.string().required()
        }).unknown(true)
    }),orderController.handleAfterPayment);


}
