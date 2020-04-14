import GenericController from "./generic.controller";
import OrderService from "../services/order.services"


export default class OrderController extends GenericController{
    constructor(){
        super(new OrderService());
      }
    //#region
    // public Create = async (req:Request,res:Response , next: NextFunction)=>{
    //     Logger.debug("Creando orden.")
    //     try {
    //         const order = await this.orderService.create(req.body as IOrder, req.user as IUsuarioDTO);
    //         return res.status(200).json({status:200, order:"order"});
    //     } catch (error) {
    //         console.error("Ha ocurrido un error al crear una orden.");
    //         console.error(error);
    //         return res.status(400).json({ status:400, mensaje: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // /*
    // public Edit = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Editando un blog');
    //     try {
    //         const order = await this.orderService.edit(req.body as IBlog, req.user as IUsuarioDTO);
    //         return res.status(200).json({ status: 200, blog: blog });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error editando una empresa');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // */
    // public FindAll = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findAll orders');
    //     try {
    //         const orders = await this.orderService.findAll();
    //         return res.status(200).json({ status: 200, orders: orders });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findAll orders');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public FindById = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findById order');
    //     try {
    //         const order = await this.orderService.findById(req.params.blogId);
    //         return res.status(200).json({ status: 200, order: order });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findById order');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    //#endregion
}