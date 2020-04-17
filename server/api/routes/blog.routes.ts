import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import BlogController from '../../controllers/blog.controllers';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    const blogController = new BlogController;
    app.use('/blog', route);
    route.get('/findAll', blogController.findAll)
    route.get('/:blogId', blogController.findById)
    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                urls: Joi.array().items(Joi.string()),
                creation_date: Joi.number().required(),
                author: Joi.string().required(),
                active: Joi.boolean().required(),
                tags: Joi.array().items(Joi.string())
            }),
        }),
        // middlewares.isAuth,
        blogController.create);
    route.put('/',
        celebrate({
            body: Joi.object({
                _id: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                urls: Joi.array().items(Joi.string()),
                creation_date: Joi.number().required(),
                author: Joi.string().required(),
                active: Joi.boolean().required(),
                tags: Joi.array().items(Joi.string()),
                updated_for: Joi.string().allow("", null),
                _version: Joi.number().integer().required()
            }),
        }),
        // middlewares.isAuth,
        blogController.edit);
    route.put('/disable/:idBlog',
        // middlewares.isAuth,
        blogController.disable);
}