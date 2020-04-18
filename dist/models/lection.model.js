"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_history_1 = __importDefault(require("mongoose-history"));
var Schema = mongoose_1.default.Schema;
var lectionSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        minlength: 1
    },
    order: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
}, { versionKey: '_version' });
lectionSchema.plugin(mongoose_history_1.default);
exports.default = mongoose_1.default.model('Lection', lectionSchema);
