"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const NotFoundController_1 = require("../controllers/NotFoundController");
class NotFoundRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, `NotFound`, ``);
    }
    configureRoutes() {
        const controller = new NotFoundController_1.NotFoundController();
        this.router.all(`*`, controller.handleNotFoundUrl.bind(controller));
    }
}
exports.NotFoundRouter = NotFoundRouter;
//# sourceMappingURL=NotFoundRouter.js.map