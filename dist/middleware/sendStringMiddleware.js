import * as tsHTTP from "../tsHTTP.js";
function use(next) {
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
