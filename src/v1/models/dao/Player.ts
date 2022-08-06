import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IPlayer extends Document {
  firstName: string;
  lastName: string;
  nickname: string;  
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlayerModel extends Model<IPlayer> {}
export const PlayerSchema = new Schema<IPlayer>(
  {
    firstName: String,
    lastName: String,
    nickname: String    
  },
  {
    timestamps: true,
  }
);

const Player: IPlayerModel = EzMongooseConnection.model<
  IPlayer,
  IPlayerModel
>(CollectionNames.Player, PlayerSchema);

export default Player;
