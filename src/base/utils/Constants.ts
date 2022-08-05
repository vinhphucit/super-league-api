import { standardizePath } from "../../v1/utils/StringUtils";
import { env } from "../../Env";

export const BLACKLIST_LOG: string[] = ['/health/check'];
export const SWAGGER_PATH: string = `${standardizePath(env.app.rootPath)}/dev/api-docs`;
export const VERSION: string = 'v1';
