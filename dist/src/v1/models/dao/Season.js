"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonSchema = void 0;
const mongoose_1 = require("mongoose");
const SeasonStatus_1 = require("../../enums/SeasonStatus");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
const Player_1 = require("./Player");
exports.SeasonSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    creatorId: String,
    players: [Player_1.PlayerSchema],
    status: {
        type: String,
        enum: [SeasonStatus_1.SeasonStatus.NOT_STARTED, SeasonStatus_1.SeasonStatus.READY, SeasonStatus_1.SeasonStatus.ON_GOING, SeasonStatus_1.SeasonStatus.ENDED, SeasonStatus_1.SeasonStatus.CANCELLED],
        default: SeasonStatus_1.SeasonStatus.NOT_STARTED
    },
}, {
    timestamps: true,
});
const Season = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.Season, exports.SeasonSchema);
exports.default = Season;
//# sourceMappingURL=Season.js.map