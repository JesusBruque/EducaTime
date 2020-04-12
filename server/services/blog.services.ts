import Blog from '../models/blog.model';
import { IUsuarioDTO } from '../interfaces/IUsuario';
import { IBlog } from '../interfaces/IBlog';

export default class BlogService {
    constructor() { }

    public create = async (blog, user: IUsuarioDTO): Promise<IBlog> => {
        try {
            var err, res = await new Blog({ ...blog, updated_for: user._id }).save();
            if (err) throw err;
            if (!res) throw Error("No se ha creado el blog.")
            return res;
        } catch (e) {
            throw e;
        }
    }
    public edit = async (blog: IBlog, user: IUsuarioDTO): Promise<IBlog> => {
        try {
            var err, res = await Blog.findOneAndUpdate({ _id: blog._id }, { ...blog, updated_for: user._id });
            if (err) throw err;
            if (!res) throw Error("No se ha editado el blog.")
            return res;
        } catch (e) {
            throw e;
        }
    }
    public delete = async (blogId: string): Promise<Boolean> => {
        try {
            var err, res = await Blog.findByIdAndDelete(blogId);
            if (err) throw err;
            if (!res) throw Error("No se ha borrado el blog");
            return true;
        } catch (e) {
            throw e;
        }
    }
    public findById = async (blogId: string): Promise<IBlog> => {
        try {
            var err, res = await Blog.findById(blogId);
            if (err) throw err;
            return res;
        } catch (e) {
            throw e;
        }
    }
    public findAll = async (): Promise<IBlog[]> => {
        try {
            var err, res = await Blog.find({});
            if (err) throw err;
            return res;
        } catch (e) {
            throw e;
        }
    }
}