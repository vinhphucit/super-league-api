import { Request } from "express";

export function getRequestUserId(req: Request): string | undefined {
  let { payload } = req;

  if (payload?.user) {
    return payload.user.id;
  }
  return null;
}
