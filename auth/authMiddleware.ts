import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import key from "../util/key.ts";

const authMiddleware = async (ctx: RouterContext, next: any) => {
  const headers: Headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  if (!authorization) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Invalid Authorization" };
    return;
  }
  const jwt = authorization.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    ctx.response.body = { message: "No Token Found" };
    return;
  }
  if (await validateJwt(jwt, key, { isThrowing: false })) {
    await next();
    return;
  }

  ctx.response.status = 401;
  ctx.response.body = { message: "Invalid JWT Token" };
};

export default authMiddleware;
