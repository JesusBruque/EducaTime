"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_history_1 = __importDefault(require("mongoose-history"));
var Schema = mongoose_1.default.Schema;
var reviewSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
}, { versionKey: '_version' });
reviewSchema.plugin(mongoose_history_1.default);
exports.default = mongoose_1.default.model('Review', reviewSchema);
