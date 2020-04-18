"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_history_1 = __importDefault(require("mongoose-history"));
var Schema = mongoose_1.default.Schema;
var bookmarkSchema = new Schema({
    bookmark: {
        type: Number
    },
    finished: {
        type: Boolean,
        required: true
    },
    lection: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
}, { versionKey: '_version' });
bookmarkSchema.plugin(mongoose_history_1.default);
exports.default = mongoose_1.default.model('Bookmark', bookmarkSchema);
