import GenericService from "./generic.services";
import Order from "../models/order.model"
import {ICourse} from "../interfaces/ICourse";
import {IOrder} from "../interfaces/IOrder";
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
import Course from '../models/course.model';

export default class OrderService extends GenericService{
    constructor(){
        super(Order);
    }
    public paymentIntent = async(courseId:string) => {
        try{
            console.log('PAYMENT INTENT CURSO '+ courseId);
            const course = await Course.findById(courseId) as ICourse;
            const courseAmount = course.original_fee * (1 - (course.discount/100));
            const IVA = courseAmount * 0.21;
            const totalAmount = courseAmount + IVA;
            return await stripe.paymentIntents.create({
                amount:totalAmount*100,
                currency:"eur"
            });
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
