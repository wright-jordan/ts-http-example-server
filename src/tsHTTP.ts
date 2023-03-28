import * as http from "node:http";

interface Context {}

export interface Handler<Ctx extends Context> {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Ctx
  ): Promise<void>;
}

export function NewTestListener<
  Ctx extends Context,
  Deps extends Record<string, unknown> | null
>(
  deps: Deps,
  ctx: Ctx,
  Handler: (deps: Deps) => Handler<Ctx>
): http.RequestListener {
  const handler = Handler(deps);
  return (req, res) => {
    handler(req, res, ctx).then(() => {
      if (!res.headersSent) {
        res.end();
      }
    });
  };
}

export function NewListener(
  routes: Map<string, http.RequestListener>,
  fallback: http.RequestListener
): http.RequestListener {
  return async (req, res) => {
    (routes.get(req.url!.split("?", 1)[0]!) || fallback)(req, res);
  };
}
