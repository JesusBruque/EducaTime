import BookmarkController from '../../controllers/bookmark.controller';
import {Joi, celebrate} from 'celebrate';
import {Router} from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app:Router) =>{
    const bookmarkController = new BookmarkController;

    route.get('/:blogId', bookmarkController.findById)

    app.use('/bookmark',route);

    route.post('/',
        celebrate({
            body: Joi.object({
                bookmark: Joi.number().required(),
                finished: Joi.boolean().required(),
                lection: Joi.string().required(),
                user: Joi.string().required()
            })
    }), 
    // middlewares.isAuth,
    bookmarkController.create);
    route.put('/',
        celebrate({
            body: Joi.object({
                bookmark: Joi.number().required(),
                finished: Joi.boolean().required(),
                lection: Joi.string().required(),
                user: Joi.string().required()
            })
    }), 
    // middlewares.isAuth,
    bookmarkController.edit);
}