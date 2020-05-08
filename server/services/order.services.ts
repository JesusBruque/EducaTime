import GenericService from "./generic.services";
import Order from "../models/order.model"
import {ICourse} from "../interfaces/ICourse";
import AuthenticationService from "./authentication.services"
import {IOrder} from "../interfaces/IOrder";
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
import Course from '../models/course.model';

export default class OrderService extends GenericService{
    userService: AuthenticationService;
    constructor(){
        super(Order);
        this.userService = new AuthenticationService();
    }
    public paymentIntent = async(courseId:string, plazo:boolean, email: string) => {
        try{
            console.log('PAYMENT INTENT CURSO '+ courseId);
            const course = await Course.findById(courseId) as ICourse;
            let plazoIndex = 0;
            let courseAmount = 0;
            if(!plazo){
                courseAmount = course.original_fee * (1 - (course.discount/100));
            }
            else{
                try{
                    let user = this.userService.findUserByEmail(email);
                    let courseIndex = 0;
                    var found = false;
                    const l = await (await user).cursos.length;

                    for(var i=0;i<l;i++){
                        if((await user).cursos[i].idCurso.toString()==courseId){
                            courseIndex = i;
                            found = true;
                        }
                    }
                    if(!found){
                        plazoIndex = 0;
                    }
                    else{
                        for(var j = 0;j<course.fees.length;j++){
                            if(!(await user).cursos[courseIndex].feeState[j].paid){
                                plazoIndex=j;
                            }
                        }}
                    courseAmount = course.fees[plazoIndex].fee * (1 - (course.discount/100));

                }catch(error){
                    throw error;
                }
            }
            //const IVA = courseAmount * 0.21;
            //const totalAmount = courseAmount + IVA;
            const totalAmount = courseAmount*1.21;
            return await stripe.paymentIntents.create({
                amount:totalAmount*100,
                currency:"eur",
                plazo: plazo? plazoIndex+1 : -1
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
