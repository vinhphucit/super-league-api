import { ISeason } from "../dao/Season";
import { IStanding } from "../dao/Standing";
import { IStandingTeam } from "../dao/StandingTeam";
import { PlayerDomain } from "./PlayerDomain";
import { StandingTeamDomain } from "./StandingTeamDomain";

export class StandingDomain {
  seasonId: string;
  standingTeams: StandingTeamDomain[];
  createdAt: Date;
  updatedAt: Date;
  constructor();
  constructor(result: IStanding);
  constructor(result?: IStanding) {
    if (!result) return;
    this.seasonId = result.seasonId;
    this.standingTeams = result.standingTeams.map(i=> new StandingTeamDomain(i));
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
  }
}
