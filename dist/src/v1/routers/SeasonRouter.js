"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const typedi_1 = __importDefault(require("typedi"));
const SeasonController_1 = require("../controllers/SeasonController");
const Permissions_1 = require("../utils/auth/Permissions");
const AuthorizationMiddleware_1 = require("../middlewares/AuthorizationMiddleware");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const CreateSeasonRequest_1 = require("../models/dto/request/season/CreateSeasonRequest");
const UpdateSeasonRequest_1 = require("../models/dto/request/season/UpdateSeasonRequest");
class SeasonRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "Season", `Seasons`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(SeasonController_1.SeasonController);
        this.router.get(``, 
        // AuthorizationMiddleware(Permissions.Season.Read),      
        controller.get.bind(controller));
        this.router.post(``, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.Create), (0, ValidationMiddleware_1.ValidationMiddleware)(CreateSeasonRequest_1.CreateSeasonRequest), controller.create.bind(controller));
        this.router.get(`/:id`, 
        // AuthorizationMiddleware(Permissions.Season.ReadById),      
        controller.getById.bind(controller));
        this.router.put(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.UpdateById), (0, ValidationMiddleware_1.ValidationMiddleware)(UpdateSeasonRequest_1.UpdateSeasonRequest), controller.updateById.bind(controller));
        this.router.delete(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.DeleteById), controller.deleteById.bind(controller));
    }
}
exports.SeasonRouter = SeasonRouter;
//# sourceMappingURL=SeasonRouter.js.map