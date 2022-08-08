import * as dotenv from "dotenv";
import path from "path";

let subfix = "";
if (process.env.ENV == "test") {
  subfix = "_test";
}

export class CollectionNames {
  public static Season = "season" + subfix;
  public static Player = "player" + subfix;
  public static Match = "match" + subfix;
  public static SubMatch = "sub_match" + subfix;
  public static Standing = "standing" + subfix;
  
}
