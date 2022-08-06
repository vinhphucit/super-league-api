import { Inject, Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { PlayerService } from "../services/PlayerService";
import { CreatePlayerRequest } from "../models/dto/request/player/CreatePlayerRequest";
import { CreatePlayerResponse } from "../models/dto/response/player/CreatePlayerResponse";
import { GetPlayersResponse } from "../models/dto/response/player/GetPlayersResponse";
import { GetPlayerByIdResponse } from "../models/dto/response/player/GetPlayerByIdResponse";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { getRequestUserId } from "../utils/RequestUtils";
import { UpdatePlayerByIdResponse } from "../models/dto/response/player/UpdatePlayerByIdResponse";


@Service()
export class PlayerController {
  

  constructor(private readonly service: PlayerService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePlayerRequest = req.body;
      const userId = getRequestUserId(req);
      const result = await this.service.create(request, userId);
      next(new SuccessResponse(new CreatePlayerResponse(result)));
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
          new GetPlayersResponse(
            result.items.map((value) => new GetPlayerByIdResponse(value)),
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
      next(new SuccessResponse(new GetPlayerByIdResponse(result)));
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
      next(new SuccessResponse(new UpdatePlayerByIdResponse(result)));
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
