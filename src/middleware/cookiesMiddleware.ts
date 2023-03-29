import * as tsHTTP from "../tsHTTP.js";

export interface Context {
  cookies: string[];
}

function use(next: tsHTTP.Handler<Context & any>): tsHTTP.Handler<Context> {
  return async (req, res, ctx) => {
    await next(req, res, ctx);
    ctx.cookies;
    if (res.headersSent) {
      return;
    }
    if (ctx.cookies.length > 0) {
      res.setHeader("Set-Cookie", ctx.cookies);
    }
  };
}

export function NewCookiesMiddleware(): tsHTTP.Middleware<Context> {
  return {
    use,
  };
}
