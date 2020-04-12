import {IOrder} from '../interfaces/IOrder'
import Order from '../models/order.model'

export default class OrderService{
    constructor(){
    }
    public Create = async (orderObject:IOrder):Promise<IOrder>=>{
        try {
            let err, result = await Order.create(orderObject as IOrder);
            if (err){
                console.log("Valor indefinido");
                return err;
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}