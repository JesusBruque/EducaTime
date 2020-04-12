export interface IStatus {
    _id: string;
    bookmark: Number; // En segundos, tiempo actual de progreso del video
    finished: boolean;
    lection: String;
    user: String
}