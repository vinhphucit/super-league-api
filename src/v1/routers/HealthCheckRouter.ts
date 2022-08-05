import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import { HealthCheckController } from "../controllers/HealthCheckController";
import Container from "typedi";
export class HealthCheckRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "HealthCheck", `health/check`);
  }

  configureRoutes() {
    const controller = Container.get(HealthCheckController);
    this.router.get(``, controller.get.bind(controller));
  }
}
