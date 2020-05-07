import axios from "axios";
const ORDER_URL = 'http://localhost:5000/api/order/';

export const createPaymentIntent = (cursoId:string, plazo: boolean, email: string) => axios.post(ORDER_URL+'createPaymentIntent',{id:cursoId, plazo: plazo, email: email});
export const afterPayment  = (payload:Object) => axios.post(ORDER_URL+'hndlAftrPayment',payload);
