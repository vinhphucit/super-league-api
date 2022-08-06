"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonDomain = void 0;
class SeasonDomain {
    constructor(result) {
        if (!result)
            return;
        this.id = result._id;
        this.title = result.title;
        this.description = result.description;
        this.creatorId = result.creatorId;
        this.status = result.status;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
}
exports.SeasonDomain = SeasonDomain;
//# sourceMappingURL=SeasonDomain.js.map