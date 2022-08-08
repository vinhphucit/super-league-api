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
import { UpdateSeasonStatusRequest } from "../models/dto/request/season/UpdateSeasonStatusRequest";
import { UpdateSeasonPlayersRequest } from "../models/dto/request/season/UpdateSeasonPlayersRequest";
import { MatchService } from "../services/MatchService";
import { GetMatchesResponse } from "../models/dto/response/match/GetMatchesResponse";
import { GetMatchByIdResponse } from "../models/dto/response/match/GetMatchByIdResponse";
import { CreateSubMatchRequest } from "../models/dto/request/submatch/CreateSubMatchRequest";


@Service()
export class MatchController {
  

  constructor(private readonly service: MatchService) {}

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, start, sort, query } = req.query as any;
      const result = await this.service.get(limit, start, sort, query);
      next(
        new SuccessResponse(
          new GetMatchesResponse(
            result.items.map((value) => new GetMatchByIdResponse(value)),
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
      const result = await this.service.getById(id);
      next(new SuccessResponse(new GetMatchByIdResponse(result)));
    } catch (e) {
      return next(e);
    }
  }


  public async addSubMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateSubMatchRequest = req.body;
      const id = req.params.id;
      const result = await this.service.createSubMatch(id, request);
      next(new SuccessResponse(new GetMatchByIdResponse(result)));
    } catch (e) {
      return next(e);
    }
  }
}
