import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IMatch } from "../models/dao/Match";

import { MatchRepository } from "../repositories/MatchRepository";
import { switchNull } from "../utils/StringUtils";
import { IStanding } from "../models/dao/Standing";
import { StandingRepository } from "../repositories/StandingRepository";
import { ISeason } from "../models/dao/Season";
import { IPlayer } from "../models/dao/Player";
import { IStandingTeam } from "../models/dao/StandingTeam";

@Service()
export class StandingService {
  constructor(private readonly repo: StandingRepository) {}
  async getById(id: string): Promise<IStanding> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`Season ${id} doesn't exist`);
    return result;
  }
  async getBySeasonId(seasonId: string): Promise<IStanding | undefined> {
    const standings = await this.repo.getNoLimit(`seasonId%eq%${seasonId}`);
    if (standings && standings.totalItems > 0) return standings.items[0];
    return null;
  }

  async deleteBySeasonId(seasonId: string) {
    await this.repo.removeBySeasonId(seasonId);
  }

  async save(standing: IStanding): Promise<IStanding | undefined> {
    return await this.repo.updateById(standing.id, standing);
  }
  async initSeasonStanding(seasonId: string, players: IPlayer[]) {
    var standingTeams: IStandingTeam[] = [];
    for (var p of players) {
      standingTeams.push({
        player: p,
      } as IStandingTeam);
    }
    standingTeams = standingTeams.sort((x, y) => {
      if (x.player.nickname > y.player.nickname) {
        return 1;
      } else if (x.player.nickname < y.player.nickname) {
        return -1;
      } else {
        return 0;
      }
    });
    const standing: Partial<IStanding> = {
      seasonId: seasonId,
      standingTeams: standingTeams,
    };
    await this.repo.create(standing);
  }
}
