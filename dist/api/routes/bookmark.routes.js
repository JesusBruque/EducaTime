"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bookmark_controller_1 = __importDefault(require("../../controllers/bookmark.controller"));
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var route = express_1.Router();
exports.default = (function (app) {
    var bookmarkController = new bookmark_controller_1.default;
    route.get('/:blogId', bookmarkController.findById);
    app.use('/bookmark', route);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            bookmark: celebrate_1.Joi.number().required(),
            finished: celebrate_1.Joi.boolean().required(),
            lection: celebrate_1.Joi.string().required(),
            user: celebrate_1.Joi.string().required()
        })
    }), 
    // middlewares.isAuth,
    bookmarkController.create);
    route.put('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            bookmark: celebrate_1.Joi.number().required(),
            finished: celebrate_1.Joi.boolean().required(),
            lection: celebrate_1.Joi.string().required(),
            user: celebrate_1.Joi.string().required()
        })
    }), 
    // middlewares.isAuth,
    bookmarkController.edit);
});
