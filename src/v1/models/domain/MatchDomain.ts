import { IMatch } from "../dao/Match";
import { IPlayer } from "../dao/Player";
import { SubMatchDomain } from "./SubMatchDomain";
import { PlayerDomain } from "./PlayerDomain";

export class MatchDomain {
  id: string;
  homePlayer: PlayerDomain;
  awayPlayer: PlayerDomain;
  subMatches: SubMatchDomain[];
  createdAt: Date;
  updatedAt: Date;
  constructor();
  constructor(result: IMatch);
  constructor(result?: IMatch) {
    if (!result) return;
    this.id = result._id;
    this.homePlayer = new PlayerDomain(result.homePlayer);
    this.awayPlayer = new PlayerDomain(result.awayPlayer);
    this.subMatches = result.subMatches.map(
      (i) => new SubMatchDomain(i)
    );

    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
  }
}
