
import { Model } from "mongoose";
import { Service } from "typedi";
import Season, { ISeason } from "../models/dao/Season";
import Standing, { IStanding } from "../models/dao/Standing";
import { BaseRepository } from "./BaseRepository";

@Service()
export class StandingRepository extends BaseRepository<IStanding> {
    setModel(): Model<IStanding>{
        return Standing;
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