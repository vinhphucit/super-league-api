"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const HttpException_1 = require("./HttpException");
const http_status_codes_1 = require("http-status-codes");
class UnauthorizedException extends HttpException_1.HttpException {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, message || 'UnauthorizedException');
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=UnauthorizedException.js.map