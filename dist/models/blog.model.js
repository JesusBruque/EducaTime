"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_history_1 = __importDefault(require("mongoose-history"));
var Schema = mongoose_1.default.Schema;
var blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    description: {
        type: String
    },
    urls: {
        type: [String],
        required: true,
        trim: true
    },
    creation_date: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
    },
    tags: {
        type: [String],
        trim: true
    },
}, { versionKey: '_version' });
blogSchema.plugin(mongoose_history_1.default);
exports.default = mongoose_1.default.model('Blog', blogSchema);
