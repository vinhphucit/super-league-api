
import { Model } from "mongoose";
import { Service } from "typedi";
import Season, { ISeason } from "../models/dao/Season";
import { BaseRepository } from "./BaseRepository";

@Service()
export class SeasonRepository extends BaseRepository<ISeason> {
    setModel(): Model<ISeason>{
        return Season;
    }
}