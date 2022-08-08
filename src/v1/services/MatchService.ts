import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Inject, Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IMatch } from "../models/dao/Match";

import { MatchRepository } from "../repositories/MatchRepository";
import { switchNull } from "../utils/StringUtils";
import { ISubMatch } from "../models/dao/SubMatch";
import { CreateSubMatchRequest } from "../models/dto/request/submatch/CreateSubMatchRequest";

import { ISubMatchTeamStatistics } from "../models/dao/SubMatchTeamStatistics";
import { SubMatchService } from "./SubMatchService";
import { EventDispatcher } from "event-dispatch";
import Events from "../subscribers/Events";
import { SubMatchAddedArgument } from "../subscribers/arguments/SubMatchAddedArgument";

@Service()
export class MatchService {
  @Inject()
  subMatchService: SubMatchService;
  constructor(private readonly repo: MatchRepository) {}
  public async createMany(matches: Partial<IMatch>[]): Promise<IMatch[]> {
    return this.repo.createMany(matches);
  }
  async get(
    limit: string,
    start: string,
    sort: string,
    query: string
  ): Promise<BaseList<IMatch>> {
    return await this.repo.get(limit, start, sort, query);
  }

  async getBySeasonId(
    limit: string,
    start: string,
    sort: string,
    query: string,
    seasonId: string
  ): Promise<BaseList<IMatch>> {
    return await this.repo.get(limit, start, sort, query, [
      `seasonId%eq%${seasonId}`,
    ]);
  }

  async getById(id: string): Promise<IMatch> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`Match ${id} doesn't exist`);
    return result;
  }

  async deleteById(id: string): Promise<IMatch> {
    await this.getById(id);
    return this.repo.removeById(id);
  }

  async deleteBySeasonId(id: string) {
    this.repo.removeBySeasonId(id);
  }

  public async createSubMatch(
    matchId: string,
    rq: CreateSubMatchRequest
  ): Promise<IMatch> {
    var foundMatch = await this.getById(matchId);

    const createdSubMatch = await this.subMatchService.create(rq);

    foundMatch.subMatches.push(createdSubMatch);
    var updatedMatch = await this.repo.updateById(matchId, foundMatch);

    new EventDispatcher().dispatch(Events.standing.subMatchAdded, new SubMatchAddedArgument(foundMatch, updatedMatch));

    return updatedMatch;
  }
}
