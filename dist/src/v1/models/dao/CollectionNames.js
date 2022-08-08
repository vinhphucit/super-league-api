"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionNames = void 0;
let subfix = "";
if (process.env.ENV == "test") {
    subfix = "_test";
}
class CollectionNames {
}
exports.CollectionNames = CollectionNames;
CollectionNames.Season = "season" + subfix;
CollectionNames.Player = "player" + subfix;
CollectionNames.Match = "match" + subfix;
CollectionNames.SubMatch = "sub_match" + subfix;
CollectionNames.Standing = "standing" + subfix;
//# sourceMappingURL=CollectionNames.js.map