
import { Model } from "mongoose";
import { Service } from "typedi";
import Player, { IPlayer } from "../models/dao/Player";
import { BaseRepository } from "./BaseRepository";

@Service()
export class PlayerRepository extends BaseRepository<IPlayer> {
    setModel(): Model<IPlayer>{
        return Player;
    }
}