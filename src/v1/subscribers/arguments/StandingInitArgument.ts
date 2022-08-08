import { IPlayer } from "../../models/dao/Player";
import { ISeason } from "../../models/dao/Season";

export class StandingInitArgument {
  constructor(public season: ISeason, public players: IPlayer[]) {}
}
