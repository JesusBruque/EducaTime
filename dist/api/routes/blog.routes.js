"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var blog_controllers_1 = __importDefault(require("../../controllers/blog.controllers"));
var route = express_1.Router();
exports.default = (function (app) {
    var blogController = new blog_controllers_1.default;
    app.use('/blog', route);
    route.get('/findAll', blogController.findAll);
    route.get('/:blogId', blogController.findById);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            urls: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
            creation_date: celebrate_1.Joi.number().required(),
            author: celebrate_1.Joi.string().required(),
            active: celebrate_1.Joi.boolean().required(),
            tags: celebrate_1.Joi.array().items(celebrate_1.Joi.string())
        }),
    }), 
    // middlewares.isAuth,
    blogController.create);
    route.put('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            _id: celebrate_1.Joi.string().required(),
            title: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            urls: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
            creation_date: celebrate_1.Joi.number().required(),
            author: celebrate_1.Joi.string().required(),
            active: celebrate_1.Joi.boolean().required(),
            tags: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
            updated_for: celebrate_1.Joi.string().allow("", null),
            _version: celebrate_1.Joi.number().integer().required()
        }),
    }), 
    // middlewares.isAuth,
    blogController.edit);
    route.put('/disable/:idBlog', 
    // middlewares.isAuth,
    blogController.disable);
});
