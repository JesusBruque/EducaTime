import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import BlogController from '../../controllers/blog.controllers';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    const blogController = new BlogController;
    app.use('/blog', route);
    route.get('/findAll', blogController.FindAll)
    route.get('/:blogId', blogController.FindById)
    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                urls: Joi.array().required(),
                creation_date: Joi.date(),
                author: Joi.string().required(),
                active: Joi.boolean().required(),
                tags: Joi.array().required(),
            }),
        }),
        middlewares.isAuth,
        blogController.Create);
    route.put('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                creation_date: Joi.date().required(),
                author: Joi.string().required(),
                active: Joi.boolean().required(),
                tags: Joi.string().required(),
                updated_for: Joi.string().required(),
                _version: Joi.number().integer().required()
            }),
        }),
        middlewares.isAuth,
        blogController.Edit);
}