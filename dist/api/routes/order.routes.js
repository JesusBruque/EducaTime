"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_controllers_1 = __importDefault(require("../../controllers/order.controllers"));
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var route = express_1.Router();
exports.default = (function (app) {
    var orderController = new order_controllers_1.default;
    app.use('/order', route);
    route.get('/findAll', orderController.findAll);
    route.get('/:orderId', orderController.findById);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            place_date: celebrate_1.Joi.string().required(),
            course: celebrate_1.Joi.string().required(),
            user: celebrate_1.Joi.string().required(),
            paid: celebrate_1.Joi.boolean().required(),
            fee: celebrate_1.Joi.number().required(),
            currency: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string()
        }),
    }), 
    // middlewares.isAuth,
    orderController.create);
});
