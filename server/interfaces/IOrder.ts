import { IGenericInterface } from "./IGenericInterface";

export interface IOrder extends IGenericInterface{
    date: number; // Fecha de pago
    course:String;
    user: String;
    paid: boolean;
    client_secret:string;
    payment_id:string;
    fee: Number; // Cuota
    currency: string; // Moneda
    description: string;
    email:string;
}
