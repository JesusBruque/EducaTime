import GenericService from "./generic.services";
import Order from "../models/order.model"
import {ICourse} from "../interfaces/ICourse";
import AuthenticationService from "./authentication.services"
import {IOrder} from "../interfaces/IOrder";
const stripe = require("stripe")(process.env.CLAVE_SK_STRIPE);
import Course from '../models/course.model';

export default class OrderService extends GenericService{
    userService: AuthenticationService;
    constructor(){
        super(Order);
        this.userService = new AuthenticationService();
    }
    public paymentIntent = async(courseId:string, plazo:number) => {
        try{
            console.log('PAYMENT INTENT CURSO '+ courseId);
            const course = await Course.findById(courseId) as ICourse;
            let courseAmount = 0;
            console.log(plazo);
            if(plazo === null || plazo === undefined){
                console.log('NO HAY PLAZO COMPADRE');
                courseAmount = course.original_fee * (1 - (course.discount/100));
            }
            else{
                try{
                    courseAmount = course.fees[plazo].fee;
                }catch(e){
                    throw e;
                }
            }

            if(courseAmount > 0){
                return await stripe.paymentIntents.create({
                    amount:courseAmount*100,
                    currency:"eur"
                });
            }else{
                throw Error('No se ha creado la orden de pago correctamente. Parece que el precio a cobrar no es mayor a 0.');
            }
        }catch(error){
            throw error;
        }
    };

    public updateOrderByPaymentId = async(paymentInfo:any,userId:string) => {
        try {
            let err, order = await Order.findOneAndUpdate({payment_id:paymentInfo.id},{description:"Orden de pago aceptada.",paid:true,email:paymentInfo.receipt_email,user:userId});
            if(err) throw err;
            if(!order) throw Error('No se ha encontrado ninguna orden de pago con este id.'+paymentInfo.id);
            return order;
        } catch (error) {
            throw error;
        }
    }

}
