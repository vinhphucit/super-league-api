import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";

import Container from "typedi";
import { SeasonController } from "../controllers/SeasonController";
import { Permissions } from "../utils/auth/Permissions";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { CreateSeasonRequest } from "../models/dto/request/season/CreateSeasonRequest";
import { UpdateSeasonRequest } from "../models/dto/request/season/UpdateSeasonRequest";
import { UpdateSeasonPlayersRequest } from "../models/dto/request/season/UpdateSeasonPlayersRequest";
import { UpdateSeasonStatusRequest } from "../models/dto/request/season/UpdateSeasonStatusRequest";

export class SeasonRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Season", `seasons`);
  }

  configureRoutes() {
    const controller = Container.get(SeasonController);

    this.router.get(
      ``,
      // AuthorizationMiddleware(Permissions.Season.Read),      
      controller.get.bind(controller)
    );
    this.router.post(
      ``,
      AuthorizationMiddleware(Permissions.Season.Create),
      ValidationMiddleware(CreateSeasonRequest),
      controller.create.bind(controller)
    );
    this.router.get(
      `/:id`, 
      controller.getById.bind(controller)
    );
    this.router.put(
      `/:id`,
      AuthorizationMiddleware(Permissions.Season.UpdateById),
      ValidationMiddleware(UpdateSeasonRequest),
      controller.updateById.bind(controller)
    );
    this.router.delete(
      `/:id`,
      AuthorizationMiddleware(Permissions.Season.DeleteById),
      controller.deleteById.bind(controller)
    );
    this.router.get(
      `/:id/matches`, 
      controller.getMatchesById.bind(controller)
    );
    this.router.get(
      `/:id/standing`,
      controller.getBySeasonId.bind(controller)
    );
    this.router.put(
      `/:id/players`,
      AuthorizationMiddleware(Permissions.Season.AddPlayers),
      ValidationMiddleware(UpdateSeasonPlayersRequest),
      controller.updatePlayersById.bind(controller)
    );
    this.router.put(
      `/:id/status`,
      AuthorizationMiddleware(Permissions.Season.UpdateStatus),
      ValidationMiddleware(UpdateSeasonStatusRequest),
      controller.changeStatusById.bind(controller)
    );
  }
}
