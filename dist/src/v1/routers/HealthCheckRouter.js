"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const HealthCheckController_1 = require("../controllers/HealthCheckController");
const typedi_1 = __importDefault(require("typedi"));
class HealthCheckRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "HealthCheck", `health/check`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(HealthCheckController_1.HealthCheckController);
        this.router.get(``, controller.get.bind(controller));
    }
}
exports.HealthCheckRouter = HealthCheckRouter;
//# sourceMappingURL=HealthCheckRouter.js.map