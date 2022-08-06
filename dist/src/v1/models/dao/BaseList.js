"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseList = void 0;
class BaseList {
    constructor(items, start, limit, totalItems, sort, query) {
        this.items = items;
        this.start = start;
        this.limit = limit;
        this.totalItems = totalItems;
        this.query = query;
        this.sort = sort;
    }
}
exports.BaseList = BaseList;
//# sourceMappingURL=BaseList.js.map