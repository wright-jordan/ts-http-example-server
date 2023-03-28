import * as tsHTTP from "../tsHTTP.js";
function use(next) {
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
export function NewCookiesMiddleware() {
    return {
        use,
    };
}
