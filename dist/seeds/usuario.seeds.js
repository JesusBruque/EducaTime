"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var argon2_1 = __importDefault(require("argon2"));
var usuario_model_1 = __importDefault(require("../models/usuario.model"));
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var salt1, hashedPassword1, salt2, hashedPassword2, users, i, user, err, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('USUARIO SEED');
                    salt1 = crypto_1.randomBytes(32);
                    return [4 /*yield*/, argon2_1.default.hash('admin', { salt: salt1 })];
                case 1:
                    hashedPassword1 = _a.sent();
                    salt2 = crypto_1.randomBytes(32);
                    return [4 /*yield*/, argon2_1.default.hash('admin', { salt: salt2 })];
                case 2:
                    hashedPassword2 = _a.sent();
                    users = [
                        {
                            email: 'admin@admin.com',
                            nombre: 'Pablo',
                            username: 'admin1',
                            apellidos: 'Escobar Garibia',
                            telefono: '656611851',
                            password: hashedPassword1,
                            salt: salt1,
                        }, {
                            email: 'dios@dios.com',
                            nombre: 'Karim',
                            username: 'admin2',
                            apellidos: 'Benzema',
                            telefono: '755123451',
                            password: hashedPassword2,
                            salt: salt2,
                        }
                    ];
                    return [4 /*yield*/, usuario_model_1.default.deleteMany({})];
                case 3:
                    _a.sent();
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < users.length)) return [3 /*break*/, 7];
                    user = users[i];
                    return [4 /*yield*/, new usuario_model_1.default(__assign(__assign({}, user), { updated_for: null })).save()];
                case 5:
                    res = _a.sent();
                    if (err)
                        throw err;
                    if (!res)
                        throw Error("No se ha podido crear el usuario " + user.email);
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log('USUARIO SEED ENDED');
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = seed;
