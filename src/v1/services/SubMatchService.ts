import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { ISubMatch } from "../models/dao/SubMatch";

import { CreateSubMatchRequest } from "../models/dto/request/submatch/CreateSubMatchRequest";
import { UpdateSubMatchRequest } from "../models/dto/request/submatch/UpdateSubMatchRequest";
import { SubMatchRepository } from "../repositories/SubMatchRepository";
import { switchNull } from "../utils/StringUtils";
import { ISubMatchTeamStatistics } from "../models/dao/SubMatchTeamStatistics";
import { IMatch } from "../models/dao/Match";

@Service()
export class SubMatchService {
  constructor(private readonly repo: SubMatchRepository) {}

  public async create(
    match: IMatch,
    rq: CreateSubMatchRequest
  ): Promise<ISubMatch> {

    const home: Partial<ISubMatchTeamStatistics> = {
      player: match.homePlayer,
      team: rq.home.team,
      goal: rq.home.goal,
      redCard: rq.home.redCard,
    };
    const away: Partial<ISubMatchTeamStatistics> = {
      player: match.awayPlayer,
      team: rq.away.team,
      goal: rq.away.goal,
      redCard: rq.away.redCard,
    };
    let matchStatistics: Partial<ISubMatch> = {
      matchId: match.id,
      seasonId: match.seasonId,
      home,
      away,
    };
    return this.repo.create(matchStatistics);
  }

  async get(
    limit: string,
    start: string,
    sort: string,
    query: string,
    userId?: string
  ): Promise<BaseList<ISubMatch>> {
    return await this.repo.get(limit, start, sort, query);
  }

  async getById(id: string): Promise<ISubMatch> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`SubMatch ${id} doesn't exist`);
    return result;
  }
  
  async deleteById(id: string): Promise<ISubMatch> {
    await this.getById(id);
    return this.repo.removeById(id);
  }
}
