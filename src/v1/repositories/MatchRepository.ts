import { Model } from "mongoose";
import { Service } from "typedi";
import Match, { IMatch } from "../models/dao/Match";
import { BaseRepository } from "./BaseRepository";

@Service()
export class MatchRepository extends BaseRepository<IMatch> {
  setModel(): Model<IMatch> {
    return Match;
  }

  async removeBySeasonId(id: string){
    const filter = {
      seasonId: {
        $eq: id,
      },
    };

    await this._model.deleteMany(filter);
    
  }
}
