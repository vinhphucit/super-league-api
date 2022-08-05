import figlet from "figlet";
import { env } from "../../Env";
import { Logger } from "./Logger";

export function banner(content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    figlet.text(content, (error: any, data: any) => {
      if (error) {
        return reject();
      }
      Logger.info(`\n ${data} \n `);

      const route = () => `API Info     : ${env.app.host}:${env.app.port} `;
      Logger.info(`${route()}`);
      Logger.info(`Version      : ${env.app.version}`);
      return resolve();
    });
  });
}
