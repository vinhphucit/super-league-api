"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsWhitelist = void 0;
const cors_1 = __importDefault(require("cors"));
const corsWhitelist = (whitelist) => {
    if (!whitelist) {
        return (0, cors_1.default)();
    }
    if (typeof whitelist === 'string') {
        whitelist = whitelist.split(',');
    }
    const corsOptionsDelegate = function (req, callback) {
        let corsOptions;
        if (whitelist.indexOf(req.header('Origin')) !== -1
            || whitelist.includes('*')) {
            corsOptions = { origin: true };
        }
        else {
            corsOptions = { origin: false };
        }
        callback(null, corsOptions);
    };
    return (0, cors_1.default)(corsOptionsDelegate);
};
exports.corsWhitelist = corsWhitelist;
//# sourceMappingURL=CorsMiddleware.js.map