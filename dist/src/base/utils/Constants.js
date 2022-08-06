"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.SWAGGER_PATH = exports.BLACKLIST_LOG = void 0;
const StringUtils_1 = require("../../v1/utils/StringUtils");
const Env_1 = require("../../Env");
exports.BLACKLIST_LOG = ['/health/check'];
exports.SWAGGER_PATH = `${(0, StringUtils_1.standardizePath)(Env_1.env.app.rootPath)}/dev/api-docs`;
exports.VERSION = 'v1';
//# sourceMappingURL=Constants.js.map