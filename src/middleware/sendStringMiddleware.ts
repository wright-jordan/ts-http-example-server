import * as tsHTTP from "../tsHTTP.js";

export interface Context {
  status: number;
  reply: string;
}

function use(next: tsHTTP.Handler<Context & any>): tsHTTP.Handler<Context> {
  return async (req, res, ctx) => {
    await next(req, res, ctx);
    if (res.headersSent) {
      return;
    }
    res.statusCode = ctx.status;
    res.end(ctx.reply);
  };
}

export function NewSendStringMiddleware() {
  return {
    use,
  };
}
