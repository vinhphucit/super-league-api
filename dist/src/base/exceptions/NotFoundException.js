"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const HttpException_1 = require("./HttpException");
const http_status_codes_1 = require("http-status-codes");
class NotFoundException extends HttpException_1.HttpException {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, message || 'Not Found');
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map