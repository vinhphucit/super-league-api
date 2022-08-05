import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface ISeason extends Document {
  title: string;
  description: string;
  creatorId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISeasonModel extends Model<ISeason> {}
export const SeasonSchema = new Schema<ISeason>(
  {
    title: String,
    description: String,
    creatorId: String,
    status: {
      type: String,
      enum: ['Not Started', "On Going", 'Ended', 'Cancelled']
    }    
  },
  {
    timestamps: true,
  }
);

const Season: ISeasonModel = EzMongooseConnection.model<
  ISeason,
  ISeasonModel
>(CollectionNames.Season, SeasonSchema);

export default Season;
