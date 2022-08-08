"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonDomain = void 0;
const PlayerDomain_1 = require("./PlayerDomain");
class SeasonDomain {
    constructor(result) {
        var _a;
        if (!result)
            return;
        this.id = result._id;
        this.title = result.title;
        this.description = result.description;
        this.players = (_a = result.players) === null || _a === void 0 ? void 0 : _a.map(i => new PlayerDomain_1.PlayerDomain(i));
        this.creatorId = result.creatorId;
        this.status = result.status;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
}
exports.SeasonDomain = SeasonDomain;
//# sourceMappingURL=SeasonDomain.js.map