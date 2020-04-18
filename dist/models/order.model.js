"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_history_1 = __importDefault(require("mongoose-history"));
var Schema = mongoose_1.default.Schema;
var orderSchema = new Schema({
    place_date: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    user: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    fee: {
        type: Number,
        required: true,
        minlength: 1
    },
    currency: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String
    },
}, { versionKey: '_version' });
orderSchema.plugin(mongoose_history_1.default);
exports.default = mongoose_1.default.model('Order', orderSchema);
