"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
class Logger {
    static info(message, ...meta) {
        this.myLogger.info(message, meta);
    }
    static error(message, ...meta) {
        this.myLogger.error(message, meta);
    }
}
exports.Logger = Logger;
Logger.options = {
    console: {
        level: (process.env.ENV || 'dev').toLowerCase() === 'dev' ? 'info' : 'error',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};
Logger.myLogger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS"
    }), winston_1.default.format.printf(info => `${info.timestamp} : ${info.message}`)),
    transports: [
        new winston_1.default.transports.Console(Logger.options.console)
    ],
});
//# sourceMappingURL=Logger.js.map