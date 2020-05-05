import GenericService from "./generic.services";
import Blog from "../models/blog.model"
import Logger from "../loaders/logger";
import FilesServices from "./files.services";

export default class BlogService extends GenericService {
    private fileService:FilesServices;
    constructor() {
        super(Blog);
        this.fileService = new FilesServices();
    }

    public disable = async (idBlog: string): Promise<void> => {
        try {
            var err, res = await Blog.findByIdAndUpdate(idBlog, { active: false });
            if (err) throw err;
        } catch (e) {
            throw e;
        }
    }
    public uploadFile = async (file,filename,res) => {
        try{
            const fileLocation : string = await this.fileService.uploadFile(file,`public/blogImages/${filename}`,res);
            Logger.debug('fichero subido...');
            return fileLocation;
        }catch(e){
            throw e;
        }
    };
}
