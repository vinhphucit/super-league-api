import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";

import Container from "typedi";
import { PlayerController } from "../controllers/PlayerController";
import { Permissions } from "../utils/auth/Permissions";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { CreatePlayerRequest } from "../models/dto/request/player/CreatePlayerRequest";
import { UpdatePlayerRequest } from "../models/dto/request/player/UpdatePlayerRequest";

export class PlayerRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Player", `players`);
  }

  configureRoutes() {
    const controller = Container.get(PlayerController);

    this.router.get(
      ``,
      AuthorizationMiddleware(Permissions.Player.Read),      
      controller.get.bind(controller)
    );
    this.router.post(
      ``,
      AuthorizationMiddleware(Permissions.Player.Create),
      ValidationMiddleware(CreatePlayerRequest),
      controller.create.bind(controller)
    );
    this.router.get(
      `/:id`,
      AuthorizationMiddleware(Permissions.Player.ReadById),      
      controller.getById.bind(controller)
    );
    this.router.put(
      `/:id`,
      AuthorizationMiddleware(Permissions.Player.UpdateById),
      ValidationMiddleware(UpdatePlayerRequest),
      controller.updateById.bind(controller)
    );
    this.router.delete(
      `/:id`,
      AuthorizationMiddleware(Permissions.Player.DeleteById),
      controller.deleteById.bind(controller)
    );
  }
}
