
import { Model } from "mongoose";
import { Service } from "typedi";
import Season, { ISeason } from "../models/dao/Season";
import SubMatch, { ISubMatch } from "../models/dao/SubMatch";
import { BaseRepository } from "./BaseRepository";

@Service()
export class SubMatchRepository extends BaseRepository<ISubMatch> {
    setModel(): Model<ISubMatch>{
        return SubMatch;
    }
}