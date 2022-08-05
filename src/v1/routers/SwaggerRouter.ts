import {Router} from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../../../openapi_v1.json";
import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
export class SwaggerRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Swagger",``);
  }

  configureRoutes(): express.Application {
    const swaggerUiOptions = {
        customCss: '.swagger-ui .topbar { display: none }'
    }

    this.router.use('/dev/api-docs', swaggerUi.serve);
    this.router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

    return this.app;
  }
}
