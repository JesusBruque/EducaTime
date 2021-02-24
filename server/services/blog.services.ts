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
    public uploadFile = async (file,filename,isVideo,blogTitle) => {
        try{
            const fileLocation : string = await this.fileService.uploadFile(file,blogTitle,filename,isVideo,false);
            Logger.debug('fichero subido...');
            return fileLocation;
        }catch(e){
            throw e;
        }
    };

    public deleteBlog = async (blogId) => {
        try{
            let err, blog = await Blog.findById(blogId);
            if(err) throw err;
            let files = [blog.thumbnail];
            if(blog.video) files.push(blog.video);
            await this.fileService.removeFiles(files);
            await Blog.deleteOne({_id:blogId});
            return true;
        }catch(e){
            throw e;
        }
    }
}
