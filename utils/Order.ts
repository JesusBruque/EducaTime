import axios from "axios";
const ORDER_URL = process.env.API_URL+'/api/order/';

export const createPaymentIntent = (cursoId:string, plazo: number) => axios.post(ORDER_URL+'createPaymentIntent',{id:cursoId, plazo: plazo});
export const afterPayment  = (payload:Object) => axios.post(ORDER_URL+'hndlAftrPayment',payload);
