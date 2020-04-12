export interface IOrder{
    _id: string;
    place_date: string; // Fecha de pago
    course:String;
    user: String;
    paid: boolean;
    fee: Number; // Cuota
    currency: string; // Moneda
    description: string
}