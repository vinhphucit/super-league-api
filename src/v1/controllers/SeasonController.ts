import { Inject, Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { SeasonService } from "../services/SeasonService";
import { CreateSeasonRequest } from "../models/dto/request/season/CreateSeasonRequest";
import { CreateSeasonResponse } from "../models/dto/response/season/CreateSeasonResponse";
import { GetSeasonsResponse } from "../models/dto/response/season/GetSeasonsResponse";
import { GetSeasonByIdResponse } from "../models/dto/response/season/GetSeasonByIdResponse";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { getRequestUserId } from "../utils/RequestUtils";
import { UpdateSeasonByIdResponse } from "../models/dto/response/season/UpdateSeasonByIdResponse";


@Service()
export class SeasonController {
  

  constructor(private readonly service: SeasonService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateSeasonRequest = req.body;
      const userId = getRequestUserId(req);
      const result = await this.service.create(request, userId);
      next(new SuccessResponse(new CreateSeasonResponse(result)));
    } catch (e) {
      return next(e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, start, sort, query } = req.query as any;
      const userId = getRequestUserId(req);
      const result = await this.service.get(limit, start, sort, query, userId);
      next(
        new SuccessResponse(
          new GetSeasonsResponse(
            result.items.map((value) => new GetSeasonByIdResponse(value)),
            result.start,
            result.limit,
            result.totalItems,
            result.sort,
            result.query
          )
        )
      );
    } catch (e) {
      return next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userId = getRequestUserId(req);
      const result = await this.service.getById(id);
      next(new SuccessResponse(new GetSeasonByIdResponse(result)));
    } catch (e) {
      return next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request = req.body;
      const userId = getRequestUserId(req);
      const result = await this.service.updateById(id, request);
      next(new SuccessResponse(new UpdateSeasonByIdResponse(result)));
    } catch (e) {
      return next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userId = getRequestUserId(req);
      await this.service.deleteById(id);
      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }
}
