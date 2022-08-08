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
import { UpdateSubMatchRequest } from "../models/dto/request/submatch/UpdateSubMatchRequest";
import { SubMatchUpdatedArgument } from "../subscribers/arguments/SubMatchUpdatedArgument";
import { SubMatchRemovedArgument } from "../subscribers/arguments/SubMatchRemovedArgument";

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

    const createdSubMatch = await this.subMatchService.create(foundMatch, rq);

    foundMatch.subMatches.push(createdSubMatch);
    var updatedMatch = await this.repo.updateById(matchId, foundMatch);

    new EventDispatcher().dispatch(
      Events.standing.subMatchUpdated,
      new SubMatchAddedArgument(foundMatch, updatedMatch)
    );

    return updatedMatch;
  }

  public async updateSubMatch(
    matchId: string,
    subMatchId: string,
    rq: UpdateSubMatchRequest
  ): Promise<IMatch> {
    var foundMatch = await this.getById(matchId);
    const foundSubMatch = foundMatch.subMatches.find(
      (value) => value.id === subMatchId
    );
    if (foundSubMatch == null)
      throw new BadRequestException(`This match doesn't contain submatch`);

    const updatedSubMatch = await this.subMatchService.updateById(
      subMatchId,
      rq
    );

    const oldMatch = { ...foundMatch } as IMatch;
    for (var sm of foundMatch.subMatches) {
      if (sm.id === subMatchId) {
        sm = updatedSubMatch;
      }
    }
    var updatedMatch = await this.repo.updateById(matchId, foundMatch);

    new EventDispatcher().dispatch(
      Events.standing.subMatchUpdated,
      new SubMatchUpdatedArgument(oldMatch, updatedSubMatch)
    );

    return updatedMatch;
  }

  public async deleteSubMatch(
    matchId: string,
    subMatchId: string
  ): Promise<IMatch> {
    var foundMatch = await this.getById(matchId);
    const foundSubMatch = foundMatch.subMatches.find(
      (value) => value.id === subMatchId
    );
    if (foundSubMatch == null)
      throw new BadRequestException(`This match doesn't contain submatch`);

    const oldMatch = { ...foundMatch } as IMatch;
    foundMatch.subMatches = foundMatch.subMatches.filter(
      (value) => value.id !== subMatchId
    );
    
    const updatedSubMatch = await this.subMatchService.deleteById(subMatchId);

    var updatedMatch = await this.repo.updateById(matchId, foundMatch);

    new EventDispatcher().dispatch(
      Events.standing.subMatchRemoved,
      new SubMatchRemovedArgument(oldMatch, updatedSubMatch)
    );

    return updatedMatch;
  }
}
