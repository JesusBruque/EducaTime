import GenericService from "./generic.services";
import Blog from "../models/blog.model"

export default class BlogService extends GenericService {
    constructor() {
        super(Blog);
    }

    public disable = async (idBlog: string): Promise<void> => {
        try {
            var err, res = await Blog.findByIdAndUpdate(idBlog, { active: false });
            if (err) throw err;
        } catch (e) {
            throw e;
        }
    }
}