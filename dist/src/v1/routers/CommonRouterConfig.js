"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
const express_1 = require("express");
const Env_1 = require("../../Env");
const StringUtils_1 = require("../utils/StringUtils");
class CommonRoutesConfig {
    constructor(app, name, path = null) {
        this.router = (0, express_1.Router)();
        this.app = app;
        this.name = name;
        if (path == null) {
            path = name;
        }
        this.path = path;
        this.configureRoutes();
        this.app.use(`${(0, StringUtils_1.standardizePath)(Env_1.env.app.rootPath)}/${path}`, this.router);
    }
    getName() {
        return this.name;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
//# sourceMappingURL=CommonRouterConfig.js.map