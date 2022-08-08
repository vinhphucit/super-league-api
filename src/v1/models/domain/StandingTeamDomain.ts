import { ISeason } from "../dao/Season";
import { IStandingTeam } from "../dao/StandingTeam";
import { PlayerDomain } from "./PlayerDomain";

export class StandingTeamDomain {
  player: PlayerDomain;
  totalPoint: number;
  totalGoal: number;
  totalRedCard: number;
  totalWin: number;
  totalLose: number;
  totalDraw: number;
  constructor();
  constructor(result: IStandingTeam);
  constructor(result?: IStandingTeam) {
    if (!result) return;
    this.player = new PlayerDomain(result.player);
    this.totalPoint = result.totalPoint;
    this.totalGoal = result.totalGoal;
    this.totalRedCard = result.totalRedCard;
    this.totalWin = result.totalWin;
    this.totalLose = result.totalLose;
    this.totalDraw = result.totalDraw;
  }
}
