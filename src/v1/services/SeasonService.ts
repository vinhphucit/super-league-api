import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Inject, Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import Season, { ISeason } from "../models/dao/Season";

import { CreateSeasonRequest } from "../models/dto/request/season/CreateSeasonRequest";
import { UpdateSeasonRequest } from "../models/dto/request/season/UpdateSeasonRequest";
import { SeasonRepository } from "../repositories/SeasonRepository";
import { switchNull } from "../utils/StringUtils";
import { PlayerService } from "./PlayerService";
import { UpdateSeasonPlayersRequest } from "../models/dto/request/season/UpdateSeasonPlayersRequest";
import { SeasonStatus } from "../enums/SeasonStatus";
import { MatchService } from "./MatchService";
import { IMatch } from "../models/dao/Match";
import { EventDispatcher } from "event-dispatch";
import Events from "../subscribers/Events";
import { StandingInitArgument } from "../subscribers/arguments/StandingInitArgument";
import { StandingService } from "./StandingService";

@Service()
export class SeasonService {
  @Inject()
  playerService: PlayerService;
  @Inject()
  standingService: StandingService;
  @Inject()
  matchService: MatchService;

  constructor(private readonly repo: SeasonRepository) {}

  public async create(
    rq: CreateSeasonRequest,
    userId?: string
  ): Promise<ISeason> {
    let item: Partial<ISeason> = {
      title: rq.title,
      description: rq.description,
      creatorId: userId,
    };

    if (rq.playerIds) {
      const players = await this.playerService.getByIds(rq.playerIds);
      item.players = players;
    }

    return this.repo.create(item);
  }

  async get(
    limit: string,
    start: string,
    sort: string,
    query: string,
    userId?: string
  ): Promise<BaseList<ISeason>> {
    return await this.repo.get(limit, start, sort, query);
  }

  async getById(id: string): Promise<ISeason> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`Season ${id} doesn't exist`);
    return result;
  }

  async updateById(
    id: string,
    request: UpdateSeasonRequest
  ): Promise<ISeason | undefined> {
    const entity = await this.getById(id);

    entity.title = switchNull(request.title, entity.title);
    entity.description = switchNull(request.description, entity.description);

    const updateEntity = await this.repo.updateById(id, entity);

    return updateEntity;
  }

  async deleteById(id: string): Promise<ISeason> {
    await this.getById(id);
    return this.repo.removeById(id);
  }

  async updatePlayers(
    id: string,
    playerIds: string[]
  ): Promise<ISeason | undefined> {
    const entity = await this.getById(id);
    if (entity.status !== SeasonStatus.NOT_STARTED) {
      throw new BadRequestException(`Can not update guests for this season`);
    }
    const players = await this.playerService.getByIds(playerIds);
    entity.players = players;

    const updateEntity = await this.repo.updateById(id, entity);

    return updateEntity;
  }

  async changeSeasonStatus(id: string, status: string): Promise<ISeason> {
    const entity = await this.getById(id);
    if (status === SeasonStatus.NOT_STARTED) {
      if (entity.status !== SeasonStatus.READY)
        throw new BadRequestException("Can not update status");
      await this.clearMatches(entity);
      await this.clearStanding(entity);
    } else if (status === SeasonStatus.READY) {
      if (entity.status !== SeasonStatus.NOT_STARTED)
        throw new BadRequestException("Can not update status");
      await this.generateMatches(entity);
    } else if (status === SeasonStatus.ON_GOING) {
      if (entity.status !== SeasonStatus.READY)
        throw new BadRequestException("Can not update status");
    } else if (status === SeasonStatus.ENDED) {
      if (entity.status !== SeasonStatus.ON_GOING)
        throw new BadRequestException("Can not update status");
    } else if (status === SeasonStatus.CANCELLED) {
    } else {
      throw new BadRequestException("Status is not valid");
    }
    entity.status = status;
    return await this.repo.updateById(id, entity);
  }
  async clearStanding(entity: ISeason) {
    await this.standingService.deleteBySeasonId(entity.id);
  }
  async clearMatches(entity: ISeason) {
    await this.matchService.deleteBySeasonId(entity.id);
  }
  async generateMatches(entity: ISeason) {
    const players = entity.players;
    var matches: Partial<IMatch>[] = [];

    if (players == null || players.length < 2) return;

    // create first round matches
    for (var i = 0; i < players.length - 1; i++) {
      for (var j = i+1; j < players.length; j++) {
        matches.push({
          seasonId: entity.id,
          homePlayer: players[i],
          awayPlayer: players[j],
        });
      }
    }

    //create second round matches
    for (var i = matches.length - 1; i >= 0; i--) {
      matches.push({
        seasonId: entity.id,
        homePlayer: matches[i].awayPlayer,
        awayPlayer: matches[i].homePlayer,
      });
    }

    if (matches.length > 0) {
      await this.matchService.createMany(matches);
    }

    new EventDispatcher().dispatch(Events.standing.init, new StandingInitArgument(entity, players));
  }
}
