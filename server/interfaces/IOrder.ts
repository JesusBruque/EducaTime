import { IGenericInterface } from "./IGenericInterface";

export interface IOrder extends IGenericInterface{
    place_date: string; // Fecha de pago
    course:String;
    user: String;
    paid: boolean;
    fee: Number; // Cuota
    currency: string; // Moneda
    description: string
}