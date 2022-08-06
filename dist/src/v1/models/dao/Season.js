"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
exports.SeasonSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    creatorId: String,
    status: {
        type: String,
        enum: ['Not Started', "On Going", 'Ended', 'Cancelled']
    }
}, {
    timestamps: true,
});
const Season = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.Season, exports.SeasonSchema);
exports.default = Season;
//# sourceMappingURL=Season.js.map