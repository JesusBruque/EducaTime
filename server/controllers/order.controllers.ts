import OrderServices from '../services/order.services'
import {IOrder} from '../interfaces/IOrder'
import { Response, Request } from 'express';

export default class OrderController{
    private orderService:OrderServices;
    constructor(){
        this.orderService = new OrderServices;
    }
    public Create = async (myRequest:Request,myResponse:Response)=>{
        try {
            const order = await this.orderService.Create(myRequest.body as IOrder);
            return myResponse.status(200).json({status:200,mensaje:"Orden creada con èxito.", order:"order"});
        } catch (error) {
            console.error("Ha ocurrido un error al crear una orden.");
            console.error(error);
            return myResponse.status(400).json({mensaje:"Ha ocurrido un error al crear una orden."});
        }
    }
}