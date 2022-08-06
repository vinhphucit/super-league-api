"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListResponse = void 0;
class BaseListResponse {
    constructor(items, start, limit, totalItems, sort, query) {
        this.items = items;
        this.start = start;
        this.limit = limit;
        this.totalItems = totalItems;
        this.query = query;
        this.sort = sort;
    }
}
exports.BaseListResponse = BaseListResponse;
//# sourceMappingURL=BaseListResponse.js.map