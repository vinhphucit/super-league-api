"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestUserId = void 0;
function getRequestUserId(req) {
    let { payload } = req;
    if (payload === null || payload === void 0 ? void 0 : payload.user) {
        return payload.user.id;
    }
    return null;
}
exports.getRequestUserId = getRequestUserId;
//# sourceMappingURL=RequestUtils.js.map