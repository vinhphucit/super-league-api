"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContentResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const SuccessResponse_1 = require("./SuccessResponse");
class NoContentResponse extends SuccessResponse_1.SuccessResponse {
    constructor() {
        super(null, http_status_codes_1.StatusCodes.NO_CONTENT);
    }
}
exports.NoContentResponse = NoContentResponse;
//# sourceMappingURL=NoContentResponse.js.map