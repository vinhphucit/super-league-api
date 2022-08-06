"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateString = exports.timeSinceFriendly = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function timeSinceFriendly(date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
exports.timeSinceFriendly = timeSinceFriendly;
function validateDateString(dateNeedToFormat, format) {
    return (0, moment_timezone_1.default)(dateNeedToFormat, format, true).isValid();
}
exports.validateDateString = validateDateString;
//# sourceMappingURL=DateUtils.js.map