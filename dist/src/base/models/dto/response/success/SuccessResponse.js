"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class SuccessResponse {
    constructor(data, statusCode) {
        this.data = data;
        this.statusCode = statusCode || http_status_codes_1.StatusCodes.OK;
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=SuccessResponse.js.map