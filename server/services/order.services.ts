import GenericService from "./generic.services";
import Order from "../models/order.model"

export default class OrderService extends GenericService{
    constructor(){
        super(Order);
    }
    //#region 
    // public create = async(orderObject:IOrder, user: IUsuarioDTO):Promise<IOrder>=>{
    //     try {
    //         var err, result = await new Order({ ...orderObject, updated_for: user._id }).save();
    //         if (err) throw err;
    //         if (!result) throw Error("No se ha creado la orden.")
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // /*
    // public edit = async (order: IOrder, user: IUsuarioDTO): Promise<IOrder> => {
    //     try {
    //         var err, res = await Order.findOneAndUpdate({ _id: order._id }, { ...order, updated_for: user._id });
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha editado la order")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // */
    // public delete = async (orderId: string): Promise<Boolean> => {
    //     try {
    //         var err, res = await Order.findByIdAndDelete(orderId);
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha borrado la orden");
    //         return true;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findById = async (orderId: string): Promise<IOrder> => {
    //     try {
    //         var err, res = await Order.findById(orderId);
    //         if (err) throw err;
    //         if (!res) throw Error ("No se ha encontrado la orden");
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findAll = async (): Promise<IOrder[]> => {
    //     try {
    //         var err, res = await Order.find({});
    //         if (err) throw err;
    //         if (!res) throw Error ("No se han encontrado ordenes")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    //#endregion
}