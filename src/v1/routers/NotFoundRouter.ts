import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";

import { NotFoundController } from "../controllers/NotFoundController";
export class NotFoundRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, `NotFound`,``);
  }

  configureRoutes() {
    const controller = new NotFoundController();
    this.router.all(`*`, controller.handleNotFoundUrl.bind(controller));
  }
}
