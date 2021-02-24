import GenericController from "./generic.controller";
import BookmarkServices from "../services/bookmark.services"

export default class BookmarkController extends GenericController{
  private bookmarkService:BookmarkServices;
    constructor(){
      // this.bookmarkService=new BookmarkServices();
        super(new BookmarkServices());
      }
      //#region 
    // public Create = async (req:Request,res:Response , next: NextFunction)=>{
    //     Logger.debug("Creando curso.")
    //     try {
    //         const estado = await this.bookmarkServices.create(req.body as IBookmark);
    //         return res.status(200).json({status:200, myStatus:estado});
    //     } catch (error) {
    //         console.error("Se ha producido un error al crear un bookmark.");
    //         console.error(error);
    //         return res.status(400).json({mensaje:"Se ha producido un error inesperado. Contacte con el administrador."});
    //     }
    // }
    // public Edit = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Editando un status');
    //     try {
    //         const myStatus = await this.bookmarkServices.edit(req.body as IBookmark);
    //         return res.status(200).json({ status: 200, myStatus: myStatus });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error editando un bookmark');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // public Delete = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Borrando un blog');
    //     try {
    //         const bookmark = await this.bookmarkServices.delete((req.body as IBookmark)._id);
    //         return res.status(200).json({ status: 200, mensaje: "Borrado con exito" });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error borrando una empresa');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // /*
    // public FindAll = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findAll status');
    //     try {
    //         const myStatus = await this.bookmarkServices.findAll();
    //         return res.status(200).json({ status: 200, blogs: blogs });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findAll blogs');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    // */
    // public FindById = async (req: Request, res: Response, next: NextFunction) => {
    //     Logger.debug('Metodo findById bookmark');
    //     try {
    //         const myBookmark = await this.bookmarkServices.findById(req.params.bookmarkId);
    //         return res.status(200).json({ status: 200, bookmark: myBookmark });
    //     } catch (e) {
    //         Logger.error('Se ha producido un error findById blogs');
    //         Logger.error(e);
    //         return res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." });
    //     }
    // }
    //#endregion
}