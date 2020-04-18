"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_history_1 = __importDefault(require("mongoose-history"));
var Schema = mongoose_1.default.Schema;
var courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    video: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    requirements: {
        type: [String],
        required: true,
        trim: true
    },
    category: {
        type: [String],
        required: true,
        trim: true
    },
    fee: {
        type: Number,
        required: true,
    },
    last_update: {
        type: String,
        trim: true
    },
    goals: {
        type: [String],
        required: true,
        minlength: 5,
        trim: true
    },
    tags: {
        type: [String],
        trim: true
    },
}, { versionKey: '_version' });
courseSchema.plugin(mongoose_history_1.default);
exports.default = mongoose_1.default.model('Course', courseSchema);
