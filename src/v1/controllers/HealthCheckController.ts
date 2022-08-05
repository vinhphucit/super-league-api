import {NextFunction, Request, Response} from "express";
import { env } from "../../Env";
import {timeSinceFriendly} from "../utils/DateUtils";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { AppInfo, AppMetric, HealthCheck, MetricInfo } from "../models/domain/HealthCheck";
import { Service } from "typedi";

@Service()
export class HealthCheckController {
    private startupAt: Date = new Date();

    public async get(req: Request, res: Response, next: NextFunction) {
        let metricInfo = undefined
        if (req.query.query == 'metric') {
            metricInfo = new MetricInfo(
                new AppInfo(env.app.name, env.app.version, env.app.host, env.app.port, env.app.env),
                new AppMetric(process.memoryUsage(), timeSinceFriendly(this.startupAt), this.startupAt)
            );
        }
        const healthCheck = new HealthCheck(metricInfo);
        next(new SuccessResponse(healthCheck));
    }

}
