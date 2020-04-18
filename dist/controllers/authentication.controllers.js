"use strict";
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
var authentication_services_1 = __importDefault(require("../services/authentication.services"));
var logger_1 = __importDefault(require("../loaders/logger"));
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
        var _this = this;
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, _b, user_1, correct, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        logger_1.default.debug('Inicio proceso de login');
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!(email && password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.authenticationService.login(email, password)];
                    case 1:
                        _b = _c.sent(), user_1 = _b.user, correct = _b.correct;
                        if (correct) {
                            req.login(user_1, function (err) {
                                if (err)
                                    throw err;
                                logger_1.default.debug('Logueado correctamente.');
                                return res.status(200).json({ status: 200, user: user_1, message: "Inicio de sesión correcto." });
                            });
                        }
                        else
                            return [2 /*return*/, res.status(401).json({ status: 400, message: 'Los datos introducidos no son correctos.' })];
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, res.status(400).json({ status: 400, message: 'Datos incorrectos.' })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        logger_1.default.debug('ERROR EN EL LOGIN');
                        logger_1.default.error(e_1);
                        return [2 /*return*/, res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    req.logout();
                    res.status(200).json({ status: 200, message: 'Logout correcto' });
                }
                catch (e) {
                    logger_1.default.error(e);
                    return [2 /*return*/, res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." })];
                }
                return [2 /*return*/];
            });
        }); };
        this.check = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.status(200).json({ status: 200, user: req.user });
                }
                catch (e) {
                    logger_1.default.error(e);
                    return [2 /*return*/, res.status(400).json({ status: 400, message: "Se ha producido un error inesperado. Contacte con el administrador." })];
                }
                return [2 /*return*/];
            });
        }); };
        this.authenticationService = new authentication_services_1.default();
    }
    return AuthenticationController;
}());
exports.default = AuthenticationController;
