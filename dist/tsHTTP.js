import * as http from "node:http";
export function NewTestListenerFromHandler(ctx, handler) {
    return function (req, res) {
        handler(req, res, ctx);
    };
}
export function NewTestListenerFromMiddleware(ctx, middleware, handler) {
    return async function (req, res) {
        middleware.use(handler)(req, res, ctx);
    };
}
export function App(routes, fallback) {
    return async (req, res) => {
        (routes.get(req.url.split("?", 1)[0]) || fallback)(req, res);
    };
}
