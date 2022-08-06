"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const HttpException_1 = require("./HttpException");
const http_status_codes_1 = require("http-status-codes");
class ForbiddenException extends HttpException_1.HttpException {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.FORBIDDEN, message || 'Forbidden Exception');
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=ForbiddenException.js.map