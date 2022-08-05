import fs from "fs";
import path from "path";
import * as jsonwebtoken from "jsonwebtoken";
export class JwtUtils {
  public static publicKey = fs.readFileSync(
    path.resolve(__dirname, "../../../../assets/public.key"),
    "utf8"
  );

  public static async verifyJwtToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(
        token,
        JwtUtils.publicKey,
        { algorithms: ["RS256"] },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });
  }
}
