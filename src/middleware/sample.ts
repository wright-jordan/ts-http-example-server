import * as tsHTTP from "ts-http";

export type Context = {
  message: string;
};

export type Config = {
  message: string;
};

export type Middleware = tsHTTP.Middleware<Context> & {
  config: Config;
};

function use(
  this: Middleware,
  next: tsHTTP.ListenerWithContext<any>
): tsHTTP.ListenerWithContext<Context> {
  return async (req, res, ctx) => {
    ctx.message = this.config.message;
    await next(req, res, ctx);
  };
}

export function New(config: Config): Middleware {
  return {
    config,
    use,
  };
}
