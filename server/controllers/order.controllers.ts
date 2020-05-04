import GenericController from "./generic.controller";
import OrderService from "../services/order.services"
import {Request, Response} from "express";
import Logger from "../loaders/logger";
import CourseService from "../services/course.services";
import AuthenticationService from "../services/authentication.services";


export default class OrderController extends GenericController{
    private orderService;
    private userService;
    constructor(){
        super(new OrderService());
        this.orderService = new OrderService();
        this.userService = new AuthenticationService();
      }
    public paymentIntent = async(req:Request,res:Response) => {
        Logger.debug('Intentando un pago.');
        try{
            /*aqui voy a tener el id del curso que tengo que pagar... Vamos a llamar al findById y vamos a coger esa cantidad para el pago.*/
            let courseId = req.body.id;
            const paymentResponse = await this.orderService.paymentIntent(courseId);
            const orderObject = {date:Date.now(),course:courseId,paid:false,fee:paymentResponse.amount,currency:"EUR",client_secret:paymentResponse.client_secret,payment_id:paymentResponse.id,description:"Creación de la orden de pago."};
            await this.orderService.create(orderObject);
            /*--- Ya tengo la orden de pago creada y voy a devolver al cliente la clave secreta ---*/
            return res.status(200).json({status:200,clientSecret:paymentResponse.client_secret});
        }catch(e){
            Logger.error('Error al crear un intento de pago.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    };

    public handleAfterPayment = async(req:Request,res:Response) => {
        Logger.debug('Función tras un pago.');
        try{
            let paymentInfo = req.body;
            let user = await this.userService.findByEmail(paymentInfo.receipt_email);
            if(!user._id){
                user = await this.userService.registerUser(user);
            }
            console.log(user._id);
            await this.userService.addCursoToUser(user._id,paymentInfo.curso);
            const order = await this.orderService.updateOrderByPaymentId(paymentInfo,user._id);
            /*--- QUEDA ENVIAR EL EMAIL CON LAS CREDENCIALES---*/
            return res.status(200).json({status:200,order:order});
        }catch(e){
            Logger.error('Error al obtener un intento de pago.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    }
}
