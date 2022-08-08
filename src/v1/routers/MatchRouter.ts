import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";

import Container from "typedi";
import { MatchController } from "../controllers/MatchController";


export class MatchRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Match", `matches`);
  }

  configureRoutes() {
    const controller = Container.get(MatchController);

    this.router.get(
      ``,
      controller.get.bind(controller)
    );
    this.router.get(
      `/:id`,
      controller.getById.bind(controller)
    );
    this.router.post(
      `/:id/subMatches`,
      controller.addSubMatches.bind(controller)
    );
    this.router.put(
      `/:id/subMatches/subMatchId`,
      controller.addSubMatches.bind(controller)
    );
    this.router.delete(
      `/:id/subMatches/subMatchId`,
      controller.addSubMatches.bind(controller)
    );
  }
}
