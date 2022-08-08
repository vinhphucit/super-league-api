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
const UpdateSeasonPlayersRequest_1 = require("../models/dto/request/season/UpdateSeasonPlayersRequest");
const UpdateSeasonStatusRequest_1 = require("../models/dto/request/season/UpdateSeasonStatusRequest");
class SeasonRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "Season", `seasons`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(SeasonController_1.SeasonController);
        this.router.get(``, 
        // AuthorizationMiddleware(Permissions.Season.Read),      
        controller.get.bind(controller));
        this.router.post(``, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.Create), (0, ValidationMiddleware_1.ValidationMiddleware)(CreateSeasonRequest_1.CreateSeasonRequest), controller.create.bind(controller));
        this.router.get(`/:id`, controller.getById.bind(controller));
        this.router.put(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.UpdateById), (0, ValidationMiddleware_1.ValidationMiddleware)(UpdateSeasonRequest_1.UpdateSeasonRequest), controller.updateById.bind(controller));
        this.router.delete(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.DeleteById), controller.deleteById.bind(controller));
        this.router.get(`/:id/matches`, controller.getMatchesById.bind(controller));
        this.router.get(`/:id/standing`, controller.getBySeasonId.bind(controller));
        this.router.put(`/:id/players`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.AddPlayers), (0, ValidationMiddleware_1.ValidationMiddleware)(UpdateSeasonPlayersRequest_1.UpdateSeasonPlayersRequest), controller.updatePlayersById.bind(controller));
        this.router.put(`/:id/status`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Season.UpdateStatus), (0, ValidationMiddleware_1.ValidationMiddleware)(UpdateSeasonStatusRequest_1.UpdateSeasonStatusRequest), controller.changeStatusById.bind(controller));
    }
}
exports.SeasonRouter = SeasonRouter;
//# sourceMappingURL=SeasonRouter.js.map