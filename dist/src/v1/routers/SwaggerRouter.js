"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerRouter = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_v1_json_1 = __importDefault(require("../../../openapi_v1.json"));
const CommonRouterConfig_1 = require("./CommonRouterConfig");
class SwaggerRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "Swagger", ``);
    }
    configureRoutes() {
        const swaggerUiOptions = {
            customCss: '.swagger-ui .topbar { display: none }'
        };
        this.router.use('/dev/api-docs', swagger_ui_express_1.default.serve);
        this.router.get('/dev/api-docs', swagger_ui_express_1.default.setup(openapi_v1_json_1.default, swaggerUiOptions));
        return this.app;
    }
}
exports.SwaggerRouter = SwaggerRouter;
//# sourceMappingURL=SwaggerRouter.js.map