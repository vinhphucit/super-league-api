"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqFormaterMiddleware = void 0;
const Constants_1 = require("../utils/Constants");
const Logger_1 = require("../utils/Logger");
class ReqFormaterMiddleware {
    handleRequest(request, response, next) {
        const { method, url, body, originalUrl } = request;
        if (!Constants_1.BLACKLIST_LOG.includes(url) && !originalUrl.startsWith(Constants_1.SWAGGER_PATH)) {
            Logger_1.Logger.info("--> Method:" + method + " --> " + originalUrl);
        }
        next();
    }
}
exports.ReqFormaterMiddleware = ReqFormaterMiddleware;
//# sourceMappingURL=ReqFormaterMiddleware.js.map